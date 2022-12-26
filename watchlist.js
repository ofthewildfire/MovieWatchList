import {getWatchList, GetLocalStorage} from './index.js';
// GetLocalStorage this has been replaced with testingGet as a test, pls change it back if it becomes an issue. 
console.log("i am here boo boo!")
// console.log(getWatchList());
document.getElementById('wrapper-watch-list').innerHTML += getWatchList();