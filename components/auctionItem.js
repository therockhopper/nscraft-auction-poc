import Link from "next/link";
import { useEffect, useState } from "react";

const client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

function AuctionItem({ id }) {
  const [item, setItem] = useState(null);

  async function fetchEntries() {
    const item = await client.getEntry(id);
    setItem(item);
  }

  // Watch for id and get item
  useEffect(() => {
    if (id) {
      fetchEntries();
    }
  }, [id]);

  return (
    <div className="flex flex-col">
      {!!item ? (
        <div>
          <h1 className="font-bold text-xl">{item.fields.title}</h1>
        </div>
      ) : (
        "loading.."
      )}
    </div>
  );
}

export default AuctionItem;
