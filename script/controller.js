const parentEl = document.querySelector('#media-scroller')

const createTopHeading = async () => {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=fa2f06f253ed42849ef056fbb6f95446'
  )

  const { articles } = await response.json()
  console.log(articles)

  const markup = articles
    .map((article) => {
      return `
      <div class="scroller-news-container">
              <div class="news-img-info">
              <div class="new-info">
              <h2 class="author">${article.author}</h2>
              <h2 class="date-of-publish">${article.publishedAt.slice(
                0,
                10
              )}</h2>
              </div>
              <a href=${article.url}>
                <img src=${article.urlToImage} alt="news">
              </a>
              </div>
              <p>${article.title}</p>
        </div>
    `
    })
    .join('')
  parentEl.innerHTML = ''
  parentEl.insertAdjacentHTML('afterbegin', markup)
}

createTopHeading()
