import React, { useState, useEffect } from "react";
import AuctionItem from "./auctionItem";

function AuctionItems({ items }) {
  const [showReserved, setShowReserved] = useState(true);
  const toggleShowReserved = () => {
    setShowReserved(!showReserved);
    console.log(showReserved);
  };

  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    if (showReserved) {
      // Show all items
      return setFilteredItems([...items]);
    }

    // Filter out some items
    const results = items.filter((item) => !item.fields.taken);
    return setFilteredItems(results);
  }, [showReserved, items]);

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
          onChange={() => toggleShowReserved()}
        />
        <label htmlFor="showReservedCheckBox">Show Reserved Items</label>
      </div>
      <ul className="flex flex-wrap">
        {filteredItems
          ? filteredItems.map((item, index) => (
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
