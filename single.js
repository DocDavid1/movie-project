const apiKey = "f051ba0cd0cf05f07cd6ce6bd2e7cc34";
const searchButton = document.getElementById("searchButton");
const movieIdInput = document.getElementById("movieId");
const movieDetailsContainer = document.getElementById("movieDetails");
const url = "https://image.tmdb.org/t/p/w500"

searchButton.addEventListener("click", () => {
    const movieid = movieIdInput.value.trim();

    if (movieid === "") {
        alert("Please enter a movie ID.");
        return;
    }

    const tmdbApiUrlD = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${apiKey}`;

    fetch(tmdbApiUrlD)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(movieData => {
            movieDetailsContainer.innerHTML = `
                <h1>${movieData.title}</h1>
                <h2>${"how much time:"} ${movieData.vote_count}</h2>
                <p>Release Date: ${movieData.release_date}</p>
                <p>Overview: ${movieData.overview}</p>
                <img src=${url}${movieData.poster_path} alt= ${movieData.title}>
            `;
            console.log(movieData);
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
            movieDetailsContainer.innerHTML = "Movie not found.";
        });
});
