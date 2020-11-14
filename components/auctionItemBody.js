import {useEffect, useState} from 'react';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';

export default function AuctionItemBody({item}) {
  const [description, setDescription] = useState({__html: ''});
  useEffect(() => {
    async function getData() {
      try {
        const rendredHTML = await documentToHtmlString(item.fields.description);
        setDescription({__html: rendredHTML});
      } catch (e) {}
    }
    if (item) {
      getData();
    }
  }, [item]);

  return (
    <div>
      <h1 className="font-bold text-xl">{item.fields.title}</h1>
      <div className="text-sm flex flex-col justify-between h-full py-4">
        {item.fields.taken ? (
          <span className="text-red-400 pb-2">Reserved</span>
        ) : (
          <span className="text-green-600 pb-2">Available</span>
        )}

        <p className="leading-none pb-2">${item.fields.value}</p>
        <span className="text-gray-90">
    #{item.fields.silentAuction && 'Silent Auction'}
          {(!item.fields.silentAuction && item.fields.itemNumber) || 0}
        </span>
      </div>

      <div className="text-gray-900" dangerouslySetInnerHTML={description} />
    </div>
  );
}
