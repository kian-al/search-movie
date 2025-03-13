let Movie = {};
let loading = document.getElementById("loading");
let button_find_name = document.getElementById("button-find-name");
let button_find_id = document.getElementById("button-find-id");
let poster = document.getElementById("poster");
let main_container = document.querySelector(".main-text");

loading.style.display = "none";

let fetchAPI = async (title) => {
    const apiKey = "e881034";
    const url = `https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;
    loading.style.display = "block";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        loading.style.display = "none";
        return data;
    } catch (error) {
        loading.style.display = "none";
        console.error("Error fetching data:", error);
        return null; 
    }
};

let searchMovie = async (inputId) => {
    let movie_name = document.getElementById(inputId).value;

    if (!movie_name) {
        alert("Please enter a movie name or ID");
        return;
    }

    if (!main_container) {
        console.error("Error: Element with class 'main-text' not found!");
        return;
    }

    main_container.innerHTML = "";

    let data = await fetchAPI(movie_name);

    if (!data || data.Response === "False") { 
        if(data.error.p)
        alert("No data found.");
        poster.style.display = "none";
        return;
    }

    if (data.Poster && data.Poster !== "N/A") {
        poster.src = data.Poster;
        poster.style.display = "block";
    } else {
        poster.style.display = "none";
    }

    Object.entries(data).forEach(([key, value]) => {
        if (key === "Poster") return; 

        let div_parent = document.createElement("div");
        div_parent.classList.add("d-flex", "justify-content-center", "container-md");
        let text = document.createElement("p");
        text.innerHTML = `<strong>${key}:</strong> ${value}`;
        div_parent.appendChild(text);
        main_container.appendChild(div_parent);
    });
};

button_find_name.addEventListener("click", () => searchMovie("movie-name"));
button_find_id.addEventListener("click", () => searchMovie("movie-id"));
