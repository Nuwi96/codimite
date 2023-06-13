import React, {useEffect, useState} from 'react';
import {getArticles, searchArticle} from '../services/apiService';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [fav, setFavList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const articlesData = await searchArticle(searchQuery);
            setArticles(articlesData.results);
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const articlesData = await getArticles();
            console.log(articlesData);
            setArticles(articlesData.results);
        } catch (error) {
            // Handle error
        }
    };

    const handleFavoriteClick = (val) => {
        console.log(val);
        console.log(fav.length);
        console.log(fav);
        localStorage.setItem('favList', JSON.stringify(fav));

        // if(fav.length !== 0){
            console.log('iii');
            let isFavorite = fav.find((favorite) => favorite.id === val.id);
            isFavorite = !!isFavorite;
            console.log(!isFavorite);
            if (!isFavorite) {
                val.isFavorite = true
                return fav.push(val)
            } else {
                return fav.filter((favorite) => favorite.id !== val.id);
            }
        // }else{
        //     val.isFavorite = true
        //     // fav.push(val)
        // }
        console.log(fav);
        checkArrays();
    };

    const checkArrays = () =>{
        console.log('checkArrays',fav);
        return setArticles(articles.map((article) => {
            const match = fav.find((favorite) => favorite.id === article.id);
            if (match) {
                return { ...article, isFavorite: true };
            } else {
                return article;
            }
        }))
    }
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Articles</h1>
                <form onSubmit={handleSearchSubmit}>
                    <label htmlFor="default-search"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input type="search" id="default-search"
                               className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               value={searchQuery}
                               onChange={handleSearchInputChange}/>
                        <button type="submit"
                                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                        </button>
                    </div>
                </form>
            </div>

            {
                articles.length !== 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {articles.map((article) => (
                            <div key={article.id} className="bg-white rounded shadow p-4">
                                <div className="flex flex-col h-full">
                                    <img
                                        src={article.image_url}
                                        alt={article.title}
                                        className="w-full h-40 object-cover mb-4"
                                    />
                                    <h2 className="text-xl font-semibold">{article.title}</h2>
                                    <p className="text-gray-600">{article.summary}</p>
                                    <button
                                        onClick={() => handleFavoriteClick(article)}
                                        className="mt-auto py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                    >
                                        {article.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div> :  <div className="bg-gray-100 p-4 rounded text-center text-gray-500">
                    No data to preview
                </div>
            }
        </>
    );
};

export default Home;
