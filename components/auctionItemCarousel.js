import {useEffect, useState} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';

function AuctionItemCarousel({item}) {
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    let pictures = [];
    item.fields.images.map(image => {
      pictures.push({
        url: image.fields.file.url,
        title: image.fields.file.url,
      });
    });
    setPictures(pictures);
  }, [item]);

  return (
      <Carousel>
        {pictures.map((p, index) => {
          return (
            <div key={p.url + index} className="h-64" style={{height: '40vh'}}>
              <img src={'https://' + p.url} />
              <p className="legend">{p.title}</p>
            </div>
          );
        })}
      </Carousel>
  );
}

export default AuctionItemCarousel;
