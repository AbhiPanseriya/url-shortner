import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import Metatag from '../util/Metatag';

const RedirectUrl = () => {
    const { id } = useParams();
    const [href, setHref] = useState(`${process.env.REACT_APP_SERVER}/${id}`);
    const redirectLink = useCallback((link) => {
        if (link == null) return;
        link.click();
    }, [])
    return (
        <>
            {
                id && (
                    <>
                        <Metatag />
                        <a ref={redirectLink} href={href}></a>
                    </>
                )
            }
        </>
    )
}

export default RedirectUrl;