import React, { useState, useEffect } from "react";
import AuctionItem from "./auctionItemCard";

function AuctionItems({ items }) {
  const [showReserved, setShowReserved] = useState(true);
  const toggleShowReserved = () => {
    setShowReserved(!showReserved);
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
      <div className="flex align-center p-4">
        <input
          type="checkbox"
          id="showReservedCheckBox"
          name="showReserved"
          className="mr-2"
          value={showReserved}
          onChange={() => toggleShowReserved()}
        />
        <label className="cursor-pointer" htmlFor="showReservedCheckBox">
          Show Reserved Items
        </label>
      </div>
      <ul className="flex flex-wrap">
        {filteredItems.map((item, index) => (
          <li key={item.sys.id + index} className="m-4">
            <AuctionItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuctionItems;
