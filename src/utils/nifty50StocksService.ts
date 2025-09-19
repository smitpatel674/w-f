// NIFTY 50 stocks data service
export interface StockQuote {
  symbol: string;
  price: number;
  change?: number;
}

export class Nifty50StocksService {
  private static instance: Nifty50StocksService;
  private fallbackData: StockQuote[] = [
    { symbol: 'RELIANCE', price: 2800.50, change: 1.2 },
    { symbol: 'TCS', price: 3650.75, change: -0.8 },
    { symbol: 'HDFCBANK', price: 1650.25, change: 2.1 },
    { symbol: 'ICICIBANK', price: 950.80, change: 0.5 },
    { symbol: 'INFY', price: 1450.60, change: -1.3 },
    { symbol: 'ITC', price: 445.80, change: -0.3 },
    { symbol: 'LT', price: 3420.90, change: 1.8 },
    { symbol: 'SBIN', price: 720.40, change: 1.5 },
    { symbol: 'HINDUNILVR', price: 2450.30, change: 0.8 },
    { symbol: 'BHARTIARTL', price: 1180.90, change: -0.7 }
  ];
  private lastRealData: StockQuote[] = [];
  private lastUpdateTime: number = 0;

  public static getInstance(): Nifty50StocksService {
    if (!Nifty50StocksService.instance) {
      Nifty50StocksService.instance = new Nifty50StocksService();
    }
    return Nifty50StocksService.instance;
  }

  // Return last known real data or fallback data for quick response
  public getInstantData(limit: number = 10): StockQuote[] {
    // Use last real data if available and recent (within 2 minutes)
    if (this.lastRealData.length > 0 && (Date.now() - this.lastUpdateTime) < 120000) {
      return this.lastRealData.slice(0, limit);
    }
    
    // Return fallback NIFTY 50 stocks data with small variations
    return this.fallbackData.slice(0, limit).map((stock: StockQuote) => ({
      ...stock,
      price: stock.price + (Math.random() - 0.5) * 10, // ±5 price variation
      change: (Math.random() - 0.5) * 4 // ±2% change variation
    }));
  }

  // Async method that tries to get real NIFTY 50 stocks data with timeout
  public async getDataWithFallback(
    url: string = 'http://localhost:8000/api/v1/market/live', 
    limit: number = 10,
    timeout: number = 5000
  ): Promise<StockQuote[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${url}?limit=${limit}`, {
        signal: controller.signal,
        cache: 'no-cache'
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const quotes = Array.isArray(data?.quotes) ? data.quotes : [];
      
      // Clean symbol names (remove -EQ suffix)
      const cleanedQuotes = quotes.map((quote: any) => ({
        ...quote,
        symbol: quote.symbol.replace('-EQ', '')
      }));
      
      // Update cache with real data
      if (cleanedQuotes.length > 0) {
        this.lastRealData = cleanedQuotes;
        this.lastUpdateTime = Date.now();
      }
      
      return cleanedQuotes.length > 0 ? cleanedQuotes : this.getInstantData(limit);
    } catch (error) {
      console.warn('Using fallback NIFTY 50 stocks data due to:', error);
      return this.getInstantData(limit);
    }
  }
}

export const nifty50StocksService = Nifty50StocksService.getInstance();