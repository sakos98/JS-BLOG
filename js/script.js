'use strict';

/* document.getElementById('test-button').addEventListener('click', function(){
const links = document.querySelectorAll('.titles a');
console.log('links:', links);
}); 

const links = document.querySelectorAll('.titles a');

for(let link of links){
console.log(link);
} */

const titleClickHandler = function(event){
  
    /* [DONE] remove class 'active' from all article links  */
const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    event.preventDefault();
    console.log('Link was clicked!');
    const clickedElement = this;
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
const activeArticles = document.querySelectorAll('.post');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
const articleSelector = clickedElement.getAttribute('href'); 
    console.log(articleSelector);
    /* find the correct article using the selector (value of 'href' attribute) */
const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
    
  }
  
  const links = document.querySelectorAll('.titles a');
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }