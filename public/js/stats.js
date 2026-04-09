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
    const username = document.querySelector('.searchedUsername')
    const tagline = document.querySelector('.searchedTagLine')
    const level = document.querySelector('.levelContainer')
    const profileImg = document.querySelector('.pfpContainer img')
    username.innerHTML = user
    tagline.innerHTML = tagLine
    level.innerHTML = data.level
    profileImg.src = `https://static.bigbrain.gg/assets/lol/riot_static/16.5.1/img/profileicon/${data.profileIcon}.png`


    // === 2. RANKED CARD ===
    const soloRankImg = document.querySelector('.solo .description .imgContainer img')
    const soloRankText = document.querySelector('.solo .description .textContainer .rankText .actualRank')
    const soloLp = document.querySelector('.solo .description .textContainer .rankText .LP')
    const soloWinLoss = document.querySelector('.solo .description .textContainer .rankWins .winAndLosses')
    const soloWinRate = document.querySelector('.solo .description .textContainer .rankWins .winRate')


    // === 3. RANKED FLEX CARD ===
    const flexRankImg = document.querySelector('.flex .description .imgContainer img')
    const flexRankText = document.querySelector('.flex .description .textContainer .rankText .actualRank')
    const flexLp = document.querySelector('.flex .description .textContainer .rankText .LP')
    const flexWinLoss = document.querySelector('.flex .description .textContainer .rankWins .winAndLosses')
    const flexWinRate = document.querySelector('.flex .description .textContainer .rankWins .winRate')


    // === 4. MATCH HISTORY HEADER ===
    const recentWinRateDonutEl = document.querySelector('.donut') // Needs style="--win-rate: XX%"
    const recentWinRateTextEl = document.querySelector('.winRateContainer .winRate')
    const recentKdaTextEl = document.querySelector('.kdaContainer .KDA')
    const recentKdaMathEl = document.querySelector('.kdaContainer .kdaInfo') // The 6.6 / 5.6 / 7.6 part

    // === 5. MATCH LIST CONTAINER ===
    const matchesContainerEl = document.querySelector('.matches');

}