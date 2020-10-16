import { useEffect, useState } from "react";
import Head from "next/head";
import Post from "./components/post";

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
        console.log("loading items");
        getAuctionItems();
      }, 5000)
    );

    return function cleanup() {
      console.log("cleaning up");
      clearInterval(loop);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Next.js + Contentful</title>
        <link
          rel="stylesheet"
          href="https://css.zeit.sh/v1.css"
          type="text/css"
        />
      </Head>
      {auctionItems.length > 0
        ? auctionItems.map((p) => (
            <div key={p.fields.title}>
              {p.fields.title}
              <br />
              <span>taken: {p.fields.taken}</span>
            </div>
          ))
        : null}
    </>
  );
}

export default HomePage;
