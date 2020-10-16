import { useEffect, useState } from "react";
import Head from "next/head";
import AuctionItems from "../components/auctionItems";

const client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

function HomePage() {
  async function fetchEntries() {
    const entries = await client.getEntries({ content_type: "auctionItem" });
    console.log(entries.items);
    if (entries.items) return entries.items;
    console.log(`Error getting Entries for ${contentType.name}.`);
  }

  const [auctionItems, setAuctionItems] = useState([]);
  const [loop, setLoop] = useState();

  useEffect(() => {
    async function getAuctionItems() {
      const allAuctionItems = await fetchEntries();
      setAuctionItems([...allAuctionItems]);
    }

    setLoop(
      setInterval(() => {
        getAuctionItems();
      }, 15000)
    );

    return function cleanup() {
      clearInterval(loop);
    };
  }, []);

  return (
    <>
      <h1 className="text-lg">NS Craft</h1>
      <AuctionItems items={auctionItems} />
    </>
  );
}

export default HomePage;
