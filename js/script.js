'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log(event, 'Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement (with plus): ' + clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

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

function generateTitleLinks(customSelector = ''){
  const linksContainer = document.querySelector('ul.titles');
  linksContainer.innerHTML = '';
  let linksHtml = '';
  const articles = document.querySelectorAll('.posts article' + customSelector);
  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleName = article.querySelector('.post-title').innerHTML;
    const linkHtml = '<li><a href="#'+articleId+'" class="active"><span>'+articleName+'</span></a></li>';
    linksHtml = linksHtml+linkHtml;
  }

  linksContainer.innerHTML = linksHtml;
}
generateTitleLinks();


const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll('.posts article');

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const articleTagsContainer = article.querySelector('.post-tags .list');
    /* make html variable with empty string */
    let linksHtml = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHtml = '<li><a href="#tag-'+tag+'">'+tag+'</a></li>';
      /* add generated code to html variable */
      linksHtml = linksHtml+linkHtml;
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    articleTagsContainer.innerHTML = linksHtml;
  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(event, 'Link was clicked!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let tagLink of tagLinks){
    /* remove class active */
    tagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const currentTags = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let currentTag of currentTags){
    /* add class active */
    currentTag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll('.posts article');

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const articleAuthorsContainer = article.querySelector('.post-author');

    /* get tags from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author');
    const linkHtml = '<a href="#author-'+articleAuthor+'">'+articleAuthor+'</a>';
    /* insert HTML of all the links into the tags wrapper */
    articleAuthorsContainer.innerHTML = linkHtml;
  /* END LOOP: for every article: */
  }
}

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(event, 'Link was clicked!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#author-', '');
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for(let tagLink of tagLinks){
    /* remove class active */
    tagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const currentTags = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let currentTag of currentTags){
    /* add class active */
    currentTag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

generateAuthors();

function addClickListenersToAuthors(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();