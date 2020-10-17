function AuctionItem({ fields }) {
  return (
    <div
      className="flex flex-col justify-between h-64 w-64 bg-gray-200 rounded overflow-hidden p-4 grow cursor-pointer shadow-xl text-white font-bold"
      style={{
        backgroundImage: "url(" + fields.poster.fields.file.url + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <h4> {fields.title}</h4>
      </div>
      <div className="flex justify-end">
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
