const blogContainer = document.getElementById("blog");

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  // console.log(posts);

  posts.forEach((post) => {
    const eachBlog = document.createElement("div");
    eachBlog.setAttribute("class", "each-blog");

    const titleContainer = document.createElement("div");
    titleContainer.setAttribute("class", "title-container");
    titleContainer.textContent = post.title;

    eachBlog.appendChild(titleContainer);
    blogContainer.appendChild(eachBlog);
  });
};

fetchPosts();

const fetchUsers = async () => {
  const eachBlog = document.createElement("div");
    eachBlog.setAttribute("class", "each-blog");
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  console.log(users);

  users.forEach((post) => {
    const userContainer = document.createElement("div");
    userContainer.setAttribute("class", "user-container");
    userContainer.textContent = post.name;

    eachBlog.appendChild(userContainer);
  });
}


fetchUsers();
