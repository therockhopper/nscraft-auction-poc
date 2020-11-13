import Link from 'next/link';

function AuctionItem({item}) {
  let imageStyle = {}
  if (item.fields.taken) {
    imageStyle = {
      filter: 'grayscale(90%) blur(3px)',
    }
  }
  return (
    <Link href={`/?itemId=${item.sys.id}`} as={`/item/${item.sys.id}`}>
      <div className="relative flex flex-col bg-gray-100 rounded overflow-hidden grow cursor-pointer shadow-xl text-gray-900 h-full w-full max-w-sm">
        <div
          style={{
            ...imageStyle,
            height: '25vh',
            width: '100%',
            backgroundImage: 'url(' + item.fields.poster.fields.file.url + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}>
          </div>
          {item.fields.taken && <div className="absolute flex h-full w-full justify-center items-center font-bold text-red-500 text-5xl">Reserved</div>}
        <div className="p-2 flex flex-col h-48">
          <h2 className="pb-2">{item.fields.title}</h2>
          <span className="font-semibold">
            {item.fields.subtitle || 'subtitle'}
          </span>
          <span> {item.fields.company || 'company name'}</span>
          <span> ${item.fields.value || 'N/A'}</span>
        </div>
        <div className="flex p-2 justify-between">
          <div>
            <span className="text-gray-90">
              {' '}
              #{item.fields.itemNumber || 0}{' '}
            </span>
            {item.fields.taken ? (
              <span className="text-red-400">Reserved</span>
            ) : (
              <span className="text-green-600">Available</span>
            )}
            <div>
              <span className="text-gray-90">
                {item.fields.itemNumber || 0 < 40
                  ? 'Day one item'
                  : 'Day two item'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AuctionItem;
