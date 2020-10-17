function AuctionItem({ fields }) {
  return (
    <div
      className="h-64 w-64 bg-gray-200 rounded overflow-hidden p-4"
      style={{
        backgroundImage: "url(" + fields.poster.fields.file.url + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h4> {fields.title}</h4>
      <h4> {fields.taken ? "Not Available" : "Available"}</h4>
    </div>
  );
}

export default AuctionItem;
