import Link from 'next/link';
import {useEffect, useState} from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom } from 'pure-react-carousel';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import 'pure-react-carousel/dist/react-carousel.es.css';

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

  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    if (!item) return;
    let pictures = [];
    item.fields.images.map(image => {
      pictures.push(image.fields);
    });
    console.log(pictures)
    setPictures(pictures);
  }, [item]);

  const [description, setDescription] = useState({__html: ''});
  useEffect(() => {
    async function getData() {
      try {
        const rendredHTML = await documentToHtmlString(item.fields.description);
        setDescription({__html: rendredHTML});
      } catch (e) {}
    }
    if (item) {
    getData();
    }
  }, [item]);

  return (
    <div className="flex flex-col p-4">
      {!!item ? (
        <div>
        <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={3}
        >
        <Slider>
        {pictures.length && pictures.map((p, index) => {
          return( <Slide idnex={index} key={index}>
            <ImageWithZoom src={'http:' + p.url} />
            </Slide>
          )
        })}
        </Slider>
        <ButtonBack className="px-6 py-2 cursor-pointer border-solid border-2 border-blue-80">Back</ButtonBack>
        <ButtonNext className="px-6 py-2 cursor-pointer border-solid border-2 border-blue-80">Next</ButtonNext>
        </CarouselProvider>

        <div
        className="h-64 w-64 mb-6"
        style={{
          backgroundImage:
          'url(' + item.fields.poster.fields.file.url + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}></div>


        <h1 className="font-bold text-xl">{item.fields.title}</h1>
        <div
        className="text-gray-900"
        dangerouslySetInnerHTML={description} />
        <div>
        {pictures.map((image, idx) => {
          <div>
            <div
          className="h-64 w-64 mb-6"
          style={{
            backgroundImage: 'url(' + image.file.url + ')',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
          }}></div>
            <h4>
            title: {image.title} {image.file.url}
            </h4>
            </div>;
        })}
        </div>
        </div>
      ) : (
        'loading..'
      )}
    </div>
  );
}

export default AuctionItem;
