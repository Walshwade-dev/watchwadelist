

export function initSearch() {
    const input = document.getElementById("search-input");
    const btn = document.getElementById("search-btn");
    let movieTitle = ""

    if (!input || !btn) {
        console.warn("Search input or button not found in header.");
        return;
    }

    btn.addEventListener("click", () => {
        const value = input.value.trim();
        movieTitle = value;
        input.value = "";
    });
}
