import { getWatchList, GetLocalStorage } from "./index.js";
// GetLocalStorage this has been replaced with testingGet as a test, pls change it back if it becomes an issue.
console.log("i am here boo boo!");
// console.log(getWatchList());
document.getElementById("wrapper-watch-list").innerHTML += getWatchList();

// dealing with the removal of the item

const removeBtns = document.querySelectorAll(".removeFromWatchlist");

removeBtns.forEach((btn, index) => {
	btn.addEventListener("click", (e) => {
		const removeID = e.target.dataset.remove;
		let movie = document.querySelector(`[data-movie=${removeID}]`);
		movie.style.display = "none";

		// testing
		GetLocalStorage.forEach((entry, index) => {
			if (removeID === entry.imdbID) {
				GetLocalStorage.splice(index, 1);
				localStorage.setItem("watchlist", JSON.stringify(GetLocalStorage));
				console.log(GetLocalStorage);
			}
		});

		//
	});
	//
});
