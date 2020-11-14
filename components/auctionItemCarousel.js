import {useEffect, useState} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';

function AuctionItemCarousel({item}) {
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    if (!item) return
    let pictures = [];
    const { images = [], poster } = item.fields
    images.map(image => {
      pictures.push({
        url: image.fields.file.url,
      });
    });

    if (!pictures) {
      // add the poster as a fallback
      pictures.push({url: poster.fields.file.url})
    }

    setPictures(pictures);
  }, [item]);

  return (
    <Carousel className="w-64">
    {pictures && pictures.map((p, index) => {
      return (
        <div key={p.url + index}>
        <img src={'https://' + p.url} />
        </div>
      );
    })}
    </Carousel>
  );
}

export default AuctionItemCarousel;
