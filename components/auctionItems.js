import AuctionItem from "./auctionItem";
function AuctionItems({ items }) {
  return (
    <div>
      <ul className="flex flex-wrap">
        {items
          ? items.map((item) => (
              <li key={item.fields.title} className="m-4">
                <AuctionItem fields={item.fields} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default AuctionItems;
