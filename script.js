const headlineUs = document.querySelector('.headline-us')
const headlineIN = document.querySelector('.headline-in')
const headlineBusiness = document.querySelector('.headline-business')
const headlineSport = document.querySelector('.headline-sports')
const headlineTechnology = document.querySelector('.headline-technology')
const mainContainer = document.querySelector('.main')
const search = document.querySelector('.search-btn')
const searchBar = document.querySelector('#search')

const catagories = document.querySelector('.catagories')
const topics = document.querySelectorAll('.topic')

const carouselParent = document.querySelector('.carousel')
const API_KEY = '2b727759e7154714bce44f9ad631cf48'

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
                    <img src=${article.urlToImage} alt="">
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

topics.forEach((e) => {
  e.addEventListener('click', () => {
    const topicText = e.innerText

    const loadSearchResult = async () => {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=de&category=${topicText}&apiKey=${API_KEY}`
      )

      const { articles } = await response.json()
      console.log(articles)
      const markup = makeupGenerator(articles)
      mainContainer.style.display = 'flex'
      mainContainer.style.flexWrap = 'wrap'
      mainContainer.innerHTML = ''
      mainContainer.insertAdjacentHTML('afterbegin', markup)
    }

    loadSearchResult()
  })
})

async function carousel() {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=india&sortBy=popularity&apiKey=${API_KEY}`
  )
  // console.log(response)
  const data = await response.json()
  const markup = generateCarouselMarkup(data.articles.slice(0, 20))
  carouselParent.innerHTML = ''
  carouselParent.insertAdjacentHTML('afterbegin', markup)
  const slides = document.querySelectorAll('.slide')

  const carouselBtn = document.querySelectorAll('[data-carousel-button]')

  carouselBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const offset = button.dataset.carouselButton === 'next' ? 1 : -1
      const slides = button
        .closest('[data-carousel]')
        .querySelector('[data-slides]')

      const activeSlide = slides.querySelector('[data-active]')

      let newIndex = [...slides.children].indexOf(activeSlide) + offset

      if (newIndex < 0) newIndex = slides.children.length - 1
      if (newIndex >= slides.children.length) newIndex = 0
      slides.children[newIndex].dataset.active = true
      delete activeSlide.dataset.active
    })
  })
}

carousel()

function generateCarouselMarkup(data) {
  return `
   <button class="carousel-btn prev" data-carousel-button="prev">
            &#8656;
          </button>
          <button class="carousel-btn next" data-carousel-button="next">
            &#8658;
          </button>
           <ul data-slides>
           ${data
             .map((e) => {
               return `
             <li ${getAttribute()} class="slide">
              <img src=${e.urlToImage} alt="img" />

              <p>
                <a href=${e.url} target="_blank">
                 ${e.description}
                </a>
              </p>

              <h2>${e.source.name}</h2>
            </li>
             `
             })
             .join('')}
           </ul>

  `
}
let count = 1

function getAttribute() {
  if (count) {
    count--
    return 'data-active'
  } else {
    return ''
  }
}
