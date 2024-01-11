function fetchAndDisplayMovies() {
    var inputValue = document.getElementById("lmovie").value;
    const posterContainer = document.getElementById("posterContainer");
    posterContainer.innerHTML = "";
    const tmdbApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=f051ba0cd0cf05f07cd6ce6bd2e7cc34&query=${encodeURIComponent(inputValue)}`;

    fetch(tmdbApiUrl)
        .then(response => response.json())
        .then(data => {
            debugger;
            data.results.forEach(result => {
                if (result.poster_path) {
                    const posterUrl = `https://image.tmdb.org/t/p/w500/${result.poster_path}`;
                    const img = document.createElement("img");
                    img.src = posterUrl;
                    img.alt = result.title;
                    img.className = "movie-poster";
                    posterContainer.appendChild(img);
                }
            });
        })
        .catch(error => {
            console.error("Error fetching TMDb data:", error);
        });
}

const input = document.querySelector("input"),
    h2 = document.querySelector("h2");
input.addEventListener("keyup", display);

function display() {
    localStorage.setItem('value', input.value)
    h2.innerHTML = localStorage.getItem("value")
}

const clearput = document.getElementById("cearIt");
if (clearput) {
    clearput.addEventListener("click", () => {
        localStorage.clear()
    })
}

const clearputIndividual = document.getElementById("cearItindividual");
if (clearputIndividual) {
    clearputIndividual.addEventListener("click", () => {
        localStorage.removeItem('value')
    })
}
