import Link from 'next/link';

function AuctionItem2({item}) {
  let imageStyle = {};
  if (item.fields.taken) {
    imageStyle = {
      filter: 'grayscale(90%) blur(3px)',
    };
  }
  return (
    <Link href={`/?itemId=${item.sys.id}`} as={`/item/${item.sys.id}`}>
      <div className="bg-gray-100 grow cursor-pointer overflow-hidden border-b-4 border-blue-500 w-full h-full">
        <img
          style={imageStyle}
          src={item.fields.poster.fields.file.url}
          alt="Item Poster"
          className="w-full object-cover h-32 sm:h-48 md:h-64"
        />
        <div className="flex flex-col justify-between p-4 md:p-6">
          <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">
            {item.fields.company}
          </p>
          <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
            {item.fields.title}
          </h3>
          <div className="text-sm flex flex-col justify-between h-full">
            {item.fields.taken ? (
              <span className="text-red-400">Reserved</span>
            ) : (
              <span className="text-green-600">Available</span>
            )}

            <div className="flex justify-between">
              <p className="leading-none">${item.fields.value}</p>
              <span className="text-gray-90">
                {item.fields.silentAuction && 'Silent Auction'}
                {(!item.fields.silentAuction && item.fields.itemNumber) || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default AuctionItem2;
