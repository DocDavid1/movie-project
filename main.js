document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1;
    let tmdbApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=f051ba0cd0cf05f07cd6ce6bd2e7cc34&page=${currentPage}`;

    function fetchAndDisplayMovies() {
        const posterContainer = document.getElementById("posterContainer");
        posterContainer.innerHTML = "";

        fetch(tmdbApiUrl)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(result => {
                    if (result.poster_path) {
                        const newDiv = document.createElement("div");
                        newDiv.className = "movie-poster-container";
                        document.getElementById("posterContainer").appendChild(newDiv);

                        const posterUrl = `https://image.tmdb.org/t/p/w500/${result.poster_path}`;
                        const img = document.createElement("img");
                        img.src = posterUrl;
                        img.alt = result.title;
                        img.className = "movie-poster";
                        newDiv.appendChild(img);

                        const likeButton = document.createElement("button");
                        likeButton.className = "like-button";
                        newDiv.appendChild(likeButton);


                        const likeImg = document.createElement("img");
                        likeImg.src = "images/like.png"; 
                        likeImg.alt = "Like";
                        likeButton.appendChild(likeImg);

                        likeButton.addEventListener("click", () => {
                            console.log(`liked: ${result.title}`);
                            const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
                            favoriteMovies.push({
                                title: result.title,
                                poster_path: result.poster_path,
                            });
                            localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
                            console.log(`liked: ${result.title}`);
                        });
                    }
                });
            })
            .catch(error => {
                console.error("Error fetching TMDb data:", error);
            });
    }

    fetchAndDisplayMovies();

    const loadMoreButtonNums = document.getElementsByClassName("loadMoreButtonNum");

    Array.from(loadMoreButtonNums).forEach(button => {
        button.addEventListener("click", () => {
            const buttonValue = button.value;
            currentPage = buttonValue;
            tmdbApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=f051ba0cd0cf05f07cd6ce6bd2e7cc34&page=${currentPage}`;
            fetchAndDisplayMovies();
        });
    });

    const loadMoreButton = document.getElementById("loadMoreButton");

    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", () => {
            currentPage++;
            tmdbApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=f051ba0cd0cf05f07cd6ce6bd2e7cc34&page=${currentPage}`;
            fetchAndDisplayMovies();
        });
    }

    const loadMoreButton1 = document.getElementById("loadMoreButton1");
    if (loadMoreButton1) {
        loadMoreButton1.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
            } else {
                currentPage = 1;
            }
            tmdbApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=f051ba0cd0cf05f07cd6ce6bd2e7cc34&page=${currentPage}`;
            fetchAndDisplayMovies();
        });
    }

    const loadnewButton = document.getElementById("loadWeekButton");
    if (loadnewButton) {
        loadnewButton.addEventListener("click", () => {
            tmdbApiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=f051ba0cd0cf05f07cd6ce6bd2e7cc34&page=${currentPage}`;
            fetchAndDisplayMovies();
        });
    }

    const loadDayButton = document.getElementById("loadDayButton");
    if (loadDayButton) {
        loadDayButton.addEventListener("click", () => {
            tmdbApiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=f051ba0cd0cf05f07cd6ce6bd2e7cc34&page=${currentPage}`;
            fetchAndDisplayMovies();
        });
    }
});
