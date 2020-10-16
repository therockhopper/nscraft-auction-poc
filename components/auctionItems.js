function AuctionItems({ items }) {
  return (
    <div>
      <h1>Auction Items</h1>
      <ul>
        {items.map((item) => (
          <li>{item.fields.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default AuctionItems;
