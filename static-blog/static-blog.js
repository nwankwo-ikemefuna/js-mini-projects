const apiUrl = 'https://jsonplaceholder.typicode.com';

const fetchPosts = async () => {
  
  // fetch all users
  const allUsersReqResponse = await fetch(`${apiUrl}/users`);
  const allUsers = await allUsersReqResponse.json();
  //console.log('allUsers', allUsers);

  // fetch all users
  const allCommentsReqResponse = await fetch(`${apiUrl}/comments`);
  const allComments = await allCommentsReqResponse.json();
  //console.log('allComments', allComments);

  // fetch all posts
  const postsReqresponse = await fetch(`${apiUrl}/posts`);
  const posts = await postsReqresponse.json();
  //console.log('posts', posts);

  const postsCardsArr = [];
  posts.forEach(post => {
    
    // title
    const postTitle = createElementWithAttributes('h3', { class: "post-title" });
    postTitle.textContent = `${post.id} ${post.title}`;

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
    const postCardContainer = createElementWithAttributes('div', { class: "post-card" });
    postCardContainer.append(postTitle, postMetaContainer, postContentContainer);

    readMoreLink.addEventListener('click', () => {
      postContentSnippet.style.display = 'none';
      postContentFull.style.display = 'block';
    });
    readLessLink.addEventListener('click', () => {
      postContentSnippet.style.display = 'block';
      postContentFull.style.display = 'none';
    });

    commentsMetaContainer.onclick = function () {
      const commentsContainerId = `post-comments-container-${post.id}`;
      const commentsContainer = createElementWithAttributes('div', { 
        class: 'post-comments-container',
        id: commentsContainerId,
      });
      const commentsCardsArr = [];
      postComments.forEach(comment => {
        const singleCommentContainer = createElementWithAttributes('article', { class: 'post-single-comment' });
        const commenterEmailContainer = createElementWithAttributes('em', { class: 'commenter-email' });
        commenterEmailContainer.textContent = `- ${comment.email}`;
        singleCommentContainer.append(comment.body, commenterEmailContainer);
        commentsCardsArr.push(singleCommentContainer);
      });
      // show the comments modal
      displayModal(`commentsModal-${post.id}`, `Comments - ${post.title}`, commentsContainer);
      // paginate the comments
      paginate(commentsContainerId, commentsCardsArr, 2);

    }

    // append card to blog container 
    postsCardsArr.push(postCardContainer);
  });

  // paginate posts
  paginate('blogPosts', postsCardsArr, 5);
};

fetchPosts();