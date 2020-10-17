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
      console.log(allAuctionItems);
      setAuctionItems([...allAuctionItems]);
    }

    getAuctionItems();
  }, []);

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-semibold">NS Craft Auction POC</h1>
      <AuctionItems items={auctionItems} />
    </div>
  );
}

export default HomePage;
