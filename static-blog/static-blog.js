const blogContainer = document.getElementById("blog");

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  console.log(posts);

  posts.forEach(post => {
    const titleContainer = document.createElement('p');
    titleContainer.textContent = post.title;
    blogContainer.appendChild(titleContainer);
  });
}


fetchPosts();

