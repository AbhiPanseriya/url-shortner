import { useEffect, useState } from "react";
import { http } from "../util/axios";
import LinkPreview from "./LinkPreview";

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const response = await http.get('/gu');
        setData(response.data.map((link) => {
            return (
                <LinkPreview key={link._id} link={link} />
            );
        }))
    }, []);



    return (
        <div className="mt-4 rounded-md overflow-auto">
            {data}    
        </div>
    )
}

export default DataTable
