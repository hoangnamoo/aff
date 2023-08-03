import React, { useState } from 'react';
import Header from '../../components/Header';
import LinkInput from './LinkInput';
import ProductDetail from './ProductDetail';

function Home() {
    const [link, setLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    console.log(link);
    return (
        <div>
            <Header />
            <div className="mt-16 p-2 flex flex-col gap-4">
                <LinkInput link={link} setLink={setLink} />
                <ProductDetail />
            </div>
        </div>
    );
}

export default Home;
