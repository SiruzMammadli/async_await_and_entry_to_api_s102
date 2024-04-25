async function main() {
  const params = new URLSearchParams(window.location.search);
  const url = `https://fakestoreapi.com/products/${params.get("id")}`;
  const fetchData = await fetch(url);
  const dataObj = await fetchData.json();

  if (dataObj) {
    const mainElement = document.querySelector('.wrapper > main');
    const postElement = createPostElement(dataObj);

    mainElement.innerHTML = '';
    mainElement.appendChild(postElement);
  }
}

main();

function createPostElement(data) {
  const post = document.createElement("div");
  post.classList.add("single_post");

  const now = Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(Date.now());

  post.innerHTML = `
    <h1 class="title">${data.title}</h1>
    <p class="posted_at">
        <i>Posted on ${now} by Start Bootstrap</i>
    </p>
    <div class="categories">
        <span>${data.category.toUpperCase()}</span>
    </div>
    <div class="post_image">
        <img src=${data.image} alt="">
    </div>
    <div class="description">
        <p>${data.description}</p>
    </div>
    `;

    return post;
}
