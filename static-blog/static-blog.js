
window.onload = function () {
  createModal('sampleModal', 'Sample Modal');
}

const sampleModalButton = document.getElementById('sampleModalButton');
sampleModalButton.onclick = function () {
  const sampleModalContent = createElementWithAttributes('h4', { class: "sample-modal" });
  sampleModalContent.textContent = `Sample modal body content....Lorem Ipsum`;
  displayModal('sampleModal', 'sampleModalButton', sampleModalContent);
}

const blogContainer = document.getElementById("blog");

const fetchPosts = async () => {
  
  // fetch all users
  const allUsersReqResponse = await fetch("https://jsonplaceholder.typicode.com/users");
  const allUsers = await allUsersReqResponse.json();
  console.log('allUsers', allUsers);

  // fetch all users
  const allCommentsReqResponse = await fetch("https://jsonplaceholder.typicode.com/comments");
  const allComments = await allCommentsReqResponse.json();
  console.log('allComments', allComments);

  // fetch all posts
  const postsReqresponse = await fetch("https://jsonplaceholder.typicode.com/posts");
  // get the data as a javascript object (or array)
  const posts = await postsReqresponse.json();

  posts.forEach((post) => {
    
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
    const commentsContainer = createElementWithAttributes('div', { class: "post-comments-container" });
    const postComments = allComments.filter(comment => comment.postId === post.id);
    commentsContainer.append(commentsIcon, postComments.length);

    // post meta
    const postMetaContainer = createElementWithAttributes('div', { class: "post-meta-container" });
    postMetaContainer.append(postAuthorContainer, commentsContainer);

    // post content snippet - first 10 words
    const postContentSnippet = createElementWithAttributes('div', { class: "post-content-snippet" });
    const readMoreLink = createElementWithAttributes('a', { 
      class: "post-readmore-link",
      href: '#'
    });
    readMoreLink.textContent = 'Read more';
    postContentSnippet.append(post.body.slice(0, 50), '...', readMoreLink);

    // post content snippet - first 10 words
    const postContentFull = createElementWithAttributes('div', { class: "post-content-full" });
    const readLessLink = createElementWithAttributes('a', { 
      class: "post-readless-link",
      href: '#'
    });
    readLessLink.textContent = 'Read less';
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
  });
};

fetchPosts();