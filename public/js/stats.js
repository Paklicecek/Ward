const params = new URLSearchParams(window.location.search)
const user = params.get('user')
const tagLine = params.get('tagLine')
const region = params.get('region')

showLoader()

async function init() {
    try {
        let res = await fetch(`/api.php?user=${user}&tagLine=${tagLine}&region=${region}`)
        let data = await res.json()
        console.log(data)
        await renderStats(data)
        hideLoader()
    } catch (error) {
        console.error("Error fetching stats:", error)
    }
}

init()

function showLoader() {
    document.querySelector('.app').style.display = 'none'

    let loaderWrapper = document.createElement('div')
    loaderWrapper.classList.add('loader-wrapper')
    loaderWrapper.innerHTML = `
        <div class="loader">
            <div class="bar1"></div><div class="bar2"></div><div class="bar3"></div>
            <div class="bar4"></div><div class="bar5"></div><div class="bar6"></div>
            <div class="bar7"></div><div class="bar8"></div><div class="bar9"></div>
            <div class="bar10"></div><div class="bar11"></div><div class="bar12"></div>
        </div>
    `
    document.body.appendChild(loaderWrapper)
}

function hideLoader() {
    let loaderWrapper = document.querySelector('.loader-wrapper')
    if (loaderWrapper) {
        loaderWrapper.remove()
    }
    document.querySelector('.app').style.display = 'flex'
}

async function renderStats(data) {
    profileHeader(data)
    rankedSolo(data.soloRanked)
    rankedFlex(data.flexRanked)
    matchHistoryHeader(data)
    await matchList(data.matchHistory)
}

// === PROFILE HEADER ===

function profileHeader(data) {
    let username = document.querySelector('.searchedUsername')
    let tagline = document.querySelector('.searchedTagLine')
    let level = document.querySelector('.levelContainer')
    let profileImg = document.querySelector('.pfpContainer img')

    username.innerHTML = user
    tagline.innerHTML = "#" + tagLine
    level.innerHTML = data.level
    profileImg.src = `https://static.bigbrain.gg/assets/lol/riot_static/16.5.1/img/profileicon/${data.profileIcon}.png`
}

// === RANKED SOLO ===

function rankedSolo(data) {
    let soloRankImg = document.querySelector('.solo .description .imgContainer img')
    let soloRankText = document.querySelector('.solo .description .textContainer .rankText .actualRank')
    let soloLp = document.querySelector('.solo .description .textContainer .rankText .LP')
    let soloWinLoss = document.querySelector('.solo .description .textContainer .rankWins .winAndLosses')
    let soloWinRate = document.querySelector('.solo .description .textContainer .rankWins .winRate')

    let soloRankTitle = data.tier
    let soloWins = data.wins
    let soloLosses = data.losses

    soloRankImg.src = rankImg(soloRankTitle)
    soloRankText.innerHTML = soloRankTitle.charAt(0).toUpperCase() + soloRankTitle.slice(1).toLowerCase()
    soloLp.innerHTML = data.lp + " LP"
    soloWinLoss.innerHTML = soloWins + "W " + soloLosses + "L"
    soloWinRate.innerHTML = Math.round((soloWins / (soloWins + soloLosses)) * 100) + "% Win Rate"
}

// === RANKED FLEX ===

function rankedFlex(data) {
    let flexRankImg = document.querySelector('.flex .description .imgContainer img')
    let flexRankText = document.querySelector('.flex .description .textContainer .rankText .actualRank')
    let flexLp = document.querySelector('.flex .description .textContainer .rankText .LP')
    let flexWinLoss = document.querySelector('.flex .description .textContainer .rankWins .winAndLosses')
    let flexWinRate = document.querySelector('.flex .description .textContainer .rankWins .winRate')

    let flexRankTitle = data.tier
    let flexWins = data.wins
    let flexLosses = data.losses

    flexRankImg.src = rankImg(flexRankTitle)
    flexRankText.innerHTML = flexRankTitle.charAt(0).toUpperCase() + flexRankTitle.slice(1).toLowerCase()
    flexLp.innerHTML = data.lp + " LP"
    flexWinLoss.innerHTML = flexWins + "W " + flexLosses + "L"
    flexWinRate.innerHTML = Math.round((flexWins / (flexWins + flexLosses)) * 100) + "% Win Rate"
}

// === MATCH HISTORY HEADER ===

