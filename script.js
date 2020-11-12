const baseUrl = "https://api.github.com/graphql"
const githubInfo = {
    "token": "019e036f078a0cd60b8553c45edd8c90f4794869",
    "username": "jelhill"
}
const headers = {
    "Content-Type": "application/json",
    Authentication:  "Bearer " + githubInfo["token"]
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
                createdAt
              }
            }
          }
        }
      }`
}

document.addEventListener("DOMContentLoaded", getRepo)


function duration(updated_at){
    updated_at = new Date(checkin.split("T").join(" ").split("Z")[0]).getTime()
    let now = Date.now()
    let seconds = (now - checkin)/1000
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
            document.getElementById("avatar-div").innerHTML = `<img src="${jsonRes.avatar_url}" alt="">`
        }
    })
    .catch(err => console.log(err))


    // fetch("https://api.github.com/users/jelhill/repos")
    // .then(response => response.json())
    // .then(jsonResponse => {
    //     console.log(jsonResponse)
    //     if (jsonResponse.length) {
    //         // document.getElementById("avatar-div").innerHTML = `<img src="${}" alt="">`
    //         document.getElementById("projectWrapper").innerHTML = 
    //         jsonResponse.slice(0, 20).map((repo) => {
    //             return `
    //             <div class="project-wrapper" id="projectWrapper">
    //                 <div class="project-div">
    //                     <div class="project-name">
    //                         <a href="">${repo.name}</a>
    //                         ${repo.private ? null : "<span>Private</span>"}
    //                     </div>
    //                     <div class="lang-div">
    //                         <div class="lang-color"></div>
    //                         <span>JavaScript</span>
    //                         <span>Updated ${duration(repo.created_at)}</span>
    //                     </div>
    //                 </div>

    //                 <div class="star-div">
    //                     <div class="star-btn">
    //                         <small></small><img src="starimage.jpg" alt="star image"></small>
    //                         Star
    //                     </div>
    //                 </div>
    //                 </div>
    //             `
    //         })
    //     }
    // })
    // .catch(error => console.log(error))
}