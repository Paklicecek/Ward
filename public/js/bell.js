const bellBtn = document.getElementById("bellToggle")
const dropdown = document.getElementById("bellDropdown")
const bellDot = document.getElementById("bellDot")
const bellContent = document.getElementById("bellContent")

async function initBell() {
    if (!bellBtn || !dropdown || !bellContent) return
    
    let latestId = null

    try {
        let res = await fetch("https://spsrakovnik.tech/opat.do.2023/Ward/wordpress/ward-news.php")
        let posts = await res.json()
        
        if (posts && posts.length > 0) {
            renderNews(posts)
            latestId = posts[0].id.toString()
        } else {
            renderEmpty()
        }
    } catch (error) {
        console.error("Error fetching news:", error)
        renderError()
    } finally {
        setupBellListeners(latestId)
    }
}

function renderNews(posts) {
    let newsHtml = ""
    
    posts.forEach((post) => {
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = post.title.rendered
        const decodedTitle = tempDiv.textContent || tempDiv.innerText
        
        newsHtml += `
            <a href="${post.link}" class="notif-item">
                <span class="notif-title">${decodedTitle}</span>
            </a>
        `
    })
    
    bellContent.innerHTML = newsHtml
}

function renderEmpty() {
    bellContent.innerHTML = "<div class=\"notif-empty\">No recent updates</div>"
}

function renderError() {
    bellContent.innerHTML = "<div class=\"notif-empty\">Failed to load news</div>"
}

function setupBellListeners(latestId) {
    if (latestId) {
        const seenId = localStorage.getItem("ward_seen_news_id")
        if (latestId !== seenId) {
            bellDot.style.display = "block"
        }
    }

    document.addEventListener("click", (event) => {
        const clickedBell = event.target.closest("#bellToggle")
        const clickedDropdown = event.target.closest("#bellDropdown")

        if (clickedBell) {
            dropdown.classList.toggle("show")
            
            if (latestId) {
                localStorage.setItem("ward_seen_news_id", latestId)
                bellDot.style.display = "none"
            }
        } else if (!clickedDropdown) {
            dropdown.classList.remove("show")
        }
    })
}

initBell()