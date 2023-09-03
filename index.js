const navBar = document.getElementById("nav-bar");
const checkBox = document.getElementById("checkbox");
const container = document.getElementById("container");
const sun = document.getElementById("sun");

checkBox.addEventListener("click", () => {
    container.classList.toggle("dark");
    navBar.classList.toggle("toggle-btn-dark");
    
    if(checkBox.checked){
        sun.classList.remove("bxs-sun");
        sun.classList.add("bx-moon");
    }else{
        sun.classList.remove("bx-moon");
        sun.classList.add("bxs-sun");
    }
});



const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("search-btn");
const holderEl = document.getElementById("holder");
const loadingEl = document.getElementById("loading");

const generatedProfile = (profile) => {
    return (
        `<div id="profileContainer">
            <div class="profile-box" id="profile-box">
                <div class="top-section">
                    <div class="left">
                        <div class="avatar">
                            <button id="avatar-btn">
                                <img src="${profile.avatar_url}" alt="Github-avatar">
                            </button>
                        </div>
                        <div class="self">
                            <span class="name">${profile.name}</span>
                            <span class="user-name">@${profile.login}</span>
                        </div>
                    </div>
                    <a href= "${profile.html_url}">
                        <button class="primary-btn" id="chck-prfl-btn">Check Profile</button>
                    </a>
                </div>

                <div class="about">
                    <h2>About</h2>
                    <p>${profile.bio}</p>
                </div>

                <div class="status">
                    <div class="status-item">
                        <h3>Followers</h3>
                        <p>${profile.followers}</p>
                    </div>
                    <div class="status-item">
                        <h3>Following</h3>
                        <p>${profile.following}</p>
                    </div>
                    <div class="status-item">
                        <h3>Repos</h3>
                        <p>${profile.public_repos}</p>
                    </div>
                </div>
                
            </div>
            <div class="social-media">
                <a href="https://www.linkedin.com/in/soumya-%F0%9F%99%82-874085221/"><i class='bx bxl-linkedin' ></i></a>
                <a href="${profile}"><i class='bx bxl-twitter' ></i></a>
                <a href="https://www.facebook.com/profile.php?id=100013009510929"><i class='bx bxl-facebook-circle' ></i></a>
                <a href="https://www.instagram.com/soumya_s_das/"><i class='bx bxl-instagram' ></i></a>
            </div>
        </div>`
    );
};

const fetchProfile = async () => {
    // const userName = 'Soumya-0x000'; 
    const userName = searchInputEl.value; 

    loadingEl.innerText = "Loading....."
    loadingEl.style.color = "Black";
    
    try {
        const response = await fetch(`${url}/${userName}`);
        const data = await response.json();

        if(data.bio) {
            loadingEl.innerText = "";
            holderEl.innerHTML = generatedProfile(data);
        } else {
            loadingEl.innerHTML = data.message;
            loadingEl.style.color = "red";
            holderEl.innerText = "";
        }
        console.log(data); 
    } catch (error) {
        console.error({error});
        loadingEl.innerText = "";
    }
};

searchBtnEl.addEventListener("click", fetchProfile);
