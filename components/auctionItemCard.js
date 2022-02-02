import Link from 'next/link';

import { Card } from 'antd';

function AuctionItem({item}) {
  let imageStyle = {};
  if (item.fields.taken) {
    imageStyle = {
      filter: 'grayscale(90%) blur(3px)',
    };
  }
  return (
    <Link href={`/?itemId=${item.sys.id}`} as={`/item/${item.sys.id}`}>
      <Card
        hoverable
        style={{minWidth: '320px', width: '25vw', maxWidth: '500px' }}
        cover={<img alt="example" src={item.fields.poster.fields.file.url} style={{objectFit: 'cover', height: '25vw', maxHeight: '350px' }} />} >
        <div className="flex flex-col">
          <p className="text-blue-500 font-semibold text-xs">
            {item.fields.company}
          </p>
          <h3 className="font-semibold text-lg leading-tight sm:leading-normal">
            {item.fields.title}
          </h3>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-end">
            {item.fields.taken ? (
              <span className="text-red-400">Acquired</span>
            ) : (
              <span className="text-green-600">Available</span>
            )}

            <p className="leading-none mb-0">
              ${item.fields.value}{' '}
              <span className="text-sm italic text-gray-700">value</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-90 text-sm flex justify-end">
              {item.fields.silentAuction && 'Silent Auction '}
              {item.fields.itemNumber && '#'}
              {item.fields.itemNumber && item.fields.itemNumber}
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {item.fields.subtitle}
            </span>

            <span className="text-gray-90 text-sm flex justify-end">
              {item.fields.year ? item.fields.year : '2020'}
            </span>
          </div>
        </div>
      </Card>

    </Link>
  );
}
export default AuctionItem;
