import React, {useState, useEffect} from 'react';
import AuctionItem2 from './auctionItemCard2';
import './auctionItems.css'

function AuctionItems({items}) {
  const [showDayOne, setShowDayOne] = useState(true);
  const toggleShowDayOne = () => {
    setShowDayOne(!showDayOne);
  };
  const [showDayTwo, setShowDayTwo] = useState(true);
  const toggleShowDayTwo = () => {
    setShowDayTwo(!showDayTwo);
  };

  const [showReserved, setShowReserved] = useState(true);
  const toggleShowReserved = () => {
    setShowReserved(!showReserved);
  };

  const [textSearch, setTextSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    if (!items) return;
    let results = [];

    // Filter by day to start
    items.map(item => {
      const {itemNumber = 0, taken} = item.fields;
      if (!showReserved && taken) return;

      if (!!textSearch && !JSON.stringify(item).toLowerCase().includes(textSearch.toLowerCase())) {
        // does not match text search
        return;
      }

      if (showDayOne && itemNumber < 40) {
        results.push(item);
        return;
      }

      if (showDayTwo && itemNumber > 40) {
        results.push(item);
        return;
      }
    });

    results = results.filter(i => {
      if (!i.fields.poster) {
        console.log(i)
      }
      return !!i.fields.poster;
    });
    return setFilteredItems(results);
  }, [showReserved, showDayOne, showDayTwo, textSearch, items]);

  return (
    <div>
      <div className="flex align-center p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 text-gray-80">
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <input
          placeholder="Search All Items"
          type="text"
          id="searchItems"
          value={textSearch}
          onChange={e => setTextSearch(e.target.value)}
          className="px-2 py-1 border-b-2 border-gray-400 focus:border-blue-500 outline-none"
        />
        <div className="mx-6 flex items-center">
          <input
            type="checkbox"
            id="showReservedCheckBox"
            name="showReserved"
            className="mr-2"
            checked={showReserved}
            onChange={() => toggleShowReserved()}
          />
          <label className="cursor-pointer mr-6" htmlFor="showReservedCheckBox">
            Reserved Items
          </label>
          <input
            type="checkbox"
            id="showDayOne"
            name="showDayOne"
            className="mr-2"
            checked={showDayOne}
            onChange={() => toggleShowDayOne()}
          />
          <label className="cursor-pointer mr-6" htmlFor="showDayOne">
            Day One Items
          </label>
          <input
            type="checkbox"
            id="showDayTwo"
            name="showDayTwo"
            className="mr-2"
            checked={showDayTwo}
            onChange={() => toggleShowDayTwo()}
          />
          <label className="cursor-pointer" htmlFor="showDayTwo">
            Day Two Items
          </label>
        </div>
      </div>
      <ul className="auctionItems">
        {!!filteredItems &&
          filteredItems.map((item, index) => (
            <li key={item.sys.id + index}>
              <AuctionItem2 item={item} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AuctionItems;
