import { http } from '../util/axios';
import { useHistory } from 'react-router-dom';
import LinkForm from "./LinkForm";

const CreateUrl = ({ isCreateUrlClicked, setIsCreateUrlClicked }) => {
    const history = useHistory();

    const onCreateLink = async (title, url, short, description) => {
        const response = await http.post(`/su`, {
            title, url, short, description
        });
        setIsCreateUrlClicked(false)
        history.go(0);
    }

    return (
        <div className="flex flex-col items-center">
            {isCreateUrlClicked && (
                <LinkForm
                    submitButtonText="Create" 
                    onSubmit={onCreateLink}
                    onCancel={setIsCreateUrlClicked}
                />               
            )}
        </div>
    )
}

export default CreateUrl
