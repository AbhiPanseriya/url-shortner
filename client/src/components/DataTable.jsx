import { useEffect, useState, useCallback } from "react";
import { http } from "../util/axios";
import LinkPreview from "./LinkPreview";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDebounce } from 'use-debounce';
import Skeleton from 'react-loading-skeleton';

const DataTable = () => {
    const pageSize = 5;

    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 1000);

    const loader = (
        <div className='flex justify-center'>
            <div className='flex flex-grow flex-col sm:flex-row'>
                <div className='flex-grow pr-4'>
                    <div className='text-2xl'><Skeleton /></div>
                    <div> <Skeleton /></div>
                    <div> <Skeleton /></div>
                    <div className='text-sm h-8 flex items-center flex-col sm:flex-row'>
                        <div className='w-28'> <Skeleton /></div>
                        <div className='w-8 ml-2'> <Skeleton /> </div>
                        <div className='w-8 ml-2'> <Skeleton /> </div>
                        <div className='w-8 ml-2'> <Skeleton /> </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between w-28'>
                    <div className="sm:self-end">
                        <div className="flex items-center w-20">
                            <span className="text-xl font-light mr-2 w-10"> <Skeleton /> </span>
                            <Skeleton className="h-4" />
                        </div>
                        <span className="text-sm text-gray-500 uppercase"> <Skeleton /> </span>
                    </div>
                    <div className="text-gray-500 capitalize text-sm sm:text-right"> <Skeleton /> </div>
                </div>
            </div>
        </div>
    )

    const fetchData = async (p) => {
        try {
            const response = await http.get(`/gu?q=${query}&page=${p ?? page}`);
            response.data.length < pageSize ? setHasMore(false) : setHasMore(true);
            (p ?? page) == 0 ? setData([...response.data]) : setData([...data, ...response.data]);
            setPage((p ?? page) + 1)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setPage(0)
        fetchData(0);
    }, [debouncedQuery])

    return (
        <div className="mt-4 rounded-md flex flex-col overflow-auto">
            <div className='flex justify-center mx-3'>
                <input
                    type='text'
                    className='form-control w-full max-w-2xl self-center mr-4 flex-grow'
                    placeholder='Enter something to search'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                {/* TODO: Implement filter by tag code */}
                {/* <div className='btn py-2 flex items-center'><img src="assets/filter.svg" className='h-4' /></div> */}
            </div>
            <InfiniteScroll
                dataLength={data.length}
                next={fetchData}
                hasMore={hasMore}
                loader={loader}
                endMessage={<div className='py-10 text-center text-xl text-gray-500'>Seems like you've came to an end</div>}
            >
                {data.map(link => <LinkPreview key={link._id} link={link} />)}
            </InfiniteScroll>
        </div>
    )
}

export default DataTable
