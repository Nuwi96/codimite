const API_BASE_URL = 'https://api.spaceflightnewsapi.net/v4';

async function fetchApi(endpoint, options) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
        if (!response.ok) {
            throw new Error('API request failed');
        }
        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

export async function getArticles() {
    try {
        const articles = await fetchApi('articles');
        return articles;
    } catch (error) {
        throw error;
    }
}export async function getNextArticles(url) {
    try {
        const response = await fetch(`${url}`);
        if (!response.ok) {
            throw new Error('API request failed');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
export async function searchArticle(data) {
    console.log(data);
    try {
        const articles = await fetchApi(`articles?search=${data}`);
        return articles;
    } catch (error) {
        throw error;
    }
}



