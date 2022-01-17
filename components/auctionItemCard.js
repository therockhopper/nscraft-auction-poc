import Link from 'next/link';


function AuctionItem({item}) {
  let imageStyle = {};
  if (item.fields.taken) {
    imageStyle = {
      filter: 'grayscale(90%) blur(3px)',
    };
  }
  return (
    <Link href={`/?itemId=${item.sys.id}`} as={`/item/${item.sys.id}`}>
      <div className="auctionItem bg-gray-100 grow cursor-pointer overflow-hidden border-b-4 border-blue-500 w-full h-full">
      <div className="relative w-full pb-9/12">
        <img
          style={imageStyle}
          src={item.fields.poster.fields.file.url}
          alt="Item Poster"
          className="absolute top-0 w-full h-full object-cover"
        />
      </div>
        <div className="flex flex-col px-4 pt-6">
          <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">
            {item.fields.company}
          </p>
          <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
            {item.fields.title}
          </h3>
        </div>
        <div className="flex justify-between p-4">
          <div className="flex flex-col ">
            {item.fields.taken ? (
              <span className="text-red-400">Acquired</span>
            ) : (
              <span className="text-green-600">Available</span>
            )}

            <p className="leading-none">
              ${item.fields.value}{' '}
              <span className="text-sm italic text-gray-700">value</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-700">
              {item.fields.subtitle}
            </span>
            <span className="text-gray-90 text-sm flex justify-end">
              {item.fields.itemNumber > 80 && 'Silent Auction '}
              {item.fields.itemNumber && '#'}
              {item.fields.itemNumber && item.fields.itemNumber}
            </span>
            <span className="text-gray-90 text-sm flex justify-end">
              {item.fields.year ? item.fields.year : '2020'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default AuctionItem;
