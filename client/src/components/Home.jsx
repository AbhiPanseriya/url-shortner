import { useState } from 'react';
import Header from './Header';
import CreateUrl from './CreateUrl';
import DataTable from './DataTable';

const Home = () => {

    return (
        <div className="container m-auto">
            <Header />
            <CreateUrl />
            <DataTable />
        </div>
    );
}

export default Home
