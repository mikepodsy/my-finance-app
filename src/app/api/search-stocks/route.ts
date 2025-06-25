export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();
  if (!query || query.length < 1) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Use yahoo-finance's search method
    const results = await yahooFinance.search(query);
    // Filter to only equities and map to symbol/name
    const stocks = (results.quotes || [])
      .filter((item: any) => item.quoteType === "EQUITY")
      .map((item: any) => ({
        symbol: item.symbol,
        name: item.shortname || item.longname || item.symbol,
      }));
    return NextResponse.json({ results: stocks });
  } catch (e) {
    return NextResponse.json({ results: [], error: (e as Error).message }, { status: 500 });
  }
} 