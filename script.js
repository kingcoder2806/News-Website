const apiKey = 'a30e4c82806c4ec2bf5b21732ea3fcd7';

const blogContainer = document.getElementById('blog-container');

const searchField = document.getElementById('search-input');

const searchButton = document.getElementById('search-button');

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        const filteredArticles = data.articles.filter(article => {
            return article.title !== "Removed" && 
                   article.description !== "Removed" && 
                   article.title && article.description && article.urlToImage;
        });

        return filteredArticles;
    }catch(error){
        console.log("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click",async ()=>{
    const query = searchField.value.trim();
    if (query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }catch(error){
            console.log("Error fetching news by query", error);
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        const filteredArticles = data.articles.filter(article => {
            return article.title !== "Removed" && 
                   article.description !== "Removed" && 
                   article.title && article.description && article.urlToImage;
        });

        return filteredArticles;
    }catch(error){
        console.log("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        
        const title = document.createElement("h2"); 
        const truncatedTitle = article.title.length > 30? article.title.slice(0,30) + "....." : article.title;
        title.textContent = truncatedTitle;
        
        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click',()=>{
            window.open(article.url,"_blank");
        })
        blogContainer.appendChild(blogCard);
    });
}

(async()=>{
    try{
       const articles = await fetchRandomNews();
       displayBlogs(articles);
    }catch(error){
        console.log("Error fetching random news", error);
    }
})();
