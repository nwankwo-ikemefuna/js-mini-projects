const addNewPostButton = document.getElementById("add-new-post-button");
const newPostContainer = document.getElementById("new-post-container");
const postAuthorSelect = document.getElementById("post-author");
const submitPostButton = document.getElementById("submit-new-post-button");
const blogContainer = document.getElementById("blog");

newPostContainer.style.display = "none";

addNewPostButton.addEventListener("click", () => {
  newPostContainer.style.display = "flex";
  addNewPostButton.style.display = "none";
})

submitPostButton.addEventListener("click", () => {
  const postTitle = document.getElementById("new-blog-title");
  const postBody = document.getElementById("new-post-body");

  const postObj = {
    "userId": 1,
    "id": postAuthorSelect.value,
    "title": postTitle.innerText,
    "body": postBody.innerText,
  }

  createAndDisplayPostCard(postObj)



  newPostContainer.style.display = "none";
  addNewPostButton.style.display = "block";
});

const apiUrl = 'https://jsonplaceholder.typicode.com';

const fetchPosts = async () => {

 
  
  // fetch all users
  const allUsersReqResponse = await fetch(`${apiUrl}/users`);
  const allUsers = await allUsersReqResponse.json();
  console.log('allUsers', allUsers);

  allUsers.forEach((user) => {
    const authorOption = createElementWithAttributes('option', { value: user.id });
    authorOption.textContent = user.name;
    postAuthorSelect.appendChild(authorOption);
  })

  // fetch all comments
  const allCommentsReqResponse = await fetch(`${apiUrl}/comments`);
  const allComments = await allCommentsReqResponse.json();
  console.log('allComments', allComments);

  // fetch all posts
  const postsReqresponse = await fetch(`${apiUrl}/posts`);
  // get the data as a javascript object (or array)
  const posts = await postsReqresponse.json();

  posts.forEach((post) => {
    createAndDisplayPostCard(post, allUsers, allComments)
    
  });
};

fetchPosts();

function newFunction() {
  console.log(postObj.title);
}

function createAndDisplayPostCard (post, allUsers, allComments) {

  // title
  const postTitle = createElementWithAttributes('h3', { class: "post-title" });
  postTitle.textContent = post.title;

  // author
  const avatarIcon = createElementWithAttributes('i', { class: "fas fa-user-circle post-author-avatar" });
  const authorName = createElementWithAttributes('h5', { class: "post-author" });
  const postAuthor = allUsers.find(user => user.id === post.userId);
  authorName.append(avatarIcon, postAuthor.name);
  const postAuthorContainer = createElementWithAttributes('div', { class: "post-author-container" });
  postAuthorContainer.appendChild(authorName);

  // comments
  const commentsIcon = createElementWithAttributes('i', { class: "fas fa-comments post-comments-icon" });
  const commentsMetaContainer = createElementWithAttributes('div', { 
    class: "post-comments-meta-container",
    id: `post-comments-meta-container-${post.id}`,
  });
  const postComments = allComments.filter(comment => comment.postId === post.id);
  commentsMetaContainer.append(commentsIcon, postComments.length);

  // post meta
  const postMetaContainer = createElementWithAttributes('div', { class: "post-meta-container" });
  postMetaContainer.append(postAuthorContainer, commentsMetaContainer);

  // post content snippet - first 10 words
  const postContentSnippet = createElementWithAttributes('div', { class: "post-content-snippet" });
  const readMoreLink = createElementWithAttributes('a', { 
    class: "post-readmore-link",
    href: '#'
  });
  readMoreLink.innerHTML = '<br /> Read more';
  postContentSnippet.append(post.body.slice(0, 50), '...', readMoreLink);

  // post content snippet - first 10 words
  const postContentFull = createElementWithAttributes('div', { class: "post-content-full" });
  const readLessLink = createElementWithAttributes('a', { 
    class: "post-readless-link",
    href: '#'
  });
  readLessLink.innerHTML = '<br /> Read less';
  postContentFull.style.display = 'none';
  postContentFull.append(post.body, readLessLink);

  const postContentContainer = createElementWithAttributes('div', { class: "post-content-container" });
  postContentContainer.append(postContentSnippet, postContentFull);

  // post card container
  const postCard = createElementWithAttributes('div', { class: "post-card" });
  postCard.append(postTitle, postMetaContainer, postContentContainer);

  // append card to blog container
  blogContainer.appendChild(postCard);

  readMoreLink.addEventListener('click', _ => {
    postContentSnippet.style.display = 'none';
    postContentFull.style.display = 'block';
  });
  readLessLink.addEventListener('click', _ => {
    postContentSnippet.style.display = 'block';
    postContentFull.style.display = 'none';
  });

  commentsMetaContainer.onclick = function () {
    const commentsContainer = createElementWithAttributes('div', { class: 'post-comments-container' });
    postComments.forEach(comment => {
      const singleCommentContainer = createElementWithAttributes('article', { class: 'post-single-comment' });
      const commenterEmailContainer = createElementWithAttributes('em', { class: 'commenter-email' });
      commenterEmailContainer.textContent = `- ${comment.email}`;
      singleCommentContainer.append(comment.body, commenterEmailContainer);
      commentsContainer.append(singleCommentContainer);
    });
    displayModal(`commentsModal-${post.id}`, `Comments - ${post.title}`, commentsContainer);
  }
}