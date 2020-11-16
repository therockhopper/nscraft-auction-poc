import {useEffect, useState} from 'react';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import options from './contentfullRichTextOptions';

export default function AuctionItemBody({item}) {
  const [description, setDescription] = useState('');
  useEffect(() => {
    async function getData() {
      try {
        const rendredHTML = await documentToReactComponents(
          item.fields.description,
          options,
        );
        setDescription(rendredHTML);
      } catch (e) {}
    }
    if (item) {
      getData();
    }
  }, [item]);

  return (
    <div>
      <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">
        {item.fields.company}
      </p>
      <h1 className="font-bold text-xl">{item.fields.title}</h1>
      <div className="text-sm flex flex-col justify-between h-full py-2">
        {item.fields.taken ? (
          <span className="text-red-400 pb-2">Acquired</span>
        ) : (
          <span className="text-green-600 pb-2">Available</span>
        )}

        <p className="leading-none pb-2">${item.fields.value}</p>
        <span className="text-gray-90">
          {item.fields.itemNumber > 80 && 'Silent Auction '}
          {item.fields.itemNumber && '#'}
          {item.fields.itemNumber && item.fields.itemNumber}
        </span>
      </div>

      <div className="text-gray-900"> {description}</div>
    </div>
  );
}
