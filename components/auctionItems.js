import {SearchOutlined} from '@ant-design/icons';
import {Checkbox, Input } from 'antd';
import React, {useEffect, useState} from 'react';
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
  const [showSilentAuction, setShowSilentAuction] = useState(true);
  const toggleShowSilentAuction = () => {
    setShowSilentAuction(!showSilentAuction);
  };

  const [showReserved, setShowReserved] = useState(true);
  const toggleShowReserved = () => {
    setShowReserved(!showReserved);
  };

  const [textSearch, setTextSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const searchKeys = [
    'titie',
    'subtitle',
    'company',
    'description',
    'itemNumber',
  ];
  useEffect(() => {
    if (!items) return;
    let results = [];
    const search = textSearch.toLowerCase();

    // Filter by day to start
    items.map(item => {

      if (!!textSearch) {
        // does it match the text search?
        const matches = searchKeys.some(key => {
          let val = item.fields[key]
          if (typeof val !== 'string') val = JSON.stringify(val)
          return !!val && val.toLowerCase().includes(search);
        });
        if (!matches) return; // does not match text search, skip it
      }

      const {itemNumber = 0, taken, year} = item.fields;

      if (taken) {
        if (!showDayOne && !showDayTwo && showReserved) {
          results.push(item); // The user only wants to see all the reserved items
          return;
        }

        if (!showReserved) return;
      }

      // any itesm above 100 is silent auction
      if (showSilentAuction && itemNumber > 100) {
        // don't show silent auction item
        results.push(item);
        return;
      }

      if (showDayOne && itemNumber <= 50) {
        results.push(item);
        return;
      }

      if (showDayTwo && itemNumber > 50 && itemNumber <= 100) {
        results.push(item);
        return;
      }
    });

    results = results.filter(i => {
      if (!i.fields.poster) console.log(i);
      return !!i.fields.poster;
    });

    // Sort by Item Number
    results.sort(function(a, b) {
      return a.fields.itemNumber - b.fields.itemNumber;
    });
    return setFilteredItems(results);
  }, [showReserved, showDayOne, showDayTwo, textSearch, items]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row align-center p-4">
        <div className="flex mb-6 lg:mb-0 align-center items-center order-2 lg:order-2 py-2">
          <Input
            placeholder="Search All Items"
            prefix={<SearchOutlined />}
            id="searchItems"
            value={textSearch}
            onChange={e => setTextSearch(e.target.value)}
            className="px-2 my-1 border-b-2 border-gray-400 focus:border-blue-500 outline-none h-8"
          />
        </div>
        <div className="mx-6 flex flex-col md:flex-row md:items-center md:align-center order-1 lg:order-2">

          <div className="flex py-2 items-center">
            <Checkbox
              id="showReservedCheckBox"
              name="showReserved"
              className="mr-2"
              checked={showReserved}
              onChange={() => toggleShowReserved()} >
              Acquired Items
            </Checkbox>
          </div>
          <div className="flex py-2 items-center">
            <Checkbox
              id="showDayOne"
              name="showDayOne"
              className="mr-2"
              checked={showDayOne}
              onChange={() => toggleShowDayOne()}
            >
              6pm-8pm Items
            </Checkbox>
          </div>
          <div className="flex py-2 items-center">
            <Checkbox
              id="showDayTwo"
              name="showDayTwo"
              className="mr-2"
              checked={showDayTwo}
              onChange={() => toggleShowDayTwo()}
            >
              8:30pm-10:30pm Items
            </Checkbox>
          </div>
          <div className="flex py-2 items-center">
            <Checkbox
              id="showSilentAuction"
              name="showSilentAuction"
              className="mr-2"
              checked={showSilentAuction}
              onChange={() => toggleShowSilentAuction()}
            >
              Silent Auction Items
            </Checkbox>
          </div>
        </div>
      </div>
      <ul className="auctionItems px-2">
        {!!filteredItems && filteredItems.length ? (
          filteredItems.map((item, index) => (
            <li key={item.sys.id + index}>
              <AuctionItem item={item} />
            </li>
          ))
        ) : (
          <li className="text-gray-700 font-semibold italic px-4 py-2">
            No Items match the filters selected
          </li>
        )}
      </ul>
    </div>
  );
}

export default AuctionItems;
