
'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
}

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

const optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';


function generateTitleLinks(customSelector = ''){
  const linksContainer = document.querySelector('ul.titles');
  linksContainer.innerHTML = '';
  let linksHtml = '';
  const articles = document.querySelectorAll('.posts article' + customSelector);
  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleName = article.querySelector('.post-title').innerHTML;
    //const linkHtml = '<li><a href="#'+articleId+'"class="active"><span>'+articleName+'</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleName};
    const linkHTML = templates.articleLink(linkHTMLData);
    linksHtml = linksHtml+linkHTML;
  }

  linksContainer.innerHTML = linksHtml;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
  link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();






function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;

}



function generateTags(){
  const optTagsListSelector = '.tags.list';
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
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
      //const linkHtml = '<li><a href="#tag-'+tag+'">'+tag+'</a></li>';
      const linkHTMLData = {id: 'tag-'+tag, title: tag};
      const linkHTML = templates.articleLink(linkHTMLData);
      /* add generated code to html variable */
      linksHtml = linksHtml+linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      console.log('Test', allTags, tag);
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    articleTagsContainer.innerHTML = linksHtml;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);
  /*[NEW] create variable for all links HTML code*/
  //let allTagsHTML='';
  const allTagsData = {tags: []};
  /*[NEW] START LOOP: for each tag in allTags:*/
  for(let tag in allTags){
  /*[NEW] generate code of a link and add it to allTagsHTML*/
    const tagLinkHTML = `<li><a href="#tag-${tag}" class="${calculateTagClass(allTags[tag], tagsParams)}">${tag} (${allTags[tag]})</a></li>`;

    console.log('taglinkHTML:', tagLinkHTML);
    //allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  /*[NEW] END LOOP: for each tag in allTags:*/
  }
  /*[NEW] add html from allTagsHTML to tagList*/
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);

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
  const optAuthorsListSelector = '.authors.list';
  /* find all articles */
  let allAuthors = {};
  const articles = document.querySelectorAll('.posts article');

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const articleAuthorsContainer = article.querySelector('.post-author');
    /* get tags from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author');
    //const linkHtml = '<a href="#author-'+articleAuthor+'">'+articleAuthor+'</a>';
    const linkHTMLData = {id: 'author-'+articleAuthor, title: articleAuthor};
    const linkHTML = templates.articleLink(linkHTMLData);
    /* insert HTML of all the links into the tags wrapper */
    articleAuthorsContainer.innerHTML = linkHTML;
    /* END LOOP: for every article: */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      /* [NEW] add authors to allAuthors object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
  }
  const authorList = document.querySelector(optAuthorsListSelector);
  console.log(allAuthors);

  //let allAuthorsHTML='';
  const allAuthorsData = {authors: []};
  /*[NEW] START LOOP: for each tag in allTags:*/
  for(let author in allAuthors){
  /*[NEW] generate code of a link and add it to allTagsHTML*/

    const authorLinkHTML = `<li><a href="#author-${author}">${author} (${allAuthors[author]})</a></li>`;



    console.log('authorLinkHTML:', authorLinkHTML);
    //allAuthorsHTML += authorLinkHTML;
    allAuthorsData.authors.push({
      authors: author,
      count: allAuthors[author]
    });

  /*[NEW] END LOOP: for each tag in allTags:*/
  }
  /*[NEW] add html from allTagsHTML to tagList*/
  //authorList.innerHTML = allAuthorsHTML;
  authorList.innerHTML = templates.authorLink(allAuthorsData);
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