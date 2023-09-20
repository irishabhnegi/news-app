const headlineUs = document.querySelector('.headline-us')
const headlineIN = document.querySelector('.headline-in')
const headlineBusiness = document.querySelector('.headline-business')
const mainContainer = document.querySelector('.main')
const search = document.querySelector('.search-btn')
const searchBar = document.querySelector('#search')

// function createNews() {
//   const mainMarkup = `<section class="top-news-headings">
//             <h1>Top headlines of United States</h1>

//             <div class="media-scroller headline-us"></div>
//           </section>

//           <section class="top-news-headings">
//             <h1>Top headlines of India</h1>

//             <div class="media-scroller headline-in"></div>
//           </section>

//           <section class="top-news-headings">
//             <h1>Top business headlines of United States</h1>

//             <div class="media-scroller headline-business"></div>
//           </section>`
//   mainContainer.innerHTML = ''
//   mainContainer.insertAdjacentHTML('afterbegin', mainMarkup)
//   createNews()
// }

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
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=fa2f06f253ed42849ef056fbb6f95446'
  )

  const { articles } = await response.json()

  const markup = makeupGenerator(articles)
  headlineUs.innerHTML = ''
  headlineUs.insertAdjacentHTML('afterbegin', markup)
}

const createINTopHeading = async () => {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?country=in&apiKey=fa2f06f253ed42849ef056fbb6f95446'
  )

  const { articles } = await response.json()

  const markup = makeupGenerator(articles)
  headlineIN.innerHTML = ''
  headlineIN.insertAdjacentHTML('afterbegin', markup)
}

const createBusinessTopHeading = async () => {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fa2f06f253ed42849ef056fbb6f95446'
  )

  const { articles } = await response.json()

  const markup = makeupGenerator(articles)
  headlineBusiness.innerHTML = ''
  headlineBusiness.insertAdjacentHTML('afterbegin', markup)
}

// searchBtn.addEventListener('click', (e) => {
//   e.preventDefault()
//   console.log(searchBar.value)
// })

createUSTopHeading()
createINTopHeading()
createBusinessTopHeading()

function makeupGenerator2(data) {
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
    const markup = makeupGenerator2(articles)
    mainContainer.innerHTML = ''
    mainContainer.insertAdjacentHTML('afterbegin', markup)
  }

  loadSearchResult()
})
