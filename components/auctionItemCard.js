import Link from 'next/link';
function AuctionItem({item}) {
  return (
    <Link href={`/?itemId=${item.sys.id}`} as={`/item/${item.sys.id}`}>
      <div className="flex flex-col bg-gray-100 rounded overflow-hidden grow cursor-pointer shadow-xl text-gray-900 w-full h-full max-w-sm">
        <div
          className="h-56 w-full"
          style={{
            backgroundImage: 'url(' + item.fields.poster.fields.file.url + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}></div>
        <div className="p-2 flex flex-col">
          <h2 className="pb-2">{item.fields.title}</h2>
          <span> {item.fields.subtitle || 'subtitle'}</span>
          <span> {item.fields.company || 'company name'}</span>
          <span className="text-gray-90"> #{item.fields.itemNumber || 0} </span>
          <span> ${item.fields.value || 'N/A'}</span>
          <span className="text-gray-90">
            {item.fields.itemNumber || 0 < 40 ? 'Day one item' : 'Day two item'}
          </span>
        </div>
        <div className="flex p-2">
          {item.fields.taken ? (
            <span className="text-red-400">Not Available</span>
          ) : (
            <span className="text-green-600">Available</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default AuctionItem;
