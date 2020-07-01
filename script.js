// HTML elements 
const imageContainer = document.getElementById('image-container'); 
const loader = document.getElementById('loader'); 

// Unsplash API 
const accessKey = 'LYVKBOGxzLRyn6OYr8W1wK1bZKd2VXEvqIxbMWh3n3g'
const count = 10; 
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`; 

let photosArray = []; 

// Fetch request 
async function getPhotos() {
    try {
        const response = await fetch(apiURL); 
        photosArray = await response.json(); 
        console.log(photosArray); 
    } catch (error) {

    }

    
}; 

getPhotos(); 