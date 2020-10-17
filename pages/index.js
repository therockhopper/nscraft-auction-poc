import { useEffect, useState } from "react";
import Head from "next/head";
import AuctionItems from "../components/auctionItems";

const client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

function HomePage() {
  const [auctionItems, setAuctionItems] = useState([]);

  async function fetchEntries() {
    const entries = await client.getEntries({ content_type: "auctionItem" });
    if (entries.items) return entries.items;
    console.log(`Error getting Entries for ${contentType.name}.`);
  }

  useEffect(() => {
    async function getAuctionItems() {
      const allAuctionItems = await fetchEntries();
      do {
        allAuctionItems.push(...allAuctionItems);
      } while (allAuctionItems.length < 10); // ensure we allways have 10 items to test with
      setAuctionItems([...allAuctionItems]);
    }
    getAuctionItems();

    const interval = setInterval(() => {
      getAuctionItems();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col p-4">
      <div className="flex text-blue-600 justify-center">
        <h1 className="text-3xl font-bold">NS Craft Auction</h1>
      </div>
      <AuctionItems items={auctionItems} />
    </div>
  );
}

export default HomePage;
