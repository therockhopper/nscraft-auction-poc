import {useEffect, useState} from 'react';
import {Carousel, Image } from 'antd';

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
    <Carousel className="w-full" autoplay>
      {pictures && pictures.map((p, index) => {
        return (
          <Image key={p.url + index} src={'https://' + p.url} />
        );
      })}
    </Carousel>
  );
}

export default AuctionItemCarousel;
