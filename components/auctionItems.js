import React, {useState, useEffect} from 'react';
import AuctionItem from './auctionItemCard';

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

  const [textSearch, setTextSearch] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    console.log({textSearch});
    if (textSearch && items) {
      console.log(searchFor(textSearch, items));
    }
    if (showReserved) {
      // Show all items
      return setFilteredItems([...items]);
    }

    // Filter out some items
    const results = items.filter(item => !item.fields.taken);
    return setFilteredItems(results);
  }, [showReserved, textSearch, items]);

  function searchFor(toSearch, objects) {
    var results = [];
    toSearch = trimString(toSearch); // trim it
    for (var i = 0; i < objects.length; i++) {
      for (var key in objects[i]) {
        if (objects[i][key] && objects[i][key].indexOf(toSearch) != -1) {
          if (!itemExists(results, objects[i])) results.push(objects[i]);
        }
      }
    }
    return results;
  }

  function trimString(s) {
    var l = 0,
      r = s.length - 1;
    while (l < s.length && s[l] == ' ') l++;
    while (r > l && s[r] == ' ') r -= 1;
    return s.substring(l, r + 1);
  }

  function compareObjects(o1, o2) {
    var k = '';
    for (k in o1) if (o1[k] != o2[k]) return false;
    for (k in o2) if (o1[k] != o2[k]) return false;
    return true;
  }

  function itemExists(haystack, needle) {
    for (var i = 0; i < haystack.length; i++)
      if (compareObjects(haystack[i], needle)) return true;
    return false;
  }

  return (
    <div>
      <div className="flex align-center p-4">
        <input
          disabled
          placeholder="Search"
          type="text"
          id="searchItems"
          value={textSearch}
          onChange={e => setTextSearch(e.target.value)}
          className="px-2 border-none"
        />
        <div className="mx-4">
          <input
            type="checkbox"
            id="showReservedCheckBox"
            name="showReserved"
            className="mr-2"
            value={showReserved}
            onChange={() => toggleShowReserved()}
          />
          <label className="cursor-pointer mr-2" htmlFor="showReservedCheckBox">
            Show Reserved Items
          </label>
          <input
            type="checkbox"
            id="showDayOne"
            name="showDayOne"
            className="mr-2"
            value={showDayOne}
            onChange={() => toggleShowDayOne()}
          />
          <label className="cursor-pointer mr-2" htmlFor="showDayOne">
            Day One Items
          </label>
          <input
            type="checkbox"
            id="showDayTwo"
            name="showDayTwo"
            className="mr-2"
            value={showDayTwo}
            onChange={() => toggleShowDayTwo()}
          />
          <label className="cursor-pointer" htmlFor="showDayTwo">
            Day Items 2
          </label>
        </div>
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
