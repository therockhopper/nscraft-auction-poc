import { useRouter } from "next/router";
import AuctionItem from "../../components/auctionItem";

const ItemPage = () => {
  const router = useRouter();
  const { itemId, itemid } = router.query;

  return (
    <div>
      <AuctionItem id={itemId || itemid}></AuctionItem>
    </div>
  );
};

export default ItemPage;
