const categoryHandler = async () => {
  const responsive = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await responsive.json();
  const categories = data.data;
  const categoryContaner = document.getElementById("catagory-container");
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
   <button> ${category.category} </button>
   `;
    categoryContaner.appendChild(categoryDiv);
  });
};

// handle video start here
const handleVideo = async () => {
  const responsive = await fetch(
    "https://openapi.programming-hero.com/api/videos/category/1000"
  );
  const data = await responsive.json();
  const videoData = data.data;
  const videoContainer = document.getElementById("video-container");
  videoData.forEach((video) => {
    console.log(video);
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
  <div class="card h-96 bg-base-100 shadow-xl">
  <figure><img class="h-48 w-full" src="${video.thumbnail}" alt="Shoes" /></figure>
  <div class="card-body">
  <div class="flex gap-2 items-center">
  <img class="w-12 h-12 rounded-full" src="${video?.authors[0]?.profile_picture}" alt="">
  <h1 class="text-2xl font-semibold">${video.title}</h1>
  </div>
  <div class="flex gap-2 items-center">
  <h3 class="text-1xl font-semibold">${video?.authors[0]?.profile_name}</h3>
  <span>${video?.authors[0]?.verified}</span>
</div>
  </div>
</div>
  `;
    videoContainer.appendChild(videoDiv);
  });
};

categoryHandler();
handleVideo();
