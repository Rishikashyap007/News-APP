const apiKey = "776ba6eac0414b2fa62d56a4cfa9a0ae"

const container = document.querySelector('.container');
const nb = document.querySelector('.nav-bottom')

// Call randomNews when the page loads
window.addEventListener('load', randomNews);

async function randomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=india&pageSize=20&apikey=${apiKey}`
        const response = await fetch(apiUrl);

        if(!response.ok){
            throw new Error("Could not fetch the data");
        }
        const data = await response.json();

        console.log(data);
        displaycard(data);
        
    }
    catch(error){
        console.log(error);
    }

    
}
const searchbtn = document.querySelector('.nav-btn')
const input= document.querySelector('.nav-search');

searchbtn.addEventListener('click', searchnews);

async function searchnews(){
    nb.classList.add("hide");
    container.innerHTML = '';
    const query = input.value.trim()
    console.log('clicked');
    console.log(query);
    if(input !== ''){
        try{
            const ogquery = await querysearch(query) ;  
            displaycard(ogquery)
        }
        catch(error){
            console.log(error);
        }
    }
}

async function querysearch(query){
    try{
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apikey=${apiKey}`
        const response = await fetch(apiurl);
        const data = await response.json();
        return data;  
    }
    catch(error){
        console.log(error);
        return [];
    }
}
function displaycard(data){
    
    for (let i=0; i<12;i++ ){
        const card = document.createElement("div")
        card.classList.add("card");

    const image =document.createElement(`img`);
    let imagesrc = data.articles[i].urlToImage;
    if(imagesrc != null){
        image.setAttribute('src',imagesrc)
        image.classList.add('cardimage')
    }
    else{
        // image.style.display ='none';
        imagesrc = "https://placehold.co/600x400";
        image.setAttribute('src',imagesrc)
        image.classList.add('cardimage')
    }

    const carddesc = document.createElement('div')
    carddesc.classList.add('card-desc')
   

    const title = document.createElement('h2')
    title.classList.add('cardtitle')
    
    let truncatedtitle ;

    if(data.articles[i].title.length >40 ){
        truncatedtitle = data.articles[i].title.slice(0,40)
        title.textContent = truncatedtitle+"....";
    }
    else{
        title.textContent = data.articles[i].title;
    }

    const cardText = document.createElement('p')
    cardText.classList.add('cardtext')
    cardText.innerHTML = data.articles[i].description
    
    
    
    
    card.appendChild(image);
    card.appendChild(carddesc);
    carddesc.appendChild(title);
    carddesc.appendChild(cardText);

    card.addEventListener('click',()=>{
        console.log('clicked');
        window.open(data.articles[i].url,"_blank")
    })
    container.appendChild(card)
    console.log(card);
    }
}
