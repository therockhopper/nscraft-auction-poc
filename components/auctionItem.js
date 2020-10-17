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
    console.log(item.fields);
    setItem(item);
  }

  // Watch for id and get item
  useEffect(() => {
    if (id) {
      fetchEntries();
    }
  }, [id]);

  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    if (!item) return;
    let pictures = [];
    item.fields.images.map((image) => {
      pictures.push(image.fields);
    });
    console.log(pictures);
    setPictures(pictures);
  }, [item]);

  const [description, setDescription] = useState("");
  useEffect(() => {
    if (!item) return;
    let description = "";
    item.fields.description.content.map((c) => {
      c.content.map((x) => {
        description += x.value;
      });
    });
    setDescription(description);
  }, [item]);

  return (
    <div className="flex flex-col p-4">
      {!!item ? (
        <div>
          <div
            className="h-64 w-64 mb-6"
            style={{
              backgroundImage:
                "url(" + item.fields.poster.fields.file.url + ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <h1 className="font-bold text-xl">{item.fields.title}</h1>
          <p className="text-gray-900">{description}</p>
          <div>
            {pictures.map((image, idx) => {
              <div>
                <div
                  className="h-64 w-64 mb-6"
                  style={{
                    backgroundImage: "url(" + image.file.url + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <h4>
                  title: {image.title} {image.file.url}
                </h4>
              </div>;
            })}
          </div>
        </div>
      ) : (
        "loading.."
      )}
    </div>
  );
}

export default AuctionItem;
