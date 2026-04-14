const searchInput = document.querySelector(".searchInput")
const regionSelect = document.querySelector(".regionSelect")
const button = document.querySelector(".searchBtn")

function search() {
    const region = regionSelect.value
    const [user, tagLine] = searchInput.value.split('#');
    if (user && tagLine != null) {
        window.location.href = `/stats.html?user=${user}&tagLine=${tagLine}&region=${region}`
    }
}

button.addEventListener("click", search)

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") search()
})