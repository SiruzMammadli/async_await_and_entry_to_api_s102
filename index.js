// const btn = document.querySelector('button');

// btn.addEventListener('click', () => {
//     const body = document.body;
//     body.classList.toggle('dark');
//     btn.innerText = body.classList.contains('dark')
//     ? 'switch light mode'
//     : 'switch dark mode'
// });

// const arr = [
//   {
//     id: 1,
//     name: "sabir",
//     surname: "babayev",
//     age: 22,
//   },
//   {
//     id: 2,
//     name: "filankes",
//     surname: "filankesov",
//     age: 24
//   },
//   {
//     id: 3,
//     name: "filankese",
//     surname: "filankesova",
//     age: 20,
//   },
// ];

// const single = arr.find(x => x.name === 'sabir');
// single.age = 29;

// for (const item of arr) {
//     if (item.name === 'sabir' && item.surname === 'babayev') {
//         item.age = 29
//     };
// }

// const numArr = [1, 3, 5, 7, 8, 15, 18, 21];
// const oddArr = [];
// const evenArr = [];

// for (const item of numArr) {
//     if (item % 2 === 0) evenArr.push(item)
//     if (item % 2 === 1) oddArr.push(item)
// }

// console.log(oddArr, evenArr);

// function one() {
//     const timer = setTimeout(function() {
//         console.log("one");
//     }, 1000);
//     return timer;
// }
// async function two() {
//     console.log("two");
// }

// one();
// two();

async function main() {
  const fetchData = await fetch("https://fakestoreapi.com/products");
  const datas = await fetchData.json();

  if (datas) {
    const mainElement = document.querySelector(".wrapper > main");
    const featuredData = datas.find((data) => data.id === 1);
    const filteredDatas = datas.filter((data) => data.id !== 1);

    if (featuredData) {
      const now = Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(Date.now());

      const featuredElement = createPostElement(featuredData, now);
      if (featuredElement) {
        mainElement.innerHTML = "";
        mainElement.appendChild(featuredElement);
      }

      const postGridSection = createPostGridSection(filteredDatas, now);
      if (postGridSection) {
        mainElement.appendChild(postGridSection);
      }
    }
  }
}

main();

function createPostElement(data, time) {
  const post = document.createElement("div");
  post.classList.add("post");

  const params = new URLSearchParams({
    id: data.id
  });

  post.innerHTML = `
    <div class="post_img">
        <img src=${data.image} alt="">
    </div>
    <div class="post_info">
        <p class="post_created_at">${time}</p>
        <h2 class="post_title">${data.title}</h2>
        <p class="description">
            ${data.description}
        </p>
        <a href=${`/single.html?${params}`} class="read_more">Read more -></a>
    </div>
    `;
  return post;
}

function createPostGridSection(arr, time) {
    const sectionElement = document.createElement('section');
    sectionElement.classList.add('post_grid');

    for (const post of arr) {
        const postElement = createPostElement(post, time);
        sectionElement.appendChild(postElement);
    }

    return sectionElement;
}
