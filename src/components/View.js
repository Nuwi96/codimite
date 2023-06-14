import React from 'react';
import { useLocation } from 'react-router-dom';
const View = () => {
    const location = useLocation();
    const { article } = location.state;

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            </div>
            <iframe
                src={article.url}
                title="Web Page"
                width="100%"
                height="800px"
                style={{ overflowX: 'hidden' }}
            />
        </>
    );
};

export default View;
