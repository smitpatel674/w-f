import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const BACKEND_BASE = (import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:8000';

const Interactive3DHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cameraGroupRef = useRef<THREE.Group | null>(null);
  const candlesGroupRef = useRef<THREE.Group | null>(null);
  const particlesGroupRef = useRef<THREE.Group | null>(null);
  const tickerGroupRef = useRef<THREE.Group | null>(null);
  const animationRef = useRef<number | null>(null);
  const [stockData, setStockData] = useState<{symbol:string; price:number; change:number}[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  function normalizeSymbol(sym: string): string {
    if (!sym) return '';
    return sym.replace(/-EQ$/i, '');
  }

  function mergeQuotes(list: any[]) {
    const nowStr = new Date().toLocaleTimeString();
    setStockData((prev) => {
      const newStockData = [...prev];
      list.forEach((q: any) => {
        const rawSym = typeof q.symbol === 'string' ? q.symbol : '';
        const sym = normalizeSymbol(rawSym);
        const existingStockIndex = newStockData.findIndex(p => p.symbol === sym);
        const price = typeof q.price === 'number' && q.price > 0 ? q.price : 0;
        const change = typeof q.changePercent === 'number' ? q.changePercent : 0;

        if (existingStockIndex > -1) {
          newStockData[existingStockIndex] = { symbol: sym, price, change };
        } else {
          newStockData.push({ symbol: sym, price, change });
        }
      });
      return newStockData;
    });
    setLastUpdated(nowStr);
  }

  useEffect(() => {
    let abort = false;
    const limit = 10; // NIFTY 50 stocks for 3D visualization

    async function fetchNifty50Stocks() {
      const paths = [`${BACKEND_BASE}/api/v1/market/live?limit=${limit}`, `/api/v1/market/live?limit=${limit}`];
      let ok = false;
      for (const url of paths) {
        try {
          const res = await fetch(url, { cache: 'no-cache' });
          if (!res.ok) throw new Error('bad status');
          const json = await res.json();
          if (abort) return;
          const list = Array.isArray(json?.quotes) ? json.quotes : [];
          mergeQuotes(list);
          ok = true;
          break;
        } catch (err) {
          console.error('NIFTY 50 stocks fetch failed for', url, err);
        }
      }
      if (!ok) {
        // keep last values if backend is down
      }
    }

    // Fetch initial NIFTY 50 stocks data
    fetchNifty50Stocks();

    // Set up periodic refresh every 15 seconds for 3D visualization
    const intervalId = setInterval(() => {
      if (!abort) {
        fetchNifty50Stocks();
      }
    }, 15000);

    return () => { 
      abort = true; 
      clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ========= Settings =========
  const CANDLE_COUNT = 12; // Increased for 10 stocks
  const HORIZONTAL_SPREAD = 14; // Restored spread
  const VERTICAL_INVERT = true;
  const POINTER_STOP_MS = 200;
  const INERTIA = 0.06;
  const BOB_AMPLITUDE_WHEN_MOVING = 0.25;
  const BOB_AMPLITUDE_WHEN_STOPPED = 0.1;
  const BOB_SPEED = 1.2;
  const SCROLL_SENSITIVITY = 0.5;
  const SCROLL_INERTIA = 0.08;
  const QUALITY = window.devicePixelRatio > 1.5 ? 'high' : 'medium';

  // ========= Performance Monitoring =========
  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 0;

  function updatePerformanceMonitor() {
    frameCount++;
    const currentTime = performance.now();
    if (currentTime - lastTime >= 1000) {
      fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      frameCount = 0;
      lastTime = currentTime;
      
      // Adaptive quality adjustment
      if (fps < 30 && QUALITY === 'high') {
        reduceQuality();
      } else if (fps > 50 && QUALITY === 'medium') {
        improveQuality();
      }
    }
    if (animationRef.current) {
      requestAnimationFrame(updatePerformanceMonitor);
    }
  }

  function reduceQuality() {
    if (rendererRef.current && sceneRef.current && sceneRef.current.fog) {
      rendererRef.current.setPixelRatio(1);
      if ('density' in sceneRef.current.fog) {
        sceneRef.current.fog.density = 0.04;
      }
      if (candlesGroupRef.current) {
        candlesGroupRef.current.children.forEach((candle: any) => {
          if (candle.userData.lowDetailMesh) {
            candle.visible = false;
            candle.userData.lowDetailMesh.visible = true;
          }
        });
      }
    }
  }

  function improveQuality() {
    if (rendererRef.current && sceneRef.current && sceneRef.current.fog) {
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if ('density' in sceneRef.current.fog) {
        sceneRef.current.fog.density = 0.028;
      }
      if (candlesGroupRef.current) {
        candlesGroupRef.current.children.forEach((candle: any) => {
          candle.visible = true;
          if (candle.userData.lowDetailMesh) {
            candle.userData.lowDetailMesh.visible = false;
          }
        });
      }
    }
  }

  // ========= Simplified Candle Geometry =========
  function createSimplifiedCandle(colorHex: number, bodyHeight: number) {
    const group = new THREE.Group();
    
    // Low-detail version (cylinders instead of boxes)
    const bodyGeo = new THREE.CylinderGeometry(0.4, 0.4, bodyHeight, 8);
    const bodyMat = new THREE.MeshLambertMaterial({ color: colorHex });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.castShadow = false; // No shadows on low detail
    body.position.y = bodyHeight/2;
    body.visible = false; // Hidden by default
    group.add(body);
    
    // Store reference
    group.userData.lowDetailMesh = body;
    
    return group;
  }

  // ========= Main Initialization =========
  function init() {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: QUALITY === 'high',
      powerPreference: "high-performance"
    });
    
    renderer.setPixelRatio(QUALITY === 'high' ? Math.min(window.devicePixelRatio, 2) : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = QUALITY === 'high';
    if (QUALITY === 'high') {
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.028);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 3.5, 20);
    const cameraGroup = new THREE.Group();
    cameraGroup.add(camera);
    scene.add(cameraGroup);
    cameraRef.current = camera;
    cameraGroupRef.current = cameraGroup;

    // Optimized lighting
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(6, 10, 8);
    dir.castShadow = QUALITY === 'high';
    if (QUALITY === 'high') {
      dir.shadow.mapSize.set(1024, 1024); // Reduced shadow resolution
    }
    scene.add(dir);
    
    const hemi = new THREE.HemisphereLight(0x334466, 0x050505, 0.6);
    scene.add(hemi);

    // Background grid - simplified
    const gridGeo = new THREE.PlaneGeometry(100, 60);
    const gridMat = new THREE.MeshBasicMaterial({ 
      color: 0x00e0ff, 
      transparent: true, 
      opacity: 0.03, 
      side: THREE.BackSide 
    });
    const gridPlane = new THREE.Mesh(gridGeo, gridMat);
    gridPlane.position.set(0, 0, -25);
    scene.add(gridPlane);

    // Group for candles
    const candlesGroup = new THREE.Group();
    scene.add(candlesGroup);
    candlesGroupRef.current = candlesGroup;

    // Group for particles
    const particlesGroup = new THREE.Group();
    scene.add(particlesGroup);
    particlesGroupRef.current = particlesGroup;

    // Group for ticker elements
    const tickerGroup = new THREE.Group();
    scene.add(tickerGroup);
    tickerGroupRef.current = tickerGroup;

    // Create particle system for data streams
    function createParticleSystem() {
      const particleCount = 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 50;
        positions[i3 + 1] = Math.random() * 20;
        positions[i3 + 2] = (Math.random() - 0.5) * 30;

        const color = new THREE.Color();
        color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        sizes[i] = Math.random() * 3 + 1;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      particles.userData = { 
        originalPositions: positions.slice(),
        time: 0
      };
      particlesGroup.add(particles);
    }

    // Create floating stock ticker elements
    function createStockTicker() {
      const tickerCount = 8;
      for (let i = 0; i < tickerCount; i++) {
        const tickerGroup = new THREE.Group();
        
        // Create ticker background
        const bgGeometry = new THREE.PlaneGeometry(3, 0.8);
        const bgMaterial = new THREE.MeshBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.7
        });
        const bg = new THREE.Mesh(bgGeometry, bgMaterial);
        tickerGroup.add(bg);

        // Create price text (simplified as colored bars for performance)
        const priceGeometry = new THREE.PlaneGeometry(1.5, 0.3);
        const priceMaterial = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? 0x00ff00 : 0xff0000,
          transparent: true,
          opacity: 0.9
        });
        const priceBar = new THREE.Mesh(priceGeometry, priceMaterial);
        priceBar.position.set(0.5, 0, 0.01);
        tickerGroup.add(priceBar);

        // Position tickers in a circle around the scene
        const angle = (i / tickerCount) * Math.PI * 2;
        const radius = 25;
        tickerGroup.position.set(
          Math.cos(angle) * radius,
          Math.random() * 10 + 5,
          Math.sin(angle) * radius
        );
        tickerGroup.rotation.y = angle + Math.PI;

        tickerGroup.userData = {
          basePosition: tickerGroup.position.clone(),
          angle: angle,
          radius: radius,
          speed: 0.01 + Math.random() * 0.02
        };

        if (tickerGroupRef.current) {
          tickerGroupRef.current.add(tickerGroup);
        }
      }
    }

    // Create holographic grid lines
    function createHolographicGrid() {
      const gridSize = 50;
      const divisions = 50;
      const gridHelper = new THREE.GridHelper(gridSize, divisions, 0x00ffff, 0x004444);
      gridHelper.position.y = -2;
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.1;
      scene.add(gridHelper);

      // Add vertical grid lines
      const verticalGrid = new THREE.Group();
      for (let i = 0; i < 20; i++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3((i - 10) * 2, 0, -25),
          new THREE.Vector3((i - 10) * 2, 20, -25)
        ]);
        const material = new THREE.LineBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.05
        });
        const line = new THREE.Line(geometry, material);
        verticalGrid.add(line);
      }
      scene.add(verticalGrid);
    }

    // Initialize all systems
    createParticleSystem();
    createStockTicker();
    createHolographicGrid();

    function createCandlestick(colorHex: number, bodyHeight: number, wickHeight: number = 0.35) {
      const group = new THREE.Group();

      // Main candle body
      const bodyGeo = new THREE.BoxGeometry(0.8, bodyHeight, 0.8);
      const bodyMat = new THREE.MeshPhongMaterial({
        color: colorHex,
        shininess: 50,
        specular: 0x111111,
        emissive: new THREE.Color(colorHex).multiplyScalar(0.05) // Subtle glow
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = QUALITY === 'high';
      body.receiveShadow = false;
      body.position.y = bodyHeight/2;
      group.add(body);

      // Upper wick (thinner and more pronounced)
      const upperWickHeight = wickHeight * 1.2;
      const upperWickGeo = new THREE.CylinderGeometry(0.06, 0.06, upperWickHeight, 6);
      const upperWickMat = new THREE.MeshLambertMaterial({ 
        color: 0xffffff,
        emissive: new THREE.Color(0x888888).multiplyScalar(0.1)
      });
      const upperWick = new THREE.Mesh(upperWickGeo, upperWickMat);
      upperWick.castShadow = true;
      upperWick.position.y = bodyHeight + upperWickHeight/2;
      group.add(upperWick);

      // Lower wick (shorter)
      const lowerWickHeight = wickHeight * 0.8;
      const lowerWickGeo = new THREE.CylinderGeometry(0.06, 0.06, lowerWickHeight, 6);
      const lowerWickMat = new THREE.MeshLambertMaterial({ 
        color: 0xffffff,
        emissive: new THREE.Color(0x888888).multiplyScalar(0.1)
      });
      const lowerWick = new THREE.Mesh(lowerWickGeo, lowerWickMat);
      lowerWick.castShadow = true;
      lowerWick.position.y = -lowerWickHeight/2;
      group.add(lowerWick);

      // Add simplified version for LOD
      const simpleCandle = createSimplifiedCandle(colorHex, bodyHeight);
      group.add(simpleCandle);

      return group;
    }

    function patternHeights(type: string, i: number) {
      switch(type) {
        case 'hammer': return 0.7;
        case 'bullish': return 1.8 + Math.abs(Math.sin(i*0.7))*0.5;
        case 'shooting': return 1.0 + Math.abs(Math.cos(i))*0.3;
        case 'morning': return 1.2 + Math.abs(Math.sin(i*0.5))*0.5;
        case 'piercing': return 1.4 + Math.abs(Math.sin(i*0.9))*0.4;
        default: return 1.0;
      }
    }

    // Create candles
    const patterns = ['hammer','bullish','shooting','morning','piercing'];
    for (let i = 0; i < CANDLE_COUNT; i++) {
      const type = patterns[i % patterns.length];
      const isGreen = (i % 2 === 0);
      const col = isGreen ? 0x2de07c : 0xff4c4c;
      const h = patternHeights(type, i);
      const candle = createCandlestick(col, h);

      const x = (i - (CANDLE_COUNT-1)/2) * (HORIZONTAL_SPREAD / (CANDLE_COUNT/2));
      const z = -Math.abs(x)*0.1 + (Math.random()*0.8 - 0.4);
      candle.position.set(x, 0, z);

      candle.userData = { 
        basePosition: candle.position.clone(), 
        bobOffset: Math.random()*1000, 
        index: i 
      };
      candlesGroup.add(candle);
    }

    // Pointer and scroll interaction
    const pointer = { x: 0, y: 0 };
    const scroll = { y: 0, targetY: 0 };
    let lastMoveTime = performance.now();
    let pointerMoving = false;

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      lastMoveTime = performance.now();
      pointerMoving = true;
    }
    
    function onScroll() {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scroll.targetY = (scrollY / maxScroll) * 2 - 1; // Normalize to -1 to 1
    }
    
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
      const t = clock.getElapsedTime();
      if (performance.now() - lastMoveTime > POINTER_STOP_MS) pointerMoving = false;

      // Update scroll position with inertia
      scroll.y += (scroll.targetY - scroll.y) * SCROLL_INERTIA;
      
      // Camera movement
      const camTargetX = pointer.x * 1.4;
      const camTargetY = (VERTICAL_INVERT ? -pointer.y : pointer.y) * 0.5;
      cameraGroup.position.x += (camTargetX - cameraGroup.position.x) * 0.05;
      cameraGroup.position.y += (camTargetY - cameraGroup.position.y) * 0.05;

      // Candle animation
      candlesGroup.children.forEach((candle: any) => {
        const base = candle.userData.basePosition;
        const distanceFactor = 1 + Math.abs(base.x)/10;
        const targetOffsetX = pointer.x * distanceFactor * 1.2;
        const vSign = VERTICAL_INVERT ? -1 : 1;
        const targetOffsetY = vSign * pointer.y * distanceFactor * 1.4;
        
        // Add scroll-based movement
        const scrollOffsetY = scroll.y * SCROLL_SENSITIVITY * distanceFactor;
        const scrollOffsetZ = scroll.y * 0.3 * (base.x/6);
        
        const targetOffsetZ = -Math.abs(pointer.x)*0.4 * (base.x/6) + scrollOffsetZ;

        const bobAmplitude = pointerMoving ? BOB_AMPLITUDE_WHEN_MOVING : BOB_AMPLITUDE_WHEN_STOPPED;
        const bob = Math.sin(t * BOB_SPEED + candle.userData.bobOffset) * bobAmplitude;

        const targetPos = new THREE.Vector3(
          base.x + targetOffsetX,
          base.y + targetOffsetY + scrollOffsetY + bob,
          base.z + targetOffsetZ
        );
        candle.position.lerp(targetPos, INERTIA);

        const rotX = ( (pointer.y * -1) * 0.05 ) + (scroll.y * 0.02);
        const rotY = ( pointer.x * 0.05 ) + (scroll.y * 0.01);
        candle.rotation.x += (rotX - candle.rotation.x) * 0.06;
        candle.rotation.y += (rotY - candle.rotation.y) * 0.06;
        
        // LOD - switch between detailed and simple based on distance
        if (candle.userData.lowDetailMesh) {
          const distance = camera.position.distanceTo(candle.position);
          if (distance > 15 && QUALITY !== 'high') {
            candle.visible = false;
            candle.userData.lowDetailMesh.visible = true;
          } else {
            candle.visible = true;
            candle.userData.lowDetailMesh.visible = false;
          }
        }
      });

      // Particle system animation
      if (particlesGroup.children.length > 0) {
        const particles = particlesGroup.children[0] as THREE.Points;
        const positions = particles.geometry.attributes.position.array as Float32Array;
        const originalPositions = particles.userData.originalPositions;
        
        particles.userData.time += 0.016;
        
        for (let i = 0; i < positions.length; i += 3) {
          const i3 = i / 3;
          positions[i] = originalPositions[i] + Math.sin(particles.userData.time + i3 * 0.1) * 2;
          positions[i + 1] = originalPositions[i + 1] + Math.cos(particles.userData.time + i3 * 0.05) * 1;
          positions[i + 2] = originalPositions[i + 2] + Math.sin(particles.userData.time * 0.5 + i3 * 0.02) * 3;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y += 0.001;
      }

      // Stock ticker animation
      if (tickerGroupRef.current) {
        tickerGroupRef.current.children.forEach((ticker: any) => {
          ticker.userData.angle += ticker.userData.speed;
          const basePos = ticker.userData.basePosition;
          ticker.position.x = Math.cos(ticker.userData.angle) * ticker.userData.radius;
          ticker.position.z = Math.sin(ticker.userData.angle) * ticker.userData.radius;
          ticker.position.y = basePos.y + Math.sin(t * 0.5 + ticker.userData.angle) * 2;
          ticker.rotation.y = ticker.userData.angle + Math.PI;
          
          // Add pointer interaction
          const distanceToPointer = Math.sqrt(
            Math.pow(ticker.position.x - pointer.x * 10, 2) + 
            Math.pow(ticker.position.z - pointer.y * 10, 2)
          );
          
          if (distanceToPointer < 5) {
            ticker.scale.setScalar(1.2);
            ticker.position.y += 1;
          } else {
            ticker.scale.setScalar(1);
          }
        });
      }

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    }
    
    // Handle resize
    function onWindowResize() {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
    
    window.addEventListener('resize', onWindowResize, false);
    
    // Start animation and performance monitoring
    animate();
    updatePerformanceMonitor();
  }

  useEffect(() => {
    init();

    return () => {
      // Cleanup
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      // Remove event listeners
      window.removeEventListener('resize', () => {});
      window.removeEventListener('pointermove', () => {});
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* 3D Canvas */}
      <canvas 
        ref={canvasRef} 
        id="canvas"
        className="w-full h-full block"
        style={{ background: 'linear-gradient(180deg, #071028, #000)' }}
      />
      
      {/* Live Stock Ticker */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-cyan-400/30">
        <div className="flex items-center overflow-hidden">
          {/* Live badge */}
          <div className="ml-2 mr-2 flex items-center gap-2">
            <div className="px-2 py-0.5 text-[10px] sm:text-xs rounded bg-green-500/15 border border-green-400/30 text-green-300 whitespace-nowrap">
              Live (delayed)
            </div>
            {lastUpdated && (
              <div className="text-[10px] sm:text-xs text-gray-300 whitespace-nowrap">
                Updated: {lastUpdated}
              </div>
            )}
          </div>
          <div className="flex animate-scroll text-white text-sm font-mono">
            {stockData.length === 0 && (
              <div className="flex items-center mx-8 whitespace-nowrap">
                <span className="text-cyan-400 font-bold mr-2">Loading</span>
                <span className="text-white mr-1">—</span>
                <span className="text-green-400">Fetching live quotes…</span>
              </div>
            )}
            {stockData.map((stock, index) => (
              <div key={index} className="flex items-center mx-8 whitespace-nowrap">
                <span className="text-cyan-400 font-bold mr-2">{stock.symbol}</span>
                <span className="text-white mr-1">{stock.price > 0 ? `₹${stock.price.toFixed(2)}` : '—'}</span>
                <span className={`${stock.change >= 0 ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                  {stock.change >= 0 ? '↗' : '↘'} {Math.abs(stock.change).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white">
          <h1 className="text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Wealth Genius
          </h1>
          <p className="text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto px-4">
            Master the Stock Market with Interactive 3D Trading Patterns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
            <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105">
              Start Learning
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Removed auxiliary overlays (performance panel, pattern labels, scroll indicator) */}
    </div>
  );
};

export default Interactive3DHero;
