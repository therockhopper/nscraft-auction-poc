function AuctionItem({ fields }) {
  return (
    <div>
      <h4>{fields ? Object.keys(fields) : "loading"}</h4>
    </div>
  );
}

export default AuctionItem;
