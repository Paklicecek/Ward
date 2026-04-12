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
    profileHeader(data)
    rankedSolo(data.soloRanked)
    rankedFlex(data.flexRanked)
    matchHistoryHeader(data)
    matchList(data)
}

function profileHeader(data) {
    // === 1. PROFILE HEADER ===
    const username = document.querySelector('.searchedUsername')
    const tagline = document.querySelector('.searchedTagLine')
    const level = document.querySelector('.levelContainer')
    const profileImg = document.querySelector('.pfpContainer img')

    username.innerHTML = user
    tagline.innerHTML = "#" + tagLine
    level.innerHTML = data.level
    profileImg.src = `https://static.bigbrain.gg/assets/lol/riot_static/16.5.1/img/profileicon/${data.profileIcon}.png`
}

function rankedSolo(data) {
    // === 2. RANKED SOLO CARD ===
    const soloRankImg = document.querySelector('.solo .description .imgContainer img')
    const soloRankText = document.querySelector('.solo .description .textContainer .rankText .actualRank')
    const soloLp = document.querySelector('.solo .description .textContainer .rankText .LP')
    const soloWinLoss = document.querySelector('.solo .description .textContainer .rankWins .winAndLosses')
    const soloWinRate = document.querySelector('.solo .description .textContainer .rankWins .winRate')

    let soloRanked = data
    let soloRankTitle = soloRanked.tier
    let soloWins = soloRanked.wins
    let soloLosses = soloRanked.losses

    soloRankImg.src = rankImg(soloRankTitle)
    soloRankText.innerHTML = soloRankTitle.charAt(0).toUpperCase() + soloRankTitle.slice(1).toLowerCase()
    soloLp.innerHTML = soloRanked.lp + " LP"
    soloWinLoss.innerHTML = soloWins + "W " + soloLosses + "L"
    soloWinRate.innerHTML = Math.round((soloWins / (soloWins + soloLosses)) * 100) + "% Win Rate"
}

function rankedFlex(data) {
    // === 3. RANKED FLEX CARD ===
    const flexRankImg = document.querySelector('.flex .description .imgContainer img')
    const flexRankText = document.querySelector('.flex .description .textContainer .rankText .actualRank')
    const flexLp = document.querySelector('.flex .description .textContainer .rankText .LP')
    const flexWinLoss = document.querySelector('.flex .description .textContainer .rankWins .winAndLosses')
    const flexWinRate = document.querySelector('.flex .description .textContainer .rankWins .winRate')

    let flexRanked = data
    let flexRankTitle = flexRanked.tier
    let flexWins = flexRanked.wins
    let flexLosses = flexRanked.losses

    flexRankImg.src = rankImg(flexRankTitle)
    flexRankText.innerHTML = flexRankTitle.charAt(0).toUpperCase() + flexRankTitle.slice(1).toLowerCase()
    flexLp.innerHTML = flexRanked.lp + " LP"
    flexWinLoss.innerHTML = flexWins + "W " + flexLosses + "L"
    flexWinRate.innerHTML = Math.round((flexWins / (flexWins + flexLosses)) * 100) + "% Win Rate"
}

function matchHistoryHeader(data) {
    // === 4. MATCH HISTORY HEADER ===
    const donut = document.querySelector('.donut')
    const winRate = document.querySelector('.winRateContainer .winRate')
    const range = document.querySelector(".range")
    const kda = document.querySelector('.kdaContainer .KDA')
    const kdaInfo = document.querySelector('.kdaContainer .kdaInfo')

    const avg = averageCalc(data.matchHistory)

    donut.style.setProperty("--win-rate", `${avg.winRate}%`)
    winRate.innerHTML = avg.winRate + "% WR"
    range.innerHTML = "Last " + avg.numMatches + " games"
    kda.innerHTML = avg.kdaTotal + " KDA"
    kdaInfo.innerHTML = avg.avgKills + " / " + avg.avgDeaths + " / " + avg.avgAssists

}

function averageCalc(matches) {
    let killsTotal = 0
    let deathsTotal = 0
    let assistsTotal = 0
    let winArray = []
    let wins = 0
    let losses = 0

    matches.forEach((match) => {
        killsTotal += match.stats.kills
        deathsTotal += match.stats.deaths
        assistsTotal += match.stats.assists
        winArray.push(match.stats.win)

    })
    winArray.forEach((win) => {
        if (win == true) wins += 1
        else losses += 1
    })

    let rawWinRate = wins / (wins + losses)
    let rawKda = (killsTotal + assistsTotal) / deathsTotal
    let rawKills = killsTotal / matches.length
    let rawDeaths = deathsTotal / matches.length
    let rawAssists = assistsTotal / matches.length

    let winRate = Math.round(rawWinRate * 100)
    let kdaTotal = Math.round(rawKda * 100) / 100
    let avgKills = Math.round(rawKills * 10) / 10
    let avgDeaths = Math.round(rawDeaths * 10) / 10
    let avgAssists = Math.round(rawAssists * 10) / 10
    let numMatches = matches.length

    let data = {
        winRate,
        kdaTotal,
        avgKills,
        avgDeaths,
        avgAssists,
        numMatches
    }
    return data
}

function matchList() {
    // === 5. MATCH LIST CONTAINER ===
    const matchesContainerEl = document.querySelector('.matches');
}

function rankImg(rankTitle) {
    rankTitle = rankTitle.toLowerCase()
    const profile = document.querySelector(".profile")
    const levelContainer = document.querySelector(".levelContainer")
    switch (rankTitle) {
        case "iron":
            profile.style.borderColor = "rgb(81, 72, 74)"
            levelContainer.style.borderColor = "rgb(81, 72, 74)"
            break;
        case "bronze":
            profile.style.borderColor = "rgb(140, 82, 58)"
            levelContainer.style.borderColor = "rgb(140, 82, 58)"
            break;
        case "silver":
            profile.style.borderColor = "rgb(128, 152, 157)"
            levelContainer.style.borderColor = "rgb(128, 152, 157)"
            break;
        case "gold":
            profile.style.borderColor = "rgb(205, 136, 55)"
            levelContainer.style.borderColor = "rgb(205, 136, 55)"
            break;
        case "platinum":
            profile.style.borderColor = "rgb(37, 172, 214)"
            levelContainer.style.borderColor = "rgb(37, 172, 214)"
            break;
        case "emerald":
            profile.style.borderColor = "rgb(20, 156, 58)"
            levelContainer.style.borderColor = "rgb(20, 156, 58)"
            break;
        case "diamond":
            profile.style.borderColor = "rgb(129, 65, 235)"
            levelContainer.style.borderColor = "rgb(129, 65, 235)"
            break;
        case "master":
            profile.style.borderColor = "rgb(164, 88, 78)"
            levelContainer.style.borderColor = "rgb(164, 88, 78)"
            break;
        case "grandmaster":
            profile.style.borderColor = "rgb(205, 69, 69)"
            levelContainer.style.borderColor = "rgb(205, 69, 69)"
            break;
        case "challenger":
            profile.style.borderColor = "rgb(244, 200, 116)"
            levelContainer.style.borderColor = "rgb(244, 200, 116)"
            break;
        default:
            profile.style.borderColor = "rgb(65, 65, 101)"
            levelContainer.style.borderColor = "rgb(65, 65, 101)"
            break;
    }
    return `https://static.bigbrain.gg/assets/lol/ranks/s13/${rankTitle}.png`
}

