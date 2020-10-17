import { useRouter } from "next/router";

const ItemPage = () => {
  const router = useRouter();
  const { itemId } = router.query;

  return (
    <div>
      {itemId} {router.pathname}
    </div>
  );
};

export default ItemPage;
