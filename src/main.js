import "./style.css";

// =========================
// BACKGROUND IMAGE LOADING
// =========================
let key = import.meta.env.VITE_UNSPLASH_KEY;

async function getBackground(useApi = false) {
  const fallback =
    "https://images.unsplash.com/photo-1735630455857-8fab00fecd84?w=900&auto=format&fit=crop&q=60";

  if (!useApi || !key) return fallback;

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=film&client_id=${key}`
    );
    const data = await res.json();
    return data?.urls?.regular ?? fallback;
  } catch (err) {
    return fallback;
  }
}

(async () => {
  const bg = await getBackground();
  document.getElementById("header").style.backgroundImage = `url(${bg})`;
})();


// =========================
// ELEMENTS
// =========================
const navLink = document.getElementById("navLink");
const screenHome = document.getElementById("screen-home");
const screenWatch = document.getElementById("screen-watchlist");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const main = document.getElementById("main");



let movies = [{
  title: "The Matrix",
  year: "1999",
  poster: "...",
  rating: 8.7,
  duration: 136,           // minutes
  genre: ["Action", "Sci-Fi"],
  description:
    "A computer hacker learns about the true nature of his reality and his role in the war against its controllers."
}
]


// =========================
// Watchlist helpers
// =========================
function loadWatchlist() {
  return JSON.parse(localStorage.getItem("watchlist")) || [];
}

function saveWatchlist(list) {
  localStorage.setItem("watchlist", JSON.stringify(list));
}

function addToWatchlist(movie) {
  const list = loadWatchlist();
  if (!list.some(m => m.title === movie.title)) {
    list.push(movie);
    saveWatchlist(list);
  }
}

function removeFromWatchlist(title) {
  let list = loadWatchlist();
  list = list.filter(m => m.title !== title);
  saveWatchlist(list);
}

// =========================
// MOVIE CARD
// =========================
function movieCard(movie) {
  const shortDesc =
    movie.description.length > 100
      ? movie.description.slice(0, 100) + "..."
      : movie.description;

  // check if this movie is already saved
  const alreadySaved = loadWatchlist().some(m => m.title === movie.title);

  return `
    <div class="flex bg-slate-900 rounded-lg p-4 text-white gap-1 w-full max-w-[370px] min-h-40 my-3 shadow">

      <!-- Poster (30%) -->
      <div class="w-[30%] h-40 overflow-hidden rounded-tl-lg rounded-bl-lg mr-">
        <img 
          src="${movie.poster}" 
          class="h-full w-full object-cover"
        />
      </div>

      <!-- Info (70%) -->
      <div class="w-[70%] ml-4 flex flex-col justify-center gap-3  px-8 ">

        <!-- Title + Rating -->
        <div class="flex items-start gap-8">
          <h3 class="font-bold text-base leading-tight">${movie.title}</h3>

          <div class="flex items-center gap-1 text-yellow-400 text-sm">
            ★ <span class="text-white">${movie.rating}</span>
          </div>
        </div>

        <!-- Year + Duration + Genre -->
        <div class="flex flex-wrap items-center gap-2 text-[0.70rem] opacity-80">
          <span>${movie.year}</span>
          <span>• ${movie.duration} mins</span>
          <span>• ${movie.genre.slice(0, 2).join(", ")}</span>
           <!-- Add to Watchlist -->
          <!-- ADD / REMOVE BUTTON -->
          <button 
              data-title="${movie.title}"
              class="watchlist-btn cursor-pointer flex items-center gap-1 text-xs rounded transition 
              ${alreadySaved ? "text-red-400" : "text-white hover:text-sky-500"}"
            >
              <span class="text-sm font-semibold">
                ${alreadySaved ? "—" : "＋"}
              </span>
              ${alreadySaved ? "Remove" : "Watchlist"}
          </button>
        </div>

      
       <!-- Description -->
        <p class="text-xs mt-2 leading-snug text-slate-300">
          ${shortDesc}
          ${movie.description.length > 100
      ? `<span class="font-bold text-sky-300 cursor-pointer read-more" data-full="${movie.description}">
                 read more
               </span>`
      : ""}
        </p>

      </div>
    </div>
  `;
}



// =========================
// RENDER MOVIES (append to SEARCH page)
// =========================
function renderMovies(movies) {
  // Ensure WATCHLIST is hidden
  screenWatch.classList.add("hidden");

  // Show HOME (this is the page where search results MUST appear)
  screenHome.classList.remove("hidden");

  // Replace content INSIDE screen-home
  screenHome.innerHTML = `
    <div class="movie-card-container flex w-[90%] flex-col md:w-full md:flex-row md:flex-wrap items-center gap-3">
      ${movies.map(movieCard).join("")}
    </div>
  `;
}




// =========================
// SIMULATED FETCH (3 seconds)
// =========================
async function fetchMoviesSimulated() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: "The Matrix",
          year: "1999",
          poster:
            "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
          rating: 8.7,
          duration: 136,
          genre: ["Action", "Sci-Fi"],
          description:
            "A computer hacker learns about the true nature of his reality and his role in the war against its controllers."
        },
        {
          title: "Tenet",
          year: "2020",
          poster:
            "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
          rating: 7.4,
          duration: 150,
          genre: ["Action", "Thriller", "Sci-Fi"],
          description:
            "A secret agent embarks on a time-bending mission to prevent the start of World War III, navigating inversion and temporal mechanics."
        }
      ]);
    }, 3000);
  });
}



// =========================
// SEARCH EVENT — ONLY SEARCH POPULATES MOVIES
// =========================
searchBtn.addEventListener("click", async () => {
  const value = searchInput.value.trim();
  if (!value) return;

  console.log("Searching for:", value);
  searchInput.value = "";

  // We are now on the SEARCH PAGE
  navLink.textContent = "Search for movies"; // <— FIXED

  // Hide watchlist
  screenWatch.classList.add("hidden");

  // Render movie results INTO screen-home
  movies = await fetchMoviesSimulated();  // <-- IMPORTANT
  renderMovies(movies);

});




// =========================
// NAV TOGGLE (STRICT LOGIC — NO TOGGLE())
// =========================
navLink.addEventListener("click", () => {
  const isSearchPage = navLink.textContent === "Search for movies";

  if (isSearchPage) {
    // Go TO WATCHLIST
    navLink.textContent = "My Watchlist";
    screenHome.classList.add("hidden");
    screenWatch.classList.remove("hidden");
  } else {
    // Go TO SEARCH PAGE
    navLink.textContent = "Search for movies";
    screenWatch.classList.add("hidden");
    screenHome.classList.remove("hidden");
  }

  // When going TO WATCHLIST, populate it from localStorage
  if (navLink.textContent === "My Watchlist") {
    const list = loadWatchlist();
    if (list.length) {
      screenWatch.innerHTML = `
        <div class="movie-card-container flex flex-col items-center gap-3 w-full mt-4">
          ${list.map(movieCard).join("")}
        </div>
      `;
    } else {
      // keep your placeholder markup intact (no movies)
      screenWatch.innerHTML = `
        <div
          class="icon-bg  absolute top-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-[90%] h-[20vh] m-auto">
          <h2 class="text-slate-300 text-[1.2rem]">Your watchlist is looking a little empty.</h2>
  
          <button id="go-search" class=" text-slate-500 hover:underline flex gap-1 items-center justify-center">
            <img src="/addIcon.png" alt="add items" class="inline" />
            <p class="text-sm">Let's add some movies!</p>
          </button>
        </div>
      `;
    }
  }
});


// =========================
// GLOBAL CLICK HANDLING
// =========================
document.addEventListener("click", (e) => {

  // READ MORE expanded
  if (e.target.classList.contains("read-more")) {
    const full = e.target.dataset.full;
    const parent = e.target.closest(".movie-desc");
    if (parent) {
      parent.innerText = full;
      parent.classList.add("expanded");
    }
    return;
  }

  // WATCHLIST toggle (add/remove)
  const btn = e.target.closest(".watchlist-btn");
  if (btn) {
    const title = btn.dataset.title;
    const currentList = loadWatchlist();
    const exists = currentList.some(m => m.title === title);

    if (exists) {
      removeFromWatchlist(title);
      alert(`Removed "${title}" from watchlist.`);
    } else {
      // find in currently loaded movies OR in watchlist (defensive)
      const movie = (movies || []).find(m => m.title === title) || currentList.find(m => m.title === title);
      if (movie) {
        addToWatchlist(movie);
        alert(`Added "${title}" to watchlist!`);
      } else {
        console.warn("Movie not found to add:", title);
      }
    }

    // re-render current view so buttons update
    if (navLink.textContent === "Search for movies") {
      renderMovies(movies);
    } else {
      // user is viewing watchlist
      const list = loadWatchlist();
      screenWatch.innerHTML = `
        <div class="movie-card-container flex flex-col items-center gap-3 w-full mt-4">
          ${list.map(movieCard).join("")}
        </div>
      `;
    }
    return;
  }

  // collapse any expanded descriptions when clicking anywhere else
  if (!e.target.classList.contains("read-more")) {
    document.querySelectorAll(".movie-desc.expanded").forEach((el) => {
      const full = el.dataset.full || el.textContent;
      // collapse back to short form
      const short = full.length > 100 ? full.slice(0, 100) + "..." : full;
      el.innerHTML = short + (full.length > 100 ? `<span class="font-bold text-sky-300 cursor-pointer read-more" data-full="${full}"> read more</span>` : "");
      el.classList.remove("expanded");
    });
  }
});

// Expand description fallback (for dynamically added read-more that bubble)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("read-more")) {
    e.target.parentElement.innerText = e.target.dataset.full;
  }
});