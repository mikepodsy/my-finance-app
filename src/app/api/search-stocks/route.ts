export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();
  if (!query || query.length < 1) {
    return NextResponse.json({ results: [] });
  }

  try {
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    const stocks = (data.quotes || [])
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