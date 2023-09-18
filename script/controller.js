const headlineUs = document.querySelector('.headline-us')
const headlineIN = document.querySelector('.headline-in')
const headlineBusiness = document.querySelector('.headline-business')

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

function markup(article) {}

const createUSTopHeading = async () => {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=fa2f06f253ed42849ef056fbb6f95446'
  )

  const { articles } = await response.json()

  const markup = makeupGenerator(articles)
  headlineUs.innerHTML = ''
  headlineUs.insertAdjacentHTML('afterbegin', markup)
}

createUSTopHeading()

const createINTopHeading = async () => {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?country=in&apiKey=fa2f06f253ed42849ef056fbb6f95446'
  )

  const { articles } = await response.json()

  const markup = makeupGenerator(articles)
  headlineIN.innerHTML = ''
  headlineIN.insertAdjacentHTML('afterbegin', markup)
}

createINTopHeading()

const createBusinessTopHeading = async () => {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fa2f06f253ed42849ef056fbb6f95446'
  )

  const { articles } = await response.json()

  const markup = makeupGenerator(articles)
  headlineBusiness.innerHTML = ''
  headlineBusiness.insertAdjacentHTML('afterbegin', markup)
}

createBusinessTopHeading()
