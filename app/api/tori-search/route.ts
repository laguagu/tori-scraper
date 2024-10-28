import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

interface Result {
  title: string;
  price: string;
  location: string;
  imageUrl: string | undefined;
  link: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  try {
    const response = await fetch(
      `https://www.tori.fi/recommerce/forsale/search?q=${encodeURIComponent(
        query || ""
      )}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    );

    const html = await response.text();
    const $ = cheerio.load(html);

    const results: Result[] = [];

    $(".sf-result-list article.sf-search-ad").each((i, el) => {
      const title = $(el).find("h2").text().trim();
      const priceElement = $(el).find(".font-bold").first();
      const price = priceElement.text().trim();
      const location = $(el)
        .find(".text-xs.s-text-subtle span")
        .first()
        .text()
        .trim();
      const imageUrl = $(el).find("img").attr("src");
      const link = $(el).find("h2 a").attr("href");

      if (title && link) {
        results.push({
          title,
          price,
          location,
          imageUrl,
          link: link.startsWith("http") ? link : `https://www.tori.fi${link}`,
        });
      }
    });

    console.log("Löydettiin", results.length, "tulosta");
    return NextResponse.json({ results });
  } catch (error) {
    console.error("Haku epäonnistui:", error);
    return NextResponse.json({ error: "Haku epäonnistui" }, { status: 500 });
  }
}
