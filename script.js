const baseUrl = "https://api.github.com/graphql"

const githubInfo = {
    "token": "bf1fc737a45e7f73557940497d5558a27f7c709a",
    "username": "jelhill"
}
const headers = {
    "Content-Type": "application/json",
    Authorization:  "Bearer " + githubInfo.token
}
const body = {
    "query": `
        query { 
        user(login: "jelhill") {
          avatarUrl 
          repositories(first: 20) {
            edges {
              node {
                id,
                isPrivate,
                name,
                createdAt,
                descriptionHTML
              }
            }
          }
        }
      }`
}

document.addEventListener("DOMContentLoaded", getRepo)


function duration(updated_at){
    updated_at = new Date(updated_at.split("T").join(" ").split("Z")[0]).getTime()
    let now = Date.now()
    let seconds = (now - updated_at)/1000
    if(seconds < 60) return `${seconds} seconds`

    if(seconds > 60 && seconds < 3600) {
        let minutes =  Math.floor(seconds / 60)
        return `${minutes} minutes`
    }
  
    if(seconds > 3600 && seconds < 86400 ) {
        let hours = Math.floor(seconds/ 3600)
        return `${hours} hour`
    }
  
    if(seconds > 86400 ) {
        let days = Math.floor(seconds/ 86400)
        return `${days} days`
    }
  }


function getRepo() {
    console.log(githubInfo, baseUrl);
    fetch(baseUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(jsonRes => {
        console.log(jsonRes);
        if(jsonRes) {
            document.getElementById("avatar-div").innerHTML = `<img src="${jsonRes.data.user.avatarUrl}" alt="">`
            document.getElementById("mini-avatar").innerHTML = `<img src="${jsonRes.data.user.avatarUrl}" alt="">`
            document.getElementById("projectWrapper").innerHTML = 
            jsonRes.data.user.repositories.edges.map((repo) => {
                return `
                <div class="project-wrapper" id="projectWrapper">
                    <div class="project-div">
                        <div class="project-name">
                            <a href="" class="repo-name">${repo.node.name}</a>
                            ${!repo.node.isPrivate ? "" : "<small>Private</small>"}
                        </div>
                        <div class="lang-div">
                            <div class="${repo.node.descriptionHTML === "<div></div>" ? "lang-color" : "redcolor"}"></div>
                            <span>${repo.node.descriptionHTML === "<div></div>" ? "JavaScript" : "HTML"}</span>
                            <span>Updated ${duration(repo.node.createdAt)}</span>
                        </div>
                    </div>

                    <div class="star-div">
                        <div class="star-btn">
                            <img src="starimage.jpg" alt="star image"></small>
                            Star
                        </div>
                    </div>
                    </div>
                `
            })
        }   
    })
    .catch(err => console.log(err))
}