import AuctionItem from "./auctionItem";
function AuctionItems({ items }) {
  return (
    <div>
      <ul className="flex flex-wrap">
        {items
          ? items.map((item, index) => (
              <li key={item.fields.title + index} className="m-4">
                <AuctionItem fields={item.fields} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default AuctionItems;
