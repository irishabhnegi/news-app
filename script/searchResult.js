const search = document.querySelector('.search-anchor')
const searchBar = document.querySelector('#search')

const sectionGrid = document.querySelector('.section-grid')
// const searchBtn = document.querySelector('#submit-btn')

function makeupGenerator(data) {
  return data
    .map((article) => {
      return `
      <div class="scroller-news-container">
              <div class="news-img-info">
              <div class="new-info">
              <h2 class="author">${article.source.name}</h2>
              <h2 class="date-of-publish">${article.publishedAt.slice(
                0,
                10
              )}</h2>
              </div>
              <a href=${article.url} target="_blank">
                <img src=${article.urlToImage} alt="news">
              </a>
              </div>

              <p>${article.title}</p>
        </div>
    `
    })
    .join('')
}

search.addEventListener('click', (e) => {
  e.preventDefault()
  let value = searchBar.value

  const loadSearchResult = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${value}&apiKey=fa2f06f253ed42849ef056fbb6f95446`
    )
    const { articles } = await response.json()
    const markup = makeupGenerator(articles)
    sectionGrid.innerHTML = ''
    sectionGrid.insertAdjacentHTML('afterbegin', markup)
  }

  loadSearchResult()
})
