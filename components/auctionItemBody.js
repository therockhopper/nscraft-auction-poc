import {useEffect, useState} from 'react';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';

export default function AuctionItemBody({item}) {
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
    <div>
    <h1 className="font-bold text-xl">{item.fields.title}</h1>
    <div
    className="text-gray-900"
    dangerouslySetInnerHTML={description} />
    </div>

  )

}
