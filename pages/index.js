import {useEffect, useState} from 'react';
import noScroll from 'no-scroll';
import Head from 'next/head';
import AuctionItems from '../components/auctionItems';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import options from '../components/contentfullRichTextOptions'

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});


function HomePage({homeHeroContent}) {
  const [isOpen, setIsOpen] = useState(false);
  const [auctionItems, setAuctionItems] = useState([]);
  const [homeHeroBody, setHomeHeroBody] = useState([]);

  async function fetchEntries() {
    const entries = await client.getEntries({content_type: 'auctionItem', limit: 200});
    if (entries.items) return entries.items;
  }

  useEffect(() => {
    async function createBodyText() {
      const homeHeroBody = await documentToReactComponents(
        homeHeroContent.heroBodyText,
        options,
      );
      setHomeHeroBody(homeHeroBody);
    }
    createBodyText();

    async function getAuctionItems() {
      const allAuctionItems = await fetchEntries();
      setAuctionItems(allAuctionItems);
    }
    getAuctionItems();

    const interval = setInterval(() => {
      getAuctionItems();
    }, 10000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex flex-col">
      <div className="flex text-blue-600 bg-white pb-2 border-t-4 border-blue-700 py-2">
        <h1 className="flex text-2xl items-center font-semibold w-full border-b-2 border-gray-300 pl-4">
          <img className="w-auto pr-4" src="./images/craftNS.png" />
          {homeHeroContent.navbarTitle}
        </h1>
      </div>
      <div className="flex h-full flex-col md:flex-row">
        <div className="flex flex-col justify-between px-4 py-2">
          {homeHeroBody}
        </div>
      </div>
            <AuctionItems items={auctionItems} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const resp = await client.getEntry('7u2mH2GWhVYpHigKohhTxo');
  const homeHeroContent = resp.fields;
  return {
    props: {homeHeroContent},
  };
}

export default HomePage;
