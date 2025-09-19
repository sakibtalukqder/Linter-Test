import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = () => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    return null;
};

export default ScrollTop;