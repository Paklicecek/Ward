const searchInput = document.querySelector(".searchInput")
const regionSelect = document.querySelector(".regionSelect")
const button = document.querySelector(".searchBtn")
const app = document.querySelector(".app")

button.addEventListener("click", ()=>{
    const region = regionSelect.value
    const [user, tagLine] = searchInput.value.split('#');
    fetch(`/api.php?user=${user}&tagLine=${tagLine}&region=${region}`)
        .then(res => res.json())
        .then(data => console.log(data))
})
