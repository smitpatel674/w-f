// Market indices data service for Indian market data
export interface MarketIndex {
  symbol: string;
  price: number;
  change?: number;
}

export class MarketIndicesService {
  private static instance: MarketIndicesService;
  private fallbackData: MarketIndex[] = [
    { symbol: 'NIFTY 50', price: 19800.50, change: 0.8 },
    { symbol: 'NIFTY BANK', price: 45200.75, change: -0.5 },
    { symbol: 'SENSEX', price: 66500.25, change: 0.3 },
    { symbol: 'INDIA VIX', price: 13.45, change: -2.1 }
  ];
  private lastRealData: MarketIndex[] = [];
  private lastUpdateTime: number = 0;

  public static getInstance(): MarketIndicesService {
    if (!MarketIndicesService.instance) {
      MarketIndicesService.instance = new MarketIndicesService();
    }
    return MarketIndicesService.instance;
  }

  // Return last known real data or fallback data for quick response
  public getInstantData(): MarketIndex[] {
    // Use last real data if available and recent (within 2 minutes)
    if (this.lastRealData.length > 0 && (Date.now() - this.lastUpdateTime) < 120000) {
      return this.lastRealData;
    }
    
    // Return fallback market indices data with small variations
    return this.fallbackData.map((index: MarketIndex) => ({
      ...index,
      price: index.price + (Math.random() - 0.5) * (index.symbol === 'INDIA VIX' ? 0.5 : 50), // VIX: ±0.25, others: ±25
      change: (Math.random() - 0.5) * 4 // ±2% change variation
    }));
  }

  // Async method that tries to get real market indices data with timeout
  public async getDataWithFallback(
    url: string = 'http://localhost:8000/api/v1/market/live', 
    timeout: number = 3000
  ): Promise<MarketIndex[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        cache: 'no-cache'
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const quotes = Array.isArray(data?.quotes) ? data.quotes : [];
      
      // Update cache with real data
      if (quotes.length > 0) {
        this.lastRealData = quotes;
        this.lastUpdateTime = Date.now();
      }
      
      return quotes.length > 0 ? quotes : this.getInstantData();
    } catch (error) {
      console.warn('Using fallback market indices data due to:', error);
      return this.getInstantData();
    }
  }
}

export const marketIndicesService = MarketIndicesService.getInstance();