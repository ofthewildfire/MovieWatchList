import search from "./search.js";

const BASE_URL = `https://www.omdbapi.com/?apikey=56c8e3fa&`;
const searchBtn = document.getElementById("btn");
const placeHolderURL = `https://via.placeholder.com/100x160?text=Image+Not+Available`;
let searchInputValue;
let fullData = [];
let searchResults = []; // should be here now.
export let GetLocalStorage =
	JSON.parse(localStorage.getItem("watchlist")) || [];

searchBtn ? searchBtn.addEventListener("click", search) : "";

//fetch the movie from the input search value
export async function fetchWithSearchName(e) {
	e.preventDefault();
	searchInputValue = document.getElementById("search").value;
	console.log(searchInputValue);
	const response = await fetch(`${BASE_URL}s=${searchInputValue}`);
	const data = await response.json();
	searchResults = data.Search;
	getSearchedNameIds();
	fetchWithIds();
	finalSearch();
}

function getSearchedNameIds() {
	const searchById = searchResults.map((entry) => {
		return entry.imdbID;
	});
	return searchById;
}

function fetchWithIds() {
	let array = getSearchedNameIds();
	let id = array.map((movie) => {
		return movie;
	});
	return id;
}

function finalSearch() {
	let feed = "";
	let ids = fetchWithIds();
	ids.forEach(async (arr) => {
		const res = await fetch(`${BASE_URL}i=${arr}`);
		const data = await res.json();
		fullData.push(data);
		// console.log(data)
		feed += `<section id="movie-search-results" class="movie-search-results" data-movie=${
			data.imdbID
		}>
    <img class="poster-img" src=${
			data.Poster !== "N/A" ? data.Poster : placeHolderURL
		}
     height="160PX" width="100PX">
    <div class="movie" id="movie">
     <h2 class="title" id="title">${
				data.Title
			} <span class="rating" id="rating">
   <img class="star" src="./Icon.png" alt="star rating icon"> ${
			data.imdbRating
		}           </span></h2>
     <div id="movie-information-panel" class="movie-information-panel">
      <span class="runtime" id="runtime">${data.Runtime}</span>
      <span class="genre" id="genre">${data.Genre}</span>
      <button id="addToWatchlist" class="addToWatchlist" data-add=${
				data.imdbID
			}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
     Watchlist</button>
     </div>
     <p class="plot" id="plot">${data.Plot}</p>
    </div>
   </section>`;
		document.getElementById("wrapper").innerHTML = feed;

		if (document.getElementsByClassName("addToWatchList")) {
			const btns = Array.from(
				document.getElementsByClassName("addToWatchlist")
			);
			btns.forEach((btn, index) => {
				btn.addEventListener("click", (e) => {
					let clickedBtn = e.target.dataset.add;
					e.preventDefault();

					fullData.forEach((entry, index) => {
						if (clickedBtn === entry.imdbID) {
							// this one works below
							GetLocalStorage =
								JSON.parse(localStorage.getItem("watchlist")) || [];
							GetLocalStorage.push(entry);
							let clickedMovie = document.querySelector(
								`[data-movie=${clickedBtn}]`
							);
							clickedMovie.style.display = "none";
							localStorage.setItem(
								"watchlist",
								JSON.stringify(GetLocalStorage)
							);
							// console.log(GetLocalStorage);
							// this works
						}
					});
				});
			});
		}

		return feed;
	});
}

export function getWatchList() {
	// const form = document.getElementById('form') || '';
	let html = ``;
	GetLocalStorage.forEach((data) => {
		html += `<section id="movie-search-results" class="movie-search-results" data-movie=${
			data.imdbID
		}>
    <img class='poster-img' src=${
			data.Poster !== "N/A" ? data.Poster : placeHolderURL
		}
     height="160PX" width="100PX">


    <div class="movie" id="movie">
     <h2 class="title" id="title">${
				data.Title
			} <span class="rating" id="rating"> <img class="star" src="./Icon.png" alt="star rating icon">  ${
			data.imdbRating
		}</span></h2>

     <div id="movie-information-panel" class="movie-information-panel">
      <span class="runtime" id="runtime">${data.Runtime}</span>
      <span class="genre" id="genre">${data.Genre}</span>
      <button id="removeFromWatchlist" class="removeFromWatchlist" data-remove=${
				data.imdbID
			}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
      Watchlist</button>
     </div>
     <p class="plot" id="plot">${data.Plot}</p>
    </div>
   </section>`;
	});
	return html;
}

// originally

/*

let GetLocalStorage =  JSON.parse(localStorage.getItem("watchlist"));
let watchListArr = [];

when an item is clicked i compared the click location with the data attribute if they matched i would then take the entry matching the click data attribute and push it (Add it) to the 'WatchlistArr' array 

watchListArr.push(clickedItem)

then i would take that clicked item and set the data inside it to a localStorage 

localStorage.setItem('key', watchListArr)

problem here was simple. 

whenever now i clicked again this logic would run all over again and OVERWRITE the first set, since i am setting all new clicks to the current location of data. never actually retrieving anything at all. 



*/
