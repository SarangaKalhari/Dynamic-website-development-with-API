console.log("Hi !!")


let movieName = document.getElementById("searchInput");
let btnSearch = document.getElementById("btnSearch");

document.getElementById("btnSearch").addEventListener("click", function () {
    let movieTitle = document.getElementById("searchInput").value.trim();
    if (movieTitle) {
        window.location.href = "search.html?title=" + encodeURIComponent(movieTitle);

    }
});

// ------------------ Search Page Auto Load ------------------
window.addEventListener("DOMContentLoaded", () => {
    let params = new URLSearchParams(window.location.search);
    let movieTitle = params.get("title");

    if (movieTitle) {
        document.getElementById("searchInput").value = movieTitle;
        callAPI(movieTitle); // auto run API call
    }
});





movieName.addEventListener("keypress", e => {
    if (e.key == 'Enter') {
        console.log(movieName.value);
        callAPI(movieName.value.trim());
    }
});

btnSearch.addEventListener("click", () => {

    console.log(movieName.value);
    callAPI(movieName.value.trim());
});

async function callAPI(movie = movieName) {
    await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=27cb0e1d&t=${movie}`)
        .then((responce) => responce.json())
        .then((data) => {
            if (data.Response === "True") {
                setDetails(data);
            } else {
                alert("movie not  found !");
            }

        })

    await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=27cb0e1d&s=${movie}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.Response === "True") {
                keywordFunction = data.Search;
                showKeywordResult(keywordFunction);

            }
        })
}

function showKeywordResult(results) {
    const container = document.getElementById("keywordFunction");
    container.innerHTML = "";

    results.forEach(movie => {
        const div = document.createElement("div");
        div.className = "keyword-movie";
        div.innerHTML = `
            <p>${movie.Title} </p>
            <img src= "${movie.Poster}" alt= "" width = "100"> 
        `;
        container.appendChild(div);
    });
}

function setDetails(movieData) {
    let movie = document.getElementById("title");
    let year = document.getElementById("released_year");
    let imdb = document.getElementById("imdb");
    // let casting = document.getElementById("cast");
    // let category = document.getElementById("categories");
    let images = document.getElementById("image");
    let gen = document.getElementById("genre");
    let director = document.getElementById("director");
    let writer = document.getElementById("writer");
    let actor = document.getElementById("actors");
    let plott = document.getElementById("plot");
    let country = document.getElementById("country");
    let language = document.getElementById("lang");
    let awards = document.getElementById("awards");



    movie.innerText = movieData.Title;
    year.innerText = movieData.Year;
    imdb.innerText = movieData.imdbRating;
    images.src = movieData.Poster;
    gen.innerText = movieData.Genre;
    director.innerText = movieData.Director;
    writer.innerText = movieData.Writer;
    actor.innerText = movieData.Actors;
    plott.innerText = movieData.Plot;
    country.innerText = movieData.Country;
    language.innerText = movieData.Language;
    awards.innerText = movieData.Awards;

}