function matchHistoryHeader(data) {
    let donut = document.querySelector('.donut')
    let winRate = document.querySelector('.winRateContainer .winRate')
    let range = document.querySelector(".range")
    let kda = document.querySelector('.kdaContainer .KDA')
    let kdaInfo = document.querySelector('.kdaContainer .kdaInfo')

    let avg = averageCalc(data.matchHistory)

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
    let wins = 0
    let losses = 0

    matches.forEach((match) => {
        killsTotal += match.stats.kills
        deathsTotal += match.stats.deaths
        assistsTotal += match.stats.assists
        if (match.stats.win == true) wins += 1
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

    return {winRate, kdaTotal, avgKills, avgDeaths, avgAssists, numMatches}
}

// === MATCH LIST ===

async function matchList(data) {
    let matchesContainer = document.querySelector('.matches')
    matchesContainer.innerHTML = ""

    for (const match of data) {
        let gameMode = match.gameMode
        let stats = match.stats
        let win = stats.win
        let timeAgo = timeAgoFormatter(match.gameEndTimestamp)

        let matchStatusClass = win ? "win" : "loss"
        let resultTextClass = win ? "winText" : "lossText"
        let resultText = win ? "WIN" : "LOSS"
        let lpColorHex = win ? "#4f9eff" : "#e84057"
        let lpArrowPath = win ? "M5 15 L12 8 L19 15" : "M6 9 L12 15 L18 9"

        let minutes = Math.floor(match.gameDuration / 60)
        let seconds = match.gameDuration % 60
        if (seconds < 10) seconds = "0" + seconds
        let matchDuration = minutes + ":" + seconds
        let rawCsPerMin = stats.cs / minutes
        let csPerMin = Math.round(rawCsPerMin * 10) / 10

        let championImgSrc = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${stats.champion}.png`
        let spell1Src = await getSummonerSpell(stats.mainSummoner)
        let spell2Src = await getSummonerSpell(stats.secondSummoner)
        let mainRuneSrc = await getMainRune(stats.mainRune)
        let secondRuneSrc = `https://static.bigbrain.gg/assets/lol/runes/${stats.secondRune}.png`

        // === ITEMS ===

        let itemsHtml = ""
        let itemOrder = [0, 1, 2, 6, 3, 4, 5]

        for (let i = 0; i < itemOrder.length; i++) {
            let realIndex = itemOrder[i]
            let itemId = stats.items[realIndex]
            let isTrinket = realIndex === 6 ? "trinket" : ""

            if (itemId === 0) {
                itemsHtml += `<div class="item ${isTrinket}"></div>`
            } else {
                itemsHtml += `<img src="https://ddragon.leagueoflegends.com/cdn/16.7.1/img/item/${itemId}.png" class="item ${isTrinket}" />`
            }
        }

        // === PARTICIPANTS ===

        let team1Html = ""
        let team2Html = ""

        match.participants.forEach((p, index) => {
            let isMeClass = p.name === user ? "isMe" : ""
            let playerHtml = `
                <div class="player">
                    <img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${p.championId}.png" />
                    <span class="${isMeClass}">${p.name}</span>
                </div>`

            if (index < 5) team1Html += playerHtml
            else team2Html += playerHtml
        })

        if (gameMode.includes("Ranked")) {
            let rankedTemplate = `
            <div class="match ${matchStatusClass}">
                <div class="matchInfo">
                    <div class="groupOne">
                        <span class="gamemode">${gameMode}</span>
                        <span class="date">${timeAgo}</span>
                        <div class="lpContainer">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="${lpColorHex}" stroke-width="3"><path d="${lpArrowPath}"/></svg>
                            <span class="lpText" style="color: ${lpColorHex};">LP</span>
                        </div>
                        <div class="additionalInformation">
                            <span class="${resultTextClass}">${resultText}</span>
                            <span class="length">${matchDuration}</span>
                        </div>
                    </div>
                    <div class="groupTwo">
                        <img src="${championImgSrc}" class="userChampion" />
                        <div class="summonerSpells">
                            <img src="${spell1Src}" class="summonerSpell" />
                            <img src="${spell2Src}" class="summonerSpell" />
                        </div>
                        <div class="runes">
                            <img src="${mainRuneSrc}" class="rune mainRune" />
                            <img src="${secondRuneSrc}" class="rune secondRune" />
                        </div>
                    </div>
                    <div class="groupThree">
                        <div class="userStats">
                            <span>${stats.kills}</span> <span class="slash">/</span>
                            <span class="deaths">${stats.deaths}</span> <span class="slash">/</span>
                            <span>${stats.assists}</span>
                        </div>
                        <div class="additionalStats">
                            <span class="actuallKDA">${stats.kda}</span>
                            <span class="kdaText">KDA</span>
                        </div>
                        <div class="csVision">
                            <span class="cs">${stats.cs} CS (${csPerMin})</span>
                            <span class="vision">${stats.vision} vision</span>
                        </div>
                    </div>
                    <div class="groupFour itemsGrid">${itemsHtml}</div>
                    <div class="groupFive participants">
                        <div class="team">${team1Html}</div>
                        <div class="team">${team2Html}</div>
                    </div>
                </div>
            </div>`
            matchesContainer.innerHTML += rankedTemplate
        }
    }
}

// === SUMMONER SPELLS ===

let summonerSpells = []

async function getSummonerSpell(spellId) {
    if (summonerSpells.length == 0) {
        let res = await fetch("https://ddragon.leagueoflegends.com/cdn/16.8.1/data/en_US/summoner.json")
        let json = await res.json()
        summonerSpells = Object.values(json.data)
    }

    let spell = null

    summonerSpells.forEach((s) => {
        if (s.key == spellId) {
            spell = s
        }
    })

    return `https://ddragon.leagueoflegends.com/cdn/16.8.1/img/spell/${spell.image.full}`
}

// === RUNES ===

let mainRunes = []

async function getMainRune(runeId) {
    if (mainRunes.length == 0) {
        let res = await fetch("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json")
        let json = await res.json()
        mainRunes = json
    }

    let rune = null

    mainRunes.forEach((r) => {
        if (r.id == runeId) {
            rune = r
        }
    })

    return "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/" + rune.iconPath.replace("/lol-game-data/assets/", "").toLowerCase()
}

// === TIME FORMATTER ===

function timeAgoFormatter(matchTimestampMs) {
    let secondsAgo = Math.floor((Date.now() - matchTimestampMs) / 1000)

    let interval = secondsAgo / 2592000
    if (interval > 1) return Math.floor(interval) + " months ago"

    interval = secondsAgo / 86400
    if (interval > 1) return Math.floor(interval) + " days ago"

    interval = secondsAgo / 3600
    if (interval > 1) return Math.floor(interval) + " hours ago"

    interval = secondsAgo / 60
    if (interval > 1) return Math.floor(interval) + " minutes ago"

    return Math.floor(secondsAgo) + " seconds ago"
}

// === RANK IMAGE ===

function rankImg(rankTitle) {
    rankTitle = rankTitle.toLowerCase()
    let profile = document.querySelector(".profile")
    let levelContainer = document.querySelector(".levelContainer")

    switch (rankTitle) {
        case "iron":
            profile.style.borderColor = "rgb(81, 72, 74)"
            levelContainer.style.borderColor = "rgb(81, 72, 74)"
            break
        case "bronze":
            profile.style.borderColor = "rgb(140, 82, 58)"
            levelContainer.style.borderColor = "rgb(140, 82, 58)"
            break
        case "silver":
            profile.style.borderColor = "rgb(128, 152, 157)"
            levelContainer.style.borderColor = "rgb(128, 152, 157)"
            break
        case "gold":
            profile.style.borderColor = "rgb(205, 136, 55)"
            levelContainer.style.borderColor = "rgb(205, 136, 55)"
            break
        case "platinum":
            profile.style.borderColor = "rgb(37, 172, 214)"
            levelContainer.style.borderColor = "rgb(37, 172, 214)"
            break
        case "emerald":
            profile.style.borderColor = "rgb(20, 156, 58)"
            levelContainer.style.borderColor = "rgb(20, 156, 58)"
            break
        case "diamond":
            profile.style.borderColor = "rgb(129, 65, 235)"
            levelContainer.style.borderColor = "rgb(129, 65, 235)"
            break
        case "master":
            profile.style.borderColor = "rgb(164, 88, 78)"
            levelContainer.style.borderColor = "rgb(164, 88, 78)"
            break
        case "grandmaster":
            profile.style.borderColor = "rgb(205, 69, 69)"
            levelContainer.style.borderColor = "rgb(205, 69, 69)"
            break
        case "challenger":
            profile.style.borderColor = "rgb(244, 200, 116)"
            levelContainer.style.borderColor = "rgb(244, 200, 116)"
            break
        default:
            profile.style.borderColor = "rgb(65, 65, 101)"
            levelContainer.style.borderColor = "rgb(65, 65, 101)"
            break
    }

    return `https://static.bigbrain.gg/assets/lol/ranks/s13/${rankTitle}.png`
}