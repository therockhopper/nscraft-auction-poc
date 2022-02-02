import {Card, Modal, Button} from 'antd';
import {useState} from "react";

import AuctionItemBody from './auctionItemBody';
import AuctionItemCarousel from './auctionItemCarousel';


function AuctionItem({item}) {
  let imageStyle = {};
  if (item.fields.taken) {
    imageStyle = {
      filter: 'grayscale(90%) blur(3px)',
    };
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        onClick={showModal}
        hoverable
        style={{minWidth: '320px', width: '25vw', maxWidth: '500px' }}
        cover={<img alt="example" src={item.fields.poster.fields.file.url} style={{objectFit: 'cover', minHeight: '200px', height: '25vw', maxHeight: '350px' }} />} >
        <div className="flex flex-col">
          <p className="text-blue-500 font-semibold text-xs">
            {item.fields.company}
          </p>
          <h3 className="font-semibold text-lg leading-tight sm:leading-normal">
            {item.fields.title}
          </h3>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-end">
            {item.fields.taken ? (
              <span className="text-red-400">Acquired</span>
            ) : (
              <span className="text-green-600">Available</span>
            )}

            <p className="leading-none mb-0">
              ${item.fields.value}{' '}
              <span className="text-sm italic text-gray-700">value</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-90 text-sm flex justify-end">
              {item.fields.silentAuction && 'Silent Auction '}
              {item.fields.itemNumber && '#'}
              {item.fields.itemNumber && item.fields.itemNumber}
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {item.fields.subtitle}
            </span>

            <span className="text-gray-90 text-sm flex justify-end">
              {item.fields.year ? item.fields.year : '2020'}
            </span>
          </div>
        </div>
      </Card>
      <Modal visible={isModalVisible} centered onCancel={handleClose} footer={[
          <Button key="back" onClick={handleClose}>
            Return
          </Button>]} >

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <AuctionItemCarousel item={item} />
          </div>
          <div className="md:ml-6">
            <AuctionItemBody item={item} />
          </div>
        </div>


      </Modal>
    </>
  );
}
export default AuctionItem;
