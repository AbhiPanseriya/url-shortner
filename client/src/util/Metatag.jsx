import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
const urlMetadata = require('url-metadata');

const mainTags = (
    <Helmet>
        {/* Primary Meta Tags */}
        <title>Url Shortner</title>
        <meta name="title" content="Url Shortner" />
        <meta name="description" content="create short links that are easy to remember and share them with QR code " />

        {/* Open Graph / Facebook */}
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://lish.vercel.app/" />
        <meta name="og:title" content="Url Shortner" />
        <meta name="og:description" content="create short links that are easy to remember and share them with QR code " />
        <meta name="og:image" content="" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://lish.vercel.app/" />
        <meta name="twitter:title" content="Url Shortner" />
        <meta name="twitter:description"
            content="create short links that are easy to remember and share them with QR code " />
        <meta property="twitter:image" content="" />
    </Helmet>
);

const Metatag = () => {
    const { id } = useParams();
    console.log(id);
    const [metadata, setMetadata] = useState({});
    urlMetadata(`${process.env.REACT_APP_SERVER}/${id}`).then(data => {
        setMetadata(data);
    })
    return (
        <div>
            { (!id || id === 'auth') ? mainTags : (
                <Helmet>
                    <title>
                        {metadata.title}
                    </title>
                    <meta name="image" content={metadata?.image} />
                    <meta name="canonical" content={metadata?.canonical} />
                    <meta name="author" content={metadata?.author} />
                    <meta name="description" content={metadata?.description} />
                    <meta name="keyword" content={metadata?.keywords} />
                    <meta name="source" content={metadata?.source} />
                    <meta name="og:title" content={metadata?.['og:title']} />
                    <meta name="og:image" content={metadata?.['og:image']} />
                    <meta name="og:type" content={metadata?.['og:type']} />
                    <meta name="og:description" content={metadata?.['og:description']} />
                </Helmet>
            )}
        </div>
    )
}

export default Metatag;
