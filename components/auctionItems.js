import React, { useState, useEffect } from "react";
import AuctionItem from "./auctionItem";

function AuctionItems({ items }) {
  const [showReserved, setShowReserved] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    console.log(showReserved);
    const filteredItems = items.filter((item) => {
      return showReserved ? true : item.fields.taken;
    });

    setFilteredItems([...filteredItems]);
  }, []);

  return (
    <div>
      <div className="cursor-pointer flex align-center">
        {!!showReserved}
        <input
          type="checkbox"
          id="showReservedCheckBox"
          name="showReserved"
          className="mr-2"
          value={showReserved}
          onChange={() => setShowReserved(!showReserved)}
        />
        <label htmlFor="showReservedCheckBox">Show Reserved Items</label>
      </div>
      <ul className="flex flex-wrap">
        {items
          ? items.map((item, index) => (
              <li key={item.fields.title + index} className="m-4">
                <AuctionItem fields={item.fields} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default AuctionItems;
