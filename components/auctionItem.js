import {useEffect, useState} from 'react';
import AuctionItemCarousel from './auctionItemCarousel';
import AuctionItemBody from './auctionItemBody';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

function AuctionItem({id}) {
  const [item, setItem] = useState(null);

  async function fetchEntries() {
    const item = await client.getEntry(id);
    setItem(item);
  }

  // Watch for id and get item
  useEffect(() => {
    if (id) {
      fetchEntries();
    }
  }, [id]);

  return (
    <div className="flex flex-col md:p-4">
      {!!item ? (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <AuctionItemCarousel item={item} />
          </div>
          <div className="md:ml-6">
            <AuctionItemBody item={item} />
          </div>
        </div>
      ) : (
        'loading..'
      )}
    </div>
  );
}

export default AuctionItem;
