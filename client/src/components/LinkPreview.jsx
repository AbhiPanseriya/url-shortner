import { useState } from 'react';
import { http } from "../util/axios";
import LinkForm from './LinkForm';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const QRCode = require('qrcode.react');

const LinkPreview = ({link}) => {
    const [ isLinkCopied, setIsLinkCopied ] = useState(false);
    const [ isContentEditable, setIsContentEditable ] = useState(false);
    const [ linkData, setLinkData] = useState(link);
    

    const copyUrlToCliboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            setIsLinkCopied(true);
        });
    }
    
    const onQRCodeDownload = () => {
        const canvas = document.getElementById(`qrCode_${link._id}`);
        // create a tag
        const a = document.createElement('a');
        a.download = 'download.png';
        a.href = canvas.toDataURL('image/png');
        a.click();
    };

    const onUpdateLink = async (title, url, short, description) => {
        const request = {...link};
        request.title = title;
        request.url = url;
        request.short = short;
        request.description = description;
        const response = await http.post(`/uu`, request);
        link = response.data;
        setLinkData(link);
        setIsContentEditable(false);
        console.log(response);
    }

    return (
        <div className='bg-gray-50 p-6 border-b flex justify-center'>
            { !isContentEditable
                ? (
                    <div className="flex flex-grow flex-col sm:flex-row">
                        <div className="flex-grow">                            
                            <div className="font-light text-2xl capitalize break-all" >{linkData.title}</div>
                            <div className="break-all text-gray-500"><a href={linkData.url} target="_blank">{linkData.url}</a></div>
                            <div className="break-all text-gray-500">{linkData.description}</div>
                            <div className="text-sm mt-4 flex sm:items-center flex-col sm:flex-row">
                                <a 
                                    href={`${process.env.REACT_APP_CLIENT}/${linkData.short}`}
                                    className="text-blue-500 cursor-pointer pr-4 sm:border-r"
                                    target="_blank"
                                >
                                    {`${process.env.REACT_APP_CLIENT.split('//')[1]}/${linkData.short}`}
                                </a>
                                <div className="flex">                                    
                                    <img 
                                        className="h-8 sm:ml-2 p-2 hover:bg-blue-100 rounded-md cursor-pointer"
                                        src="assets/pen.svg"
                                        onClick={(e) => setIsContentEditable(true)}
                                    />
                                    <div className="hover:bg-blue-100 cursor-pointer rounded-md h-8 ml-2 flex items-center">
                                        { isLinkCopied
                                            ? <img 
                                                className="h-8 p-2 cursor-pointer" 
                                                src="assets/tick.svg"  
                                            />  
                                            : (
                                                <img 
                                                    className="h-8 p-2 cursor-pointer" 
                                                    src="assets/copy.svg" 
                                                    onClick={(e) => copyUrlToCliboard(`${process.env.REACT_APP_CLIENT}/${linkData.short}`)}
                                                /> 
                                            )                                
                                        }
                                    </div>
                                    <Popup 
                                        trigger={
                                            <img 
                                                className="h-8 ml-2 p-2 hover:bg-blue-100 rounded-md cursor-pointer"
                                                src="assets/qr-code.svg"
                                            />
                                        }
                                        position="right center"
                                    >
                                        <div className="my-auto relative group">
                                            <QRCode 
                                                value={`${process.env.REACT_APP_CLIENT}/${linkData.short}`}
                                                id={`qrCode_${linkData._id}`} includeMargin={true} 
                                                size={192} 
                                                bgColor="#f9fafb"
                                                className="group-hover:opacity-30" 
                                            />
                                            <img 
                                                src="assets/down-arrow.svg" 
                                                className="h-48 p-20 absolute top-0 left-0 cursor-pointer opacity-0 group-hover:opacity-100" 
                                                onClick={onQRCodeDownload} 
                                            />
                                        </div>
                                    </Popup>                                            
                                </div>                                    
                            </div>
                            
                        </div>
                        <div className="flex flex-col justify-between  min-w-max">
                            <div className="sm:self-end">
                                <div className="flex items-center">
                                    <span className="text-xl font-light mr-2"> {linkData.clicks} </span>
                                    <img src="assets/arrow-chart.svg" className="h-4 opacity-70" />
                                </div>
                                <span className="text-sm text-gray-500 uppercase"> Total Clicks </span>
                            </div>
                            <div className="text-gray-500 capitalize text-sm sm:text-right">created at {new Date(linkData.createdAt).toLocaleString()}</div>
                        </div>
                    </div>
                )
                : (
                    <LinkForm submitButtonText="Update" onSubmit={onUpdateLink} onCancel={setIsContentEditable} values={link} />
                )
            }
        </div>
    );
}

export default LinkPreview
