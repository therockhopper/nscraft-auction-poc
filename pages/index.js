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
      setAuctionItems([...allAuctionItems]);
    }
    getAuctionItems();

    const interval = setInterval(() => {
      getAuctionItems();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  Modal.setAppElement('#__next');

  const router = useRouter();

  return (
    <div className="flex flex-col">
    <div className="flex text-gray-100 bg-blue-600 pb-2 border-b-2 border-blue-700 px-4 py-2">
    <h1 className="text-2xl font-semibold">NS Craft Auction</h1>
    </div>
    <div className="flex bg-blue-600 h-full">
    <div className="flex flex-col justify-between text-white px-4 py-2 w-1/2">
    <h3 className="font-semibold">Sort and view all the items</h3>
    <div className="flex">
    <span className="font-gray-10 mr-6">
    80 Items
    </span>
    </div>
    </div>
    <img className="w-1/2" src="/svgs/home.svg" alt="home image" />
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
