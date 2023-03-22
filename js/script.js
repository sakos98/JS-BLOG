'use strict';

/* document.getElementById('test-button').addEventListener('click', function(){
const links = document.querySelectorAll('.titles a');
console.log('links:', links);
}); */


/*  const links = document.querySelectorAll('.titles a');

for(let link of links){
console.log(link);
} */
const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

/* [DONE] remove class 'active' from all article links  */
const activeLinks = document.querySelectorAll('.titles a.active');

for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
}

/*  [DONE] add class 'active' to the clicked link */
const activeArticles = document.querySelectorAll('.post');

for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
}

/* remove class 'active' from all articles */

/* get 'href' attribute from the clicked link */
console.log('clickedElement:', clickedElement);
const articleSelector = document.getElementById("article-1");
console.log(articleSelector);

/* find the correct article using the selector (value of 'href' attribute) */
const targetArticle = document.querySelector("#article");
console.log(targetArticle);

/* [IN PROGRESS] add class 'active' to the correct article */

const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        (link.addEventListener('click', titleClickHandler));
    }

}
