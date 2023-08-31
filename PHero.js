const categoryHandler = async () => {
  const responsive = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await responsive.json();
  const categories = data.data;
  // console.log(categories);
  const categoryContaner = document.getElementById("catagory-container");
  categories.forEach((category) => {
    console.log(category.category_id);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
   <button onclick="handleVideo('${category.category_id}')"> ${category.category} </button>
   `;
    categoryContaner.appendChild(categoryDiv);
  });
};

// handle video start here
const handleVideo = async (id) => {
  console.log(id);
  const responsive = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await responsive.json();
  const videoData = data.data;
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  videoData.forEach((video) => {
    // console.log(video);
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
  <div class="card h-96 bg-base-100 shadow-xl">
  <figure><img class="h-48 w-full" src="${
    video.thumbnail
  }" alt="Shoes" /></figure>
  <div class="card-body">
  <div class="flex gap-2 items-center">
  <img class="w-12 h-12 rounded-full" src="${
    video?.authors[0]?.profile_picture
  }" alt="">
  <h1 class="text-2xl font-semibold">${video.title}</h1>
  </div>
  <div class="flex gap-2 items-center">
  <h3 class="text-1xl font-semibold">${video?.authors[0]?.profile_name}</h3>
  <span>${
    video?.authors[0]?.verified === true
      ? '<img class="w-5" src="logo/varify.png" alt="">'
      : ""
  } </span>
  </div>
  <p class="font-semibold">${video?.others?.views} views </p>
  </div>
</div>
  `;
    videoContainer.appendChild(videoDiv);
  });
};

categoryHandler();
handleVideo();
