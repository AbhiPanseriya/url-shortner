import { useState } from "react"
import { http } from '../util/axios';
import { useHistory } from 'react-router-dom';
import LinkForm from "./LinkForm";

const CreateUrl = () => {
    const [isCreateUrlClicked, setIsCreateUrlClicked] = useState(false);
    const history = useHistory();

    const onCreateUrlClicked = () => {
        setIsCreateUrlClicked(true);
    }

    const onCreateLink = async (title, url, short, description) => {
        const response = await http.post(`/su`, {
            title, url, short, description
        });
        setIsCreateUrlClicked(false)
        history.go(0);
    }

    return (
        <div className="flex flex-col items-center">
            {!isCreateUrlClicked ? (
                <button 
                    className="btn"
                    onClick={(e) => onCreateUrlClicked(e)}
                >
                    Create New Short URL
                </button>
            ) : (
                <LinkForm
                    submitButtonText="Create" 
                    onSubmit={onCreateLink}
                />               
            )}
        </div>
    )
}

export default CreateUrl
