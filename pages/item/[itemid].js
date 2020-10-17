import { useRouter } from "next/router";
import Item from "../../components/item";

const PostPage = () => {
  const router = useRouter();
  const { itemId } = router.query;

  return (
    <div>
      {itemId} {router.pathname}
    </div>
  );
};

export default PostPage;
