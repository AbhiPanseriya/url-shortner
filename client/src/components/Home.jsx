import { useState } from 'react';
import Header from './Header';
import CreateUrl from './CreateUrl';
import DataTable from './DataTable';

const Home = () => {
    const [isCreateUrlClicked, setIsCreateUrlClicked] = useState(false);

    return (
        <div className="container m-auto">
            <Header isCreateUrlClicked={isCreateUrlClicked} setIsCreateUrlClicked={setIsCreateUrlClicked} />
            <CreateUrl isCreateUrlClicked={isCreateUrlClicked} setIsCreateUrlClicked={setIsCreateUrlClicked} />
            <DataTable />
        </div>
    );
}

export default Home
