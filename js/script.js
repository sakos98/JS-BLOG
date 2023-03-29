'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  linkTags: Handlebars.compile(document.querySelector('#tag-link-tags').innerHTML),
  linkAuthors: Handlebars.compile(document.querySelector('#tag-link-authors').innerHTML),
  linkCloud: Handlebars.compile(document.querySelector('#tag-cloud-link').innerHTML),
  linkAuthor: Handlebars.compile(document.querySelector('#author-cloud-link').innerHTML)
}

const titleClickHandler = function (event) {

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  event.preventDefault();
  console.log('Link was clicked!');
  const clickedElement = this;
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelecor = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorListSelector = '.list.authors';

function generateTitleLinks() {
  /* [Done] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.linkTags(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [DONE] [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  /* [NEW] create variable for all links HTML code */
  const allTagsData = {tags: []};
/* [NEW] START LOOP: for each tag in allTags: */
for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
  allTagsData.tags.push({
    tag: tag,
    count: allTags[tag],
    className: calculateTagClass(allTags[tag], tagsParams)
  });
  /* [NEW] END LOOP: for each tag in allTags: */
}
/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = templates.linkCloud(allTagsData);
console.log(allTagsData);
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLink = document.querySelectorAll('a[href="' + href + '"]')
  /* START LOOP: for each found tag link */
  for (let tagLinks of allTagLink) {
    /* add class active */
    tagLinks.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('.list.list-horizontal a, .list.tags a');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function calculateAuthorParams(authors) {
  const params = {
    max: 0,
    min: 999999,
  };
  for (let author in authors) {
    if (authors[author] > params.max) {
      params.max = author[author];
    }
    if (authors[author] < params.min) {
      params.min = author[author];
    }
    console.log(author + ' is used ' + authors[author] + ' times');
  }
  return params;
}
function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return classNumber;
}

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty array */
  let allAuthors = [];
  /* find all articles */
  const articles = document.querySelectorAll('article');
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelecor);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleAuthor = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleAuthor.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let author of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTMLData = { id: author, title: author };
      const linkHTML = templates.linkAuthors(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allAuthors */
      if (!allAuthors[author]) {
        /* [NEW] add generated code to allAuthors array */
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = html;
    /* [NEW] find list of tags in right column */
    const authorList = document.querySelector(optAuthorListSelector);
    /* [DONE] [NEW] create variable for all links HTML code */
  const authorsParams = calculateAuthorParams(allAuthors);
    /* [NEW] create variable for all links HTML code */
    const allAuthorsData = {authors: []};
    /* [NEW] START LOOP: for each tag in allTags: */
    for (let author in allAuthors) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateAuthorClass(allAuthors[author], authorsParams)
      });
      /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    authorList.innerHTML = templates.linkAuthor(allAuthorsData);
    console.log(allAuthorsData);
  }
}
generateAuthors();