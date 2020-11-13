import {useEffect, useState} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';

function AuctionItemCarousel({item}) {
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    let pictures = [];
    if (!item || !item.fields.images) return
    console.log({item})
    item.fields.images.map(image => {
      pictures.push({
        url: image.fields.file.url,
      });
    });
    setPictures(pictures);
  }, [item]);

  return (
      <Carousel>
        {pictures && pictures.map((p, index) => {
          return (
            <div key={p.url + index} className="h-64" style={{height: '40vh'}}>
              <img src={'https://' + p.url} />
            </div>
          );
        })}
      </Carousel>
  );
}

export default AuctionItemCarousel;
