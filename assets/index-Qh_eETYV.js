(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`N4TjNNRRbisiYcorkvYhtQUqOCuok7GVjF92TZ-YiKg`;async function t(t=!1){let n=`https://images.unsplash.com/photo-1735630455857-8fab00fecd84?w=900&auto=format&fit=crop&q=60`;if(!t)return n;try{return(await(await fetch(`https://api.unsplash.com/photos/random?query=film&client_id=${e}`)).json())?.urls?.regular??n}catch{return n}}(async()=>{let e=await t();document.getElementById(`header`).style.backgroundImage=`url(${e})`})();var n=document.getElementById(`navLink`),r=document.getElementById(`screen-home`),i=document.getElementById(`screen-watchlist`),a=document.getElementById(`search-input`),o=document.getElementById(`search-btn`);document.getElementById(`main`);var s=[{title:`The Matrix`,year:`1999`,poster:`...`,rating:8.7,duration:136,genre:[`Action`,`Sci-Fi`],description:`A computer hacker learns about the true nature of his reality and his role in the war against its controllers.`}];function c(){return JSON.parse(localStorage.getItem(`watchlist`))||[]}function l(e){localStorage.setItem(`watchlist`,JSON.stringify(e))}function u(e){let t=c();t.some(t=>t.title===e.title)||(t.push(e),l(t))}function d(e){let t=c();t=t.filter(t=>t.title!==e),l(t)}function f(e){let t=e.description.length>100?e.description.slice(0,100)+`...`:e.description,n=c().some(t=>t.title===e.title);return`
    <div class="flex bg-slate-900 rounded-lg p-4 text-white gap-1 w-full max-w-[370px] min-h-40 my-3 shadow">

      <!-- Poster (30%) -->
      <div class="w-[30%] h-40 overflow-hidden rounded-tl-lg rounded-bl-lg mr-">
        <img 
          src="${e.poster}" 
          class="h-full w-full object-cover"
        />
      </div>

      <!-- Info (70%) -->
      <div class="w-[70%] ml-4 flex flex-col justify-center gap-3  px-8 ">

        <!-- Title + Rating -->
        <div class="flex items-start gap-8">
          <h3 class="font-bold text-base leading-tight">${e.title}</h3>

          <div class="flex items-center gap-1 text-yellow-400 text-sm">
            ★ <span class="text-white">${e.rating}</span>
          </div>
        </div>

        <!-- Year + Duration + Genre -->
        <div class="flex flex-wrap items-center gap-2 text-[0.70rem] opacity-80">
          <span>${e.year}</span>
          <span>• ${e.duration} mins</span>
          <span>• ${e.genre.slice(0,2).join(`, `)}</span>
           <!-- Add to Watchlist -->
          <!-- ADD / REMOVE BUTTON -->
          <button 
              data-title="${e.title}"
              class="watchlist-btn cursor-pointer flex items-center gap-1 text-xs rounded transition 
              ${n?`text-red-400`:`text-white hover:text-sky-500`}"
            >
              <span class="text-sm font-semibold">
                ${n?`—`:`＋`}
              </span>
              ${n?`Remove`:`Watchlist`}
          </button>
        </div>

      
       <!-- Description -->
        <p class="text-xs mt-2 leading-snug text-slate-300">
          ${t}
          ${e.description.length>100?`<span class="font-bold text-sky-300 cursor-pointer read-more" data-full="${e.description}">
                 read more
               </span>`:``}
        </p>

      </div>
    </div>
  `}function p(e){i.classList.add(`hidden`),r.classList.remove(`hidden`),r.innerHTML=`
    <div class="movie-card-container flex w-[90%] flex-col md:w-full md:flex-row md:flex-wrap items-center gap-3">
      ${e.map(f).join(``)}
    </div>
  `}async function m(){return new Promise(e=>{setTimeout(()=>{e([{title:`The Matrix`,year:`1999`,poster:`https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg`,rating:8.7,duration:136,genre:[`Action`,`Sci-Fi`],description:`A computer hacker learns about the true nature of his reality and his role in the war against its controllers.`},{title:`Tenet`,year:`2020`,poster:`https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg`,rating:7.4,duration:150,genre:[`Action`,`Thriller`,`Sci-Fi`],description:`A secret agent embarks on a time-bending mission to prevent the start of World War III, navigating inversion and temporal mechanics.`}])},3e3)})}o.addEventListener(`click`,async()=>{let e=a.value.trim();e&&(console.log(`Searching for:`,e),a.value=``,n.textContent=`Search for movies`,i.classList.add(`hidden`),s=await m(),p(s))}),n.addEventListener(`click`,()=>{if(n.textContent===`Search for movies`?(n.textContent=`My Watchlist`,r.classList.add(`hidden`),i.classList.remove(`hidden`)):(n.textContent=`Search for movies`,i.classList.add(`hidden`),r.classList.remove(`hidden`)),n.textContent===`My Watchlist`){let e=c();e.length?i.innerHTML=`
        <div class="movie-card-container flex flex-col items-center gap-3 w-full mt-4">
          ${e.map(f).join(``)}
        </div>
      `:i.innerHTML=`
        <div
          class="icon-bg  absolute top-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-[90%] h-[20vh] m-auto">
          <h2 class="text-slate-300 text-[1.2rem]">Your watchlist is looking a little empty.</h2>
  
          <button id="go-search" class=" text-slate-500 hover:underline flex gap-1 items-center justify-center">
            <img src="/addIcon.png" alt="add items" class="inline" />
            <p class="text-sm">Let's add some movies!</p>
          </button>
        </div>
      `}}),document.addEventListener(`click`,e=>{if(e.target.classList.contains(`read-more`)){let t=e.target.dataset.full,n=e.target.closest(`.movie-desc`);n&&(n.innerText=t,n.classList.add(`expanded`));return}let t=e.target.closest(`.watchlist-btn`);if(t){let e=t.dataset.title,r=c();if(r.some(t=>t.title===e))d(e),alert(`Removed "${e}" from watchlist.`);else{let t=(s||[]).find(t=>t.title===e)||r.find(t=>t.title===e);t?(u(t),alert(`Added "${e}" to watchlist!`)):console.warn(`Movie not found to add:`,e)}n.textContent===`Search for movies`?p(s):i.innerHTML=`
        <div class="movie-card-container flex flex-col items-center gap-3 w-full mt-4">
          ${c().map(f).join(``)}
        </div>
      `;return}e.target.classList.contains(`read-more`)||document.querySelectorAll(`.movie-desc.expanded`).forEach(e=>{let t=e.dataset.full||e.textContent;e.innerHTML=(t.length>100?t.slice(0,100)+`...`:t)+(t.length>100?`<span class="font-bold text-sky-300 cursor-pointer read-more" data-full="${t}"> read more</span>`:``),e.classList.remove(`expanded`)})}),document.addEventListener(`click`,e=>{e.target.classList.contains(`read-more`)&&(e.target.parentElement.innerText=e.target.dataset.full)});