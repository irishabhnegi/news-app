const headlineUs = document.querySelector('.headline-us')
const headlineIN = document.querySelector('.headline-in')
const headlineBusiness = document.querySelector('.headline-business')
const headlineSport = document.querySelector('.headline-sports')
const headlineTechnology = document.querySelector('.headline-technology')
const mainContainer = document.querySelector('.main')
const search = document.querySelector('.search-btn')
const searchBar = document.querySelector('#search')

const API_KEY = '27096c532dd54e9a923a6372c5a6ade8'

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

const createUSTopHeading = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  )

  const { articles } = await response.json()

  const markup = makeupGenerator(articles)
  headlineUs.innerHTML = ''
  headlineUs.insertAdjacentHTML('afterbegin', markup)
}

const createINTopHeading = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`
  )

  const { articles } = await response.json()

  const markup = makeupGenerator(articles)
  headlineIN.innerHTML = ''
  headlineIN.insertAdjacentHTML('afterbegin', markup)
}

const createBusinessTopHeading = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${API_KEY}`
  )

  const { articles } = await response.json()

  const markup = makeupGenerator(articles)
  headlineBusiness.innerHTML = ''
  headlineBusiness.insertAdjacentHTML('afterbegin', markup)
}

const createSportsTopHeading = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${API_KEY}`
  )

  const { articles } = await response.json()

  const markup = makeupGenerator(articles)
  headlineSport.innerHTML = ''
  headlineSport.insertAdjacentHTML('afterbegin', markup)
}
const createTechnologyTopHeading = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=${API_KEY}`
  )

  const { articles } = await response.json()

  const markup = makeupGenerator(articles)
  headlineTechnology.innerHTML = ''
  headlineTechnology.insertAdjacentHTML('afterbegin', markup)
}
createINTopHeading()
createUSTopHeading()
createBusinessTopHeading()
createSportsTopHeading()
createTechnologyTopHeading()

search.addEventListener('click', (e) => {
  e.preventDefault()
  let value = searchBar.value

  const loadSearchResult = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${value}&apiKey=${API_KEY}`
    )
    const { articles } = await response.json()
    const markup = makeupGenerator(articles)
    mainContainer.style.display = 'flex'
    mainContainer.style.flexWrap = 'wrap'
    mainContainer.innerHTML = ''
    mainContainer.insertAdjacentHTML('afterbegin', markup)
  }

  loadSearchResult()
})
