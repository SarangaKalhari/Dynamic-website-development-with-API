console.log("Hi !!")

let movieName = document.getElementById("searchInput");
let btnSearch = document.getElementById("btnSearch");


movieName.addEventListener("keypress", e => {
    if(e.key == 'Enter'){
        console.log(movieName.value);
        callAPI(movieName.value.trim());
    }
});

btnSearch.addEventListener("click", () => {
    console.log(movieName.value);
    callAPI(movieName.value.trim());
})
async  function callAPI() {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=6b458860=${movie}`)
    .then((response) => response.json())
    .then((data) => {
        if (data.response === "True") {
            setDetails(data);
        }else {
            alert("movie not  found !");
        }
        
    })
    
    fetch(`https://www.omdbapi.com/?apikey=6b458860=${movie}`)
    .then(res => res.json())
    .then(data => {
        if (data.response === "True") {
            keywordResult = data.Search;
            displayKeywordResult(keywordResult);

        }
    })
}

function displayKeywordResult(result) {
    const container = document.getElementById("keyword-result");
    container.innerHTML = "";

    results.forEach(element => {
        const div = document.createElement("div");
        div.className = "keyword-movie";
        div.innerHTML = `
            <p>${movie.Title} </p>
            <img src= "${movie.Poster}" alt= "" width = "100"> 
        `;
        container.appendChild(div);
    });
    
}

