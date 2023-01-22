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

function generateTitleLinks(){
  const linksContainer = document.querySelector('ul.titles');
  linksContainer.innerHTML = '';
  let linksHtml = '';
  const articles = document.querySelectorAll('.posts article');
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