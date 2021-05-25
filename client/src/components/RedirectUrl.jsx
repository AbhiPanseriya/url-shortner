import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';

const RedirectUrl = () => {
    const { id } = useParams();
    const [href, setHref] = useState(`${process.env.REACT_APP_SERVER}/${id}`);
    const redirectLink = useCallback((link) => {
        if (link == null) return;
        link.click();
    }, [])

    return <a ref={redirectLink} href={href}></a>;
}

export default RedirectUrl;