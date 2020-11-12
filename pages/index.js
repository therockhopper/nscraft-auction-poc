import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import Modal from 'react-modal';
import AuctionItems from '../components/auctionItems';
import AuctionItem from '../components/auctionItem';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

function HomePage() {
  const [auctionItems, setAuctionItems] = useState([]);

  async function fetchEntries() {
    const entries = await client.getEntries({content_type: 'auctionItem'});
    if (entries.items) return entries.items;
    console.log(`Error getting Entries for ${contentType.name}.`);
  }

  useEffect(() => {
    async function getAuctionItems() {
      const allAuctionItems = await fetchEntries();
      do {
        allAuctionItems.push(...allAuctionItems);
      } while (allAuctionItems.length < 10); // ensure we allways have 10 items to test with
      setAuctionItems([...allAuctionItems]);
    }
    getAuctionItems();

    const interval = setInterval(() => {
      getAuctionItems();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  Modal.setAppElement('#__next');

  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="flex text-blue-800 pb-2 border-t-4 border-blue-500 px-4">
        <h1 className="text-3xl font-semibold">NS Craft Auction</h1>
      </div>
      <div className="flex bg-blue-600 h-full">
    <div className="text-white px-4 py-2">
    <p className="px-4 py-2">
    Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s,
    </p>
    </div>
    <img src="/svgs/home.svg" alt="home image" />
    </div>
    <Modal
    isOpen={!!router.query.itemId}
    onRequestClose={() => router.push('/')}
    contentLabel="Item modal">
    <AuctionItem id={router.query.itemId}></AuctionItem>
    </Modal>
    <AuctionItems items={auctionItems} />
    </div>
  );
}

export default HomePage;
