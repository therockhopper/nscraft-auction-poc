import {CloseOutlined} from '@ant-design/icons';
import {Space} from 'antd';
import {useEffect, useState} from 'react';
import AuctionItemBody from './auctionItemBody';
import AuctionItemCarousel from './auctionItemCarousel';
import Router from 'next/router'


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
          <div className="w-full md:w-1/2">
            <AuctionItemCarousel item={item} />
          </div>
          <div className="md:ml-6">
            <AuctionItemBody item={item} />
          </div>
          <Space onClick={() => Router.back()} className="absolute top-o right-6 cursor-pointer"><CloseOutlined style={{fontSize: '18px', color: '#ff0000'}}/></Space>
        </div>
      ) : (
        'loading..'
      )}
    </div>
  );
}

export default AuctionItem;
