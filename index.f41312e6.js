!function(){var n=function(n){var t=document.querySelector(".country-list");t.innerHTML="",n.forEach((function(n){var e=document.createElement("li");e.textContent=n,t.appendChild(e)}))};document.getElementById("search-box").addEventListener("input",(function(){var t,e=document.getElementById("search-box").value.trim();e?(t=e,fetch("https://restcountries.com/v3.1/name/".concat(encodeURIComponent(t))).then((function(n){if(!n.ok)throw new Error("Error: ".concat(n.status));return n.json()})).then((function(n){return n.map((function(n){return n.name.common}))})).catch((function(n){return console.error("Fetching error:",n)}))).then((function(t){n(t)})).catch((function(n){console.error("Error fetching countries:",n)})):n([])}))}();
//# sourceMappingURL=index.f41312e6.js.map