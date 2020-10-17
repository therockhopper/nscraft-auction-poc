import AuctionItem from "./auctionItem";
function AuctionItems({ items }) {
  return (
    <div>
      <h1>Auction Items {items.length}</h1>
      <ul>
        {items
          ? items.map((item) => (
              <li key={item.fields.title}>
                <AuctionItem fields={item.fields} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default AuctionItems;
