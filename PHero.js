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
   <button id="btn-design" onclick="handleVideo('${category.category_id}');design('${categories}')"> ${category.category} </button>
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
  console.log(videoData);
  const btnDesign = document.getElementById("btn-design");
  btnDesign.addEventListener("click", function design(designId) {
    console.log(designId);
    btnDesign.classList.add("active");
  });
  const noVideo = document.getElementById("no-video");
  if (videoData.length === 0) {
    noVideo.classList.remove("hidden");
  } else {
    noVideo.classList.add("hidden");
  }
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  videoData.forEach((video) => {
    const length = Object.keys(video).length;
    const dateMin = (video.others.posted_date / 60).toFixed(2);
    const dateHour = Math.floor((dateMin / 60).toFixed(2));
    const minute = Math.floor(dateMin - dateHour * 60);
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
  <div class="card h-96 bg-base-100 shadow-xl">
  <figure class="relative">
  <img class="h-48 w-full" src="${video.thumbnail}" alt="Shoes" />
 </figure>
 <div class="text-xs bg-slate-900 text-gray-100 absolute top-40 p-1 right-0 rounded "> ${
   dateHour === 0 ? "" : dateHour
 } hrs ${minute === 0 ? "" : minute} Min ago </div>
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
handleVideo(1000);
