const params = new URLSearchParams(window.location.search)
const user = params.get('user')
const tagLine = params.get('tagLine')
const region = params.get('region')

fetch(`/api.php?user=${user}&tagLine=${tagLine}&region=${region}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        renderStats(data)
    })
    .catch(error => {
        console.error("Error fetching stats:", error)
    })

function renderStats(data) {
    // === 1. PROFILE HEADER ===
    const usernameEl = document.querySelector('.searchedUsername')
    const taglineEl = document.querySelector('.searchedTagLine')
    const levelEl = document.querySelector('.levelContainer')
    const profileImgEl = document.querySelector('.pfpContainer img')
    usernameEl.innerHTML = user
    taglineEl.innerHTML = tagLine
    levelEl.innerHTML = data.level
    profileImgEl.src = `https://static.bigbrain.gg/assets/lol/riot_static/16.5.1/img/profileicon/${data.profileIcon}.png`

    // === 2. RANKED FLEX CARD ===
    const flexRankImgEl = document.querySelector('.description .imgContainer img')
    const flexRankTextEl = document.querySelector('.actualRank')
    const flexLpEl = document.querySelector('.LP')
    const flexWinLossEl = document.querySelector('.winAndLosses')
    const flexWinRateEl = document.querySelector('.winRate')

    
    // === 3. MATCH HISTORY HEADER ===
    const recentWinRateDonutEl = document.querySelector('.donut') // Needs style="--win-rate: XX%"
    const recentWinRateTextEl = document.querySelector('.winRateContainer .winRate')
    const recentKdaTextEl = document.querySelector('.kdaContainer .KDA')
    const recentKdaMathEl = document.querySelector('.kdaContainer .kdaInfo') // The 6.6 / 5.6 / 7.6 part

    // === 4. MATCH LIST CONTAINER ===
    const matchesContainerEl = document.querySelector('.matches');

}