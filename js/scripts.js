let formEle = document.querySelector("#search-form");
let userNamEle = document.querySelector("#username");
let langSection = document.querySelector(".lang");
let searchItemEle = document.querySelector("#seacrh-item");
let repoSection = document.querySelector("#repos");

formEle.addEventListener("submit", formSubmitHandler);
langSection.addEventListener("click", handelLangRepos);

function handelLangRepos(e) {
  let lang = e.target.getAttribute("data-lng");
  let url = `https://api.github.com/search/repositories?q=${lang}`;
  fetchRepos(url, lang);
}

function formSubmitHandler(e) {
  e.preventDefault();

  let userName = userNamEle.value.trim();
  let url = `https://api.github.com/users/${userName}/repos`;
  if (userName) {
    fetchRepos(url, userName);
  } else {
    alert("please enter user name");
  }
}

function fetchRepos(url, searchPattern) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => renderRepos(data, searchPattern))
    .catch((error) => console.log(error));
}

function renderRepos(data, searchPattern) {
  repoSection.innerHTML = "";
  searchItemEle.innerHTML = searchPattern;

  if (data.hasOwnProperty("total_count")) {
    data = data.items;
  }

  data.forEach((element) => {
    repoSection.innerHTML += `
        <a href="${element.clone_url}" target="_blank" class="repo-item">
            <span class="item-name">${element.owner.login} / ${element.name}</span>
            <span class="item-issues">${element.open_issues_count} issues</span>
        </a>
        `;
  });
}

