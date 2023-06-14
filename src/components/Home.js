import React, {useEffect, useState} from 'react';
import {getArticles, getNextArticles, searchArticle} from '../services/apiService';
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [fav, setFavList] = useState(JSON.parse(localStorage.getItem('favList')) || []);
    const [next, setNext] = useState(null);
    const [prev, setPrev] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        handleSearchSubmit(e);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const articlesData = await searchArticle(searchQuery);
            const updatedArticles = articlesData.results.map((article) => {
                const match = fav.find((favorite) => favorite.id === article.id);
                return match ? {...article, isFavorite: true} : {...article, isFavorite: false};
            });
            setArticles(updatedArticles);
            setNext(articlesData.next);
            setPrev(articlesData.previous);
        } catch (error) {
            toast.error('Something went wrong!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    useEffect(() => {
        fetchArticles()
    }, []);

    const fetchArticles = async () => {
        try {
            const articlesData = await getArticles();
            const updatedArticles = articlesData.results.map((article) => {
                const match = fav.find((favorite) => favorite.id === article.id);
                return match ? {...article, isFavorite: true} : {...article, isFavorite: false};
            });
            setArticles(updatedArticles);
            setNext(articlesData.next);
            setPrev(articlesData.previous);
        } catch (error) {
            toast.error('Something went wrong!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const getNext = async () => {
        try {
            const articlesData = await getNextArticles(next);
            const updatedArticles = articlesData.results.map((article) => {
                const match = fav.find((favorite) => favorite.id === article.id);
                return match ? {...article, isFavorite: true} : {...article, isFavorite: false};
            });
            setArticles(updatedArticles);
            setNext(articlesData.next);
            setPrev(articlesData.previous);
        } catch (error) {
            toast.error('Something went wrong!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const getPrev = async () => {
        try {
            const articlesData = await getNextArticles(prev);
            const updatedArticles = articlesData.results.map((article) => {
                const match = fav.find((favorite) => favorite.id === article.id);
                return match ? {...article, isFavorite: true} : {...article, isFavorite: false};
            });
            setArticles(updatedArticles);
            setNext(articlesData.next);
            setPrev(articlesData.previous);
        } catch (error) {
            toast.error('Something went wrong!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const handleFavoriteClick = (val) => {
        const isFavorite = fav.find((favorite) => favorite.id === val.id);
        if (!isFavorite) {
            val.isFavorite = true;
            setFavList([...fav, val]);
            toast.success('Added to favourite!', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            setFavList(fav.filter((favorite) => favorite.id !== val.id));
            toast.info('Removed from favourite!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    useEffect(() => {
        const storedFavList = localStorage.getItem('favList');
        if (storedFavList) {
            setFavList(JSON.parse(storedFavList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favList', JSON.stringify(fav));
        const updatedArticles = articles.map((article) => {
            const match = fav.find((favorite) => favorite.id === article.id);
            return match ? {...article, isFavorite: true} : {...article, isFavorite: false};
        });
        setArticles(updatedArticles);
    }, [fav]);

    const handleViewMore = (article) => {
        navigate('/view-more', {state: {article}});
    };

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
                    <>
                        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                                            className={`mt-auto py-2 px-4 text-white rounded focus:outline-none  ${article.isFavorite ? 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' : 'text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'}`}
                                        >
                                            {article.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                                        </button>
                                        <button
                                            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                            onClick={() => handleViewMore(article)}>
                                            view more
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mb-4">
                            <nav>
                                <ul className="flex space-x-2">
                                    {prev !== null && (
                                        <li>
                                            <button
                                                onClick={() => getPrev()}
                                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                            >
                                                Previous
                                            </button>
                                        </li>
                                    )}

                                    {/* Render next button if not on the last page */}
                                    {next !== null && (
                                        <li>
                                            <button
                                                onClick={() => getNext()}
                                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                            >
                                                Next
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </>

                    : <div className="bg-gray-100 p-4 rounded text-center text-gray-500">
                        No data to preview
                    </div>
            }

        </>
    );
};

export default Home;
