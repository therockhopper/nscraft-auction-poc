import Link from "next/link";
function AuctionItem({ item }) {
  return (
    <Link href={`/?itemId=${item.sys.id}`} as={`/item/${item.sys.id}`}>
      <div className="flex flex-col bg-gray-100 rounded overflow-hidden grow cursor-pointer shadow-xl text-gray-900">
        <div
          className="h-56 w-64"
          style={{
            backgroundImage: "url(" + item.fields.poster.fields.file.url + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="p-2">
          <h2 className="pb-2"> {item.fields.title}</h2>
          <span> {item.fields.title}</span>
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
