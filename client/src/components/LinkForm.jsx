import { useEffect, useState } from "react"
import { nanoid } from 'nanoid';
import { http } from '../util/axios';
import { useDebounce } from 'use-debounce';

const LinkForm = ({submitButtonText, onSubmit, values = {}}) => {
    const [title, setTitle] = useState(values.title || '');

    const [url, setUrl] = useState(values.url || '');

    const [short, setShort] = useState(values.short || nanoid(6));
    const [debouncedGeneratedUrl] = useDebounce(short, 1000);
    const [isGeneratedUrlValid, setIsGeneratedUrlValid] = useState(false);

    const [description, setDescription] = useState(values.description || '');
    
    const serverUrl = `${process.env.REACT_APP_SERVER.split('//')[1]}/`;

    useEffect(async () => {
        if(short == null) return;
        if(values?.short === short) {
            setIsGeneratedUrlValid(true);
            return;
        }
        
        const response = await http.get(`/lu?q=${debouncedGeneratedUrl}`);
        setIsGeneratedUrlValid(response.data);

    }, [debouncedGeneratedUrl]);

    const onSubmitClicked = (e) => {
        e.preventDefault();
        if(!isGeneratedUrlValid || !url) return;
        onSubmit(title, url, short, description);
    }

    return (
        <div className="w-4/5 lg:w-2/3">
            <form className="flex flex-col">
                <label className="label">
                    <span className="label-text">Link To Shorten<span className="text-red-600">*</span>:</span>
                    <input 
                        className="form-control" 
                        type="text"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                </label>
                <label className="label">
                    <span className="label-text">Shortened Link<span className="text-red-600">*</span>:</span>
                    <div className={`form-control flex items-center p-0 rounded-md overflow-auto border ${isGeneratedUrlValid ? ' border-green-500' : 'border-red-500'}`}>
                        <div className="bg-gray-200 p-2">
                            {serverUrl}
                        </div>
                        <input 
                            className="outline-none bg-gray-100 p-2" 
                            placeholder="generatedLink" 
                            type="text"
                            required
                            value={short}
                            onChange={(e) => setShort(e.target.value)}
                        />
                    </div>
                </label>
                <label className="label">
                    <span className="label-text">Title:</span>
                    <input 
                        className="form-control" 
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />                   
                </label>
                <label className="label">
                    <span className="label-text">Description:</span>
                    <textarea 
                        className="resize-none form-control"
                        placeholder="enter the description"
                        rows="5"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        
                    ></textarea>
                </label>
                <div className="flex">
                    <div className="w-32 ml-2 hidden md:block">

                    </div>
                    <button 
                        className="btn flex-grow"
                        type="submit"
                        onClick={(e) => onSubmitClicked(e)}
                    >
                        {submitButtonText}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LinkForm
