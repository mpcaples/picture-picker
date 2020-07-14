// HTML elements 
const imageContainer = document.getElementById('image-container'); 
const loader = document.getElementById('loader'); 
const form = document.getElementById('form'); 
const input = document.getElementById('searchTerm'); 
const button = document.querySelector('button'); 

// Unsplash API 
const accessKey = 'LYVKBOGxzLRyn6OYr8W1wK1bZKd2VXEvqIxbMWh3n3g'; 
// let query = 'tiger'; 
const count = 10; 
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`; 

// Form submit event listener 
form.addEventListener('submit', formSubmitted); 

function formSubmitted(e) {
    e.preventDefault(); 
    let searchTerm = input.value; 
    searchForPictures(searchTerm); 
}; 



// Initiate an empty array to contain photos
let photosArray = []; 
let ready = false; 
let imagesLoaded = 0; 
let totalImages = 0; 

// Set attribute function 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}; 

// Function to fire for each image when it is loaded 
function imageLoaded() {
    imagesLoaded ++; 
    if (imagesLoaded === totalImages) {
        ready = true; 
    }
    loader.hidden = true; 
}

// Fetch request 
async function getPhotos() {
    try {
        let response = await fetch(apiURL); 
        photosArray = await response.json(); 
        displayPhotos(); 
    } catch (error) {
        console.log('Error:', error); 
    }
}; 


// create elements for links and photos to display to DOM 
function displayPhotos() {
    photosArray.forEach((photo) => {
        // Reset images loaded to trigger scroll event listener  
        imagesLoaded = 0; 
        totalImages = photosArray.length

        // Create anchor to link to Unsplash.com
        const item = document.createElement('a'); 
        setAttributes(item, {
            'href': photo.links.html, 
            'target': '_blank'
        }); 

        // Create img tag for photo
        const img = document.createElement('img'); 
        img.addEventListener('load', imageLoaded);
        setAttributes(img, {
            'src': photo.urls.regular, 
            'alt': photo.alt_description, 
            'title': photo.alt_description
        }); 

        // Put img inside anchor, and both in image-container
        item.appendChild(img); 
        imageContainer.appendChild(item); 
    }); 
}; 

async function searchForPictures(searchTerm) {
    let url = `${apiURL}&query=${searchTerm}`; 
    let response = await fetch(url); 
        photosArray = await response.json(); 
        // Empty image container so that new images can be displayed 
        imageContainer.innerHTML = ''; 
        displayPhotos();  
}; 

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos(); 
        ready = false;
    }
})
 
getPhotos(); 