function AuctionItem({ fields }) {
  return (
    <div className="flex flex-col bg-gray-100 rounded overflow-hidden grow cursor-pointer shadow-xl text-gray-900">
      <div
        className="h-56 w-64"
        style={{
          backgroundImage: "url(" + fields.poster.fields.file.url + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {" "}
      </div>
      <div className="p-2">
        <h2 className="pb-2"> {fields.title}</h2>
        <span> {fields.title}</span>
      </div>
      <div className="flex p-2">
        {fields.taken ? (
          <span className="text-red-400">Not Available</span>
        ) : (
          <span className="text-green-600">Available</span>
        )}
      </div>
    </div>
  );
}

export default AuctionItem;
