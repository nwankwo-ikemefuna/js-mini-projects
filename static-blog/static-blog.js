const newPostButton = document.getElementById("new-post-button");
const newPostFormContainer = document.getElementById("new-post-container");
const postAuthorSelect = document.getElementById("input-post-author");
const submitPostButton = document.getElementById("submit-post-button");
const closePostFormButton = document.getElementById("close-post-form-button");

const postsCardsArr = [];
let lastCustomPostId = 100;

// show new post form
newPostButton.onclick = () => {
  newPostFormContainer.style.display = "block";
  newPostButton.style.display = "none";
};

// close post form
closePostFormButton.onclick = () => {
  newPostFormContainer.style.display = "none";
  newPostButton.style.display = "block";
};

// post submission
submitPostButton.onclick = () => {
  const postTitleInput = document.getElementById("input-post-title");
  const postAuthorInput = document.getElementById("input-post-author");
  const postBodyInput = document.getElementById("input-post-body");

  if (!postTitleInput.value || !postAuthorInput.value || !postBodyInput.value) {
    alert("Please fill all fields");
    return;
  }

  lastCustomPostId++;

  const postObj = {
    id: lastCustomPostId,
    title: postTitleInput.value,
    userId: postAuthorInput.value,
    body: postBodyInput.value,
  };

  const postAuthor =
    postAuthorInput.options[postAuthorInput.selectedIndex].text;

  const postCardContainer = createAndDisplaySinglePostCard(postObj, postAuthor);
  postsCardsArr.unshift(postCardContainer);

  // paginate posts
  paginate("blogPosts", postsCardsArr, 10);

  postTitleInput.value = "";
  postAuthorInput.value = "";
  postBodyInput.value = "";

  newPostFormContainer.style.display = "none";
  newPostButton.style.display = "block";
};

const fetchPosts = async () => {
  // fetch all users
  const allUsers = await makeHttpRequest("users");
  //console.log("allUsers", allUsers);

  allUsers.forEach((user) => {
    const authorOption = createElementWithAttributes("option", {
      value: user.id,
    });
    authorOption.textContent = user.name;
    postAuthorSelect.appendChild(authorOption);
  });

  // fetch all comments
  const allComments = await makeHttpRequest("comments");
  //console.log("allComments", allComments);

  // fetch all posts
  const posts = await makeHttpRequest("posts");
  //console.log("posts", posts);

  posts.sort((post1, post2) => post2.id - post1.id);

  posts.forEach((postObj) => {
    const postAuthor = allUsers.find((user) => user.id === postObj.userId).name;
    const postComments = allComments.filter(
      (comment) => comment.postId === postObj.id
    );
    const postCardContainer = createAndDisplaySinglePostCard(
      postObj,
      postAuthor,
      postComments
    );

    postsCardsArr.push(postCardContainer);
  });

  // paginate posts
  paginate("blogPosts", postsCardsArr, 10);
};

fetchPosts();

const createAndDisplaySinglePostCard = (
  post,
  postAuthor,
  postComments = []
) => {
  // title
  const postTitle = createElementWithAttributes("h3", { class: "post-title" });
  postTitle.textContent = `${post.id} ${post.title}`;

  // author
  const avatarIcon = createElementWithAttributes("i", {
    class: "fas fa-user-circle post-author-avatar",
  });
  const authorName = createElementWithAttributes("h5", {
    class: "post-author",
  });
  authorName.append(avatarIcon, postAuthor);
  const postAuthorContainer = createElementWithAttributes("div", {
    class: "post-author-container",
  });
  postAuthorContainer.appendChild(authorName);

  // comments
  const commentsIcon = createElementWithAttributes("i", {
    class: "fas fa-comments post-comments-icon",
  });
  const commentsMetaContainer = createElementWithAttributes("div", {
    class: "post-comments-meta-container",
    id: `post-comments-meta-container-${post.id}`,
  });
  commentsMetaContainer.append(commentsIcon, postComments.length);

  // post meta
  const postMetaContainer = createElementWithAttributes("div", {
    class: "post-meta-container",
  });
  postMetaContainer.append(postAuthorContainer, commentsMetaContainer);

  // post content snippet - first 10 words
  const postContentSnippet = createElementWithAttributes("div", {
    class: "post-content-snippet",
  });
  const readMoreLink = createElementWithAttributes("a", {
    class: "post-readmore-link",
    href: "#",
  });
  readMoreLink.innerHTML = "<br /> Read more";
  postContentSnippet.append(post.body.slice(0, 50), "...", readMoreLink);

  // post content snippet - first 10 words
  const postContentFull = createElementWithAttributes("div", {
    class: "post-content-full",
  });
  const readLessLink = createElementWithAttributes("a", {
    class: "post-readless-link",
    href: "#",
  });
  readLessLink.innerHTML = "<br /> Read less";
  postContentFull.style.display = "none";
  postContentFull.append(post.body, readLessLink);

  const postContentContainer = createElementWithAttributes("div", {
    class: "post-content-container",
  });
  postContentContainer.append(postContentSnippet, postContentFull);

  // post card container
  const postCardContainer = createElementWithAttributes("div", {
    class: "post-card",
  });
  postCardContainer.append(postTitle, postMetaContainer, postContentContainer);

  readMoreLink.addEventListener("click", () => {
    postContentSnippet.style.display = "none";
    postContentFull.style.display = "block";
  });
  readLessLink.addEventListener("click", () => {
    postContentSnippet.style.display = "block";
    postContentFull.style.display = "none";
  });

  const newPostCommentForm = document.getElementById("new-post-comment");
  const inputCommenterEmail = document.getElementById("commenter-email");
  const inputPostComment = document.getElementById("input-post-comment");
  const submitCommentFormButton = document.getElementById(
    "submit-comment-button"
  );
  const clearCommentFormButton = document.getElementById(
    "clear-comment-form-button"
  );

  clearCommentFormButton.addEventListener("click", () => {
    inputCommenterEmail.value = "";
    inputPostComment.value = "";
    return;
  });

  let lastCustomCommentId = 500;

  submitCommentFormButton.addEventListener("click", () => {
    if (!inputCommenterEmail.value || !inputPostComment.value) {
      alert("Please fill the form");
      return;
    }

    lastCustomCommentId++;

    const commentObj = {
      id: lastCustomCommentId,
      body: inputPostComment.value,
      email: inputCommenterEmail.value,
    };

    
  });

  commentsMetaContainer.onclick = function () {
    newPostCommentForm.style.display = "block";

    const commentsContainerId = `post-comments-container-${post.id}`;
    const commentsContainer = createElementWithAttributes("div", {
      class: "post-comments-container",
      id: commentsContainerId,
    });
    const commentsCardsArr = [];

  
    postComments.forEach((comment) => {
      const singleCommentContainer = createElementWithAttributes("article", {
        class: "post-single-comment",
      });
      const commenterEmailContainer = createElementWithAttributes("em", {
        class: "commenter-email",
      });
      commenterEmailContainer.textContent = `- ${comment.email}`;
      singleCommentContainer.append(
        comment.body,
        commenterEmailContainer,
        newPostCommentForm
      );
      commentsCardsArr.push(singleCommentContainer);
    });
    // show the comments modal
    displayModal(
      `commentsModal-${post.id}`,
      `Comments - ${post.title}`,
      commentsContainer,
      null,
      false
    );
    // paginate the comments
    paginate(commentsContainerId, commentsCardsArr, 3);
  };
  return postCardContainer;
};
