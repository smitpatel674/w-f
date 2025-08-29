import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  TrendingUp, Users, Award, BookOpen, ArrowRight, CheckCircle, Star, 
  Play, Shield, Clock, Target, BarChart, PieChart, DollarSign, 
  Zap, Globe, HeadphonesIcon, Calendar, Phone, Mail
} from 'lucide-react';

const Home = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const coursesRef = useRef(null);
  const whyChooseRef = useRef(null);
  const successRef = useRef(null);
  const testimonialsRef = useRef(null);
  const instructorsRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.timeline()
        .fromTo('.hero-title', 
          { opacity: 0, y: 100 }, 
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        )
        .fromTo('.hero-subtitle', 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, duration: 0.8 }, "-=0.6"
        )
        .fromTo('.hero-cta', 
          { opacity: 0, scale: 0.8 }, 
          { opacity: 1, scale: 1, duration: 0.6 }, "-=0.4"
        )
        .fromTo('.hero-image', 
          { opacity: 0, x: 100 }, 
          { opacity: 1, x: 0, duration: 1 }, "-=0.8"
        )
        .fromTo('.floating-card', 
          { opacity: 0, y: 30, rotation: -5 }, 
          { opacity: 1, y: 0, rotation: 0, duration: 0.8, stagger: 0.2 }, "-=0.5"
        );

      // Stats Counter Animation
      gsap.fromTo('.stat-number', 
        { innerText: 0 },
        {
          innerText: (i, el) => el.getAttribute('data-count'),
          duration: 2.5,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          }
        }
      );

      // Features Animation
      gsap.fromTo('.feature-card', 
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          }
        }
      );

      // Courses Animation
      gsap.fromTo('.course-item', 
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1,
          duration: 0.7,
          stagger: 0.2,
          scrollTrigger: {
            trigger: coursesRef.current,
            start: "top 80%",
          }
        }
      );

      // Why Choose Us Animation
      gsap.fromTo('.why-item', 
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: whyChooseRef.current,
            start: "top 80%",
          }
        }
      );

      // Success Stories Animation
      gsap.fromTo('.success-metric', 
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: successRef.current,
            start: "top 80%",
          }
        }
      );

      // Testimonials Animation
      gsap.fromTo('.testimonial-card', 
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.2,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
          }
        }
      );

      // Instructors Animation
      gsap.fromTo('.instructor-card', 
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: instructorsRef.current,
            start: "top 80%",
          }
        }
      );

      // Pricing Animation
      gsap.fromTo('.pricing-card', 
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: pricingRef.current,
            start: "top 80%",
          }
        }
      );

      // FAQ Animation
      gsap.fromTo('.faq-item', 
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
          }
        }
      );

      // CTA Animation
      gsap.fromTo('.cta-content', 
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          }
        }
      );

      // Continuous floating animation for hero cards
      gsap.to('.floating-card', {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const courses = [
    {
      title: "Stock Market Fundamentals",
      description: "Perfect foundation for beginners",
      duration: "6 weeks",
      level: "Beginner",
      price: "$299",
      icon: <BookOpen className="h-8 w-8" />,
      features: ["Market basics", "Investment principles", "Risk management"]
    },
    {
      title: "Technical Analysis Mastery",
      description: "Advanced chart reading techniques",
      duration: "8 weeks",
      level: "Intermediate",
      price: "$599",
      icon: <BarChart className="h-8 w-8" />,
      features: ["Chart patterns", "Technical indicators", "Trend analysis"]
    },
    {
      title: "Options Trading Pro",
      description: "Master complex options strategies",
      duration: "10 weeks",
      level: "Advanced",
      price: "$899",
      icon: <TrendingUp className="h-8 w-8" />,
      features: ["Options Greeks", "Advanced strategies", "Risk hedging"]
    }
  ];

  const instructors = [
    {
      name: "Michael Davis",
      title: "Founder & Chief Instructor",
      experience: "15+ years Wall Street",
      specialty: "Day Trading & Options",
      image: "MD"
    },
    {
      name: "Sarah Kim",
      title: "Head of Curriculum",
      experience: "12+ years Hedge Funds",
      specialty: "Fundamental Analysis",
      image: "SK"
    },
    {
      name: "James Rodriguez",
      title: "Technical Analysis Expert",
      experience: "10+ years Institutional",
      specialty: "Algorithmic Trading",
      image: "JR"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for beginners starting their trading journey",
      features: [
        "Access to 3 beginner courses",
        "Basic trading simulator",
        "Community forum access",
        "Weekly market updates",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      description: "Comprehensive training for serious traders",
      features: [
        "Access to all courses",
        "Advanced trading simulator",
        "Live trading sessions",
        "1-on-1 mentoring (2hrs/month)",
        "Priority support",
        "Market analysis reports"
      ],
      popular: true
    },
    {
      name: "Elite",
      price: "$599",
      period: "/month",
      description: "Premium experience with exclusive benefits",
      features: [
        "Everything in Professional",
        "Unlimited 1-on-1 mentoring",
        "Private Discord channel",
        "Exclusive trading strategies",
        "Portfolio review sessions",
        "Direct instructor access"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Do I need prior trading experience?",
      answer: "Not at all! Our courses are designed for all levels, from complete beginners to experienced traders looking to refine their skills."
    },
    {
      question: "What's the success rate of your students?",
      answer: "95% of our students report improved trading performance within 6 months, with 78% achieving consistent profitability."
    },
    {
      question: "Do you provide ongoing support after course completion?",
      answer: "Yes! All students get lifetime access to our community forum and monthly Q&A sessions with instructors."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll refund your investment."
    },
    {
      question: "Are the courses available online or in-person?",
      answer: "We offer both options! You can attend live sessions in our NYC location or join virtually from anywhere in the world."
    },
    {
      question: "How much capital do I need to start trading?",
      answer: "You can start learning with our simulator using virtual money. For live trading, we recommend starting with at least $1,000."
    }
  ];

  return (
    <div ref={heroRef} className="pt-20">
      {/* Enhanced Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🎯 #1 Trading Education Platform
            </div>
            <h1 className="hero-title text-6xl lg:text-7xl font-bold text-blue-900 mb-6 leading-tight">
              Master the
              <span className="text-blue-600 block"> Stock Market</span>
              <span className="text-gray-700 text-3xl lg:text-4xl block mt-2">Like a Pro</span>
            </h1>
            <p className="hero-subtitle text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Transform your financial future with our comprehensive trading education. 
              Learn from Wall Street experts and join 5,000+ successful traders worldwide.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center group shadow-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-semibold">4.9/5</span> (2,500+ reviews)
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-1" />
                <span>5,000+ students</span>
              </div>
            </div>
          </div>
          
          <div className="hero-image relative">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="floating-card bg-white rounded-2xl p-6 shadow-2xl transform rotate-2 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">Trading Dashboard</h3>
                  <span className="text-green-600 font-bold text-lg">+$12,847</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">AAPL</span>
                    <span className="text-green-600 font-semibold">+12.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">MSFT</span>
                    <span className="text-green-600 font-semibold">+8.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">TSLA</span>
                    <span className="text-red-600 font-semibold">-2.1%</span>
                  </div>
                </div>
                <div className="mt-4 bg-blue-50 rounded-lg p-3">
                  <div className="text-xs text-blue-600 mb-1">Portfolio Growth</div>
                  <div className="text-2xl font-bold text-blue-900">+24.7%</div>
                </div>
              </div>

              {/* Floating Success Card */}
              <div className="floating-card absolute -top-4 -right-4 bg-green-500 text-white rounded-xl p-4 shadow-lg transform -rotate-3 z-20">
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  <div>
                    <div className="text-sm opacity-90">This Month</div>
                    <div className="font-bold">+$4,250</div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="floating-card absolute -bottom-6 -left-4 bg-blue-600 text-white rounded-xl p-4 shadow-lg transform rotate-1 z-20">
                <div className="flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  <div>
                    <div className="text-sm opacity-90">Win Rate</div>
                    <div className="font-bold">87%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section ref={statsRef} className="py-20 bg-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Thousands of Traders</h2>
            <p className="text-xl text-blue-200">Real results from real students</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-800 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-white" />
              </div>
              <div className="stat-number text-5xl font-bold text-white mb-2" data-count="100">0</div>
              <p className="text-blue-200 font-medium">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="h-10 w-10 text-white" />
              </div>
              <div className="stat-number text-5xl font-bold text-white mb-2" data-count="15">0</div>
              <p className="text-blue-200 font-medium">Lakhs in Profits</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-10 w-10 text-white" />
              </div>
              <div className="stat-number text-5xl font-bold text-white mb-2" data-count="95">0</div>
              <p className="text-blue-200 font-medium">Success Rate %</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <div className="stat-number text-5xl font-bold text-white mb-2" data-count="2">0</div>
              <p className="text-blue-200 font-medium">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section ref={featuresRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-blue-900 mb-6">Why MarketPro Leads the Industry</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We combine cutting-edge technology with proven trading strategies to deliver 
              an unmatched learning experience that transforms beginners into profitable traders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert-Led Training</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Learn from Wall Street veterans with decades of trading experience and proven track records.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Live trading sessions daily
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Personal 1-on-1 mentoring
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Real-time market analysis
                </li>
              </ul>
            </div>

            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Advanced Trading Platform</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Practice with our state-of-the-art simulator using real market data before risking real money.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Paper trading with $100K virtual
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Advanced charting tools
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Risk management features
                </li>
              </ul>
            </div>

            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Vibrant Community</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Join thousands of traders sharing strategies, insights, and supporting each other's success.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Private Discord community
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Weekly group coaching calls
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Peer-to-peer learning network
                </li>
              </ul>
            </div>

            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Risk Management Focus</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Master the art of protecting your capital with proven risk management strategies.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Position sizing strategies
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Stop-loss optimization
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Portfolio diversification
                </li>
              </ul>
            </div>

            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Cutting-Edge Technology</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Leverage AI-powered market analysis and automated trading tools for better decisions.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  AI market sentiment analysis
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Automated screening tools
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Real-time alerts system
                </li>
              </ul>
            </div>

            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HeadphonesIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">24/7 Support System</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Get help whenever you need it with our comprehensive support system and resources.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  24/7 technical support
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Comprehensive knowledge base
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Video tutorial library
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section ref={coursesRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-blue-900 mb-6">Most Popular Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your trading journey with our most sought-after courses, designed by industry experts 
              and proven by thousands of successful students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="course-item bg-white border-2 border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden group">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      {course.icon}
                    </div>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-6">{course.description}</p>

                  <div className="space-y-3 mb-6">
                    {course.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600">{course.price}</div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 group-hover:shadow-lg">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300">
              View All Courses
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyChooseRef} className="py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-blue-900 mb-8">Why 95% of Our Students Succeed</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our proven methodology combines theoretical knowledge with practical application, 
                ensuring you develop real-world trading skills that generate consistent profits.
              </p>

              <div className="space-y-6">
                <div className="why-item flex items-start">
                  <div className="bg-blue-600 p-2 rounded-lg mr-4 mt-1">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Personalized Learning Path</h4>
                    <p className="text-gray-600">Customized curriculum based on your experience level and trading goals.</p>
                  </div>
                </div>

                <div className="why-item flex items-start">
                  <div className="bg-blue-600 p-2 rounded-lg mr-4 mt-1">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Small Class Sizes</h4>
                    <p className="text-gray-600">Maximum 15 students per class ensures personal attention from instructors.</p>
                  </div>
                </div>

                <div className="why-item flex items-start">
                  <div className="bg-blue-600 p-2 rounded-lg mr-4 mt-1">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Proven Track Record</h4>
                    <p className="text-gray-600">10 years of success with over $50M in student profits generated.</p>
                  </div>
                </div>

                <div className="why-item flex items-start">
                  <div className="bg-blue-600 p-2 rounded-lg mr-4 mt-1">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Risk-First Approach</h4>
                    <p className="text-gray-600">Learn to protect your capital before focusing on profits - the key to long-term success.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Student Success Metrics</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Profitable After 6 Months</span>
                      <span className="font-bold text-green-600">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Course Completion Rate</span>
                      <span className="font-bold text-blue-600">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Student Satisfaction</span>
                      <span className="font-bold text-purple-600">97%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-purple-500 h-3 rounded-full" style={{width: '97%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Average ROI Improvement</span>
                      <span className="font-bold text-orange-600">340%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-orange-500 h-3 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section ref={successRef} className="py-24 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Real Success Stories</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              See how our students transformed their financial lives through disciplined trading education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="success-metric bg-blue-800 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">$2.3M</div>
              <p className="text-blue-200 mb-4">Total Student Profits This Year</p>
              <div className="bg-blue-700 rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-blue-100">+127% from last year</p>
              </div>
            </div>

            <div className="success-metric bg-blue-800 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">87%</div>
              <p className="text-blue-200 mb-4">Average Win Rate</p>
              <div className="bg-blue-700 rounded-lg p-4">
                <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-blue-100">Industry leading performance</p>
              </div>
            </div>

            <div className="success-metric bg-blue-800 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">156</div>
              <p className="text-blue-200 mb-4">Full-Time Traders Created</p>
              <div className="bg-blue-700 rounded-lg p-4">
                <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-blue-100">Financial freedom achieved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-blue-900 mb-6">What Our Students Say</h2>
            <p className="text-xl text-gray-600">Hear from traders who transformed their lives with MarketPro</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-card bg-gray-50 p-8 rounded-2xl relative">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                "MarketPro didn't just teach me to trade - they taught me to think like a professional trader. 
                I went from losing money consistently to generating $15K+ monthly profits."
              </blockquote>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  JS
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">John Smith</h4>
                  <p className="text-sm text-gray-600">Former Engineer → Full-Time Day Trader</p>
                  <p className="text-xs text-green-600 font-semibold">+$180K Annual Profit</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card bg-gray-50 p-8 rounded-2xl relative">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                "The risk management principles I learned here saved me from major losses during market volatility. 
                My portfolio is now consistently profitable with controlled risk."
              </blockquote>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  MJ
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Maria Johnson</h4>
                  <p className="text-sm text-gray-600">Marketing Manager → Swing Trader</p>
                  <p className="text-xs text-green-600 font-semibold">+$85K Portfolio Growth</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card bg-gray-50 p-8 rounded-2xl relative">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                "Best investment I've ever made. The knowledge and mentorship I received here have 
                generated returns that paid for the course 50 times over."
              </blockquote>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  RD
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Robert Davis</h4>
                  <p className="text-sm text-gray-600">Retired Teacher → Options Trader</p>
                  <p className="text-xs text-green-600 font-semibold">+$250K in 18 Months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Instructors */}
      <section ref={instructorsRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-blue-900 mb-6">Learn from the Best</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our instructors are seasoned professionals with decades of combined Wall Street and 
              institutional trading experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <div key={index} className="instructor-card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="p-8 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {instructor.image}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{instructor.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{instructor.title}</p>
                  <p className="text-gray-600 mb-4">{instructor.experience}</p>
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800 font-semibold">Specializes in:</p>
                    <p className="text-blue-600">{instructor.specialty}</p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-blue-900 mb-6">Choose Your Learning Path</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing options designed to fit your budget and learning goals. 
              Start your trading journey today with our comprehensive programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'border-2 border-blue-500 transform scale-105' : 'border border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-4 rounded-lg font-semibold transition-colors duration-300 ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All plans include 30-day money-back guarantee</p>
            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Compare All Features →
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-blue-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Get answers to the most common questions about our trading education programs
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed ml-11">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaRef} className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="cta-content text-center">
            <h2 className="text-6xl font-bold text-white mb-6">Ready to Transform Your Financial Future?</h2>
            <p className="text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Join thousands of successful traders who started their journey with MarketPro. 
              Take the first step towards financial independence today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <button className="bg-white text-blue-600 px-10 py-5 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg">
                Start Free 7-Day Trial
              </button>
              <button className="border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center">
                <Phone className="mr-2 h-6 w-6" />
                Schedule Free Consultation
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-blue-100">No Credit Card Required</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-blue-100">30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-blue-100">Instant Access to All Materials</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;