const parentEl = document.querySelector('#media-scroller')
async function get() {
  let data = await fetch(
    ' https://newsapi.org/v2/everything?q=tesla&from=2023-08-17&sortBy=publishedAt&apiKey=fa2f06f253ed42849ef056fbb6f95446'
  )

  let pure = await data.json()
  let dataMain = pure.articles[1]

  let state = {
    author: dataMain.author,
    title: dataMain.title,
    image: dataMain.urlToImage,
  }

  console.log(pure.articles[1])
  console.log(state)

  let markup = `
      <div class="scroller-news-container">
                <div class="news-img-info">
                        <img src=${state.image} alt="news">
                        <div class="new-info">
                            <h2 class="author">${state.author}</h2>
                            <h2 class="date-of-publish">12-03-12</h2>
                        </div>
                    </div>


                    <p>${state.title}</p>
                </div> `

  parentEl.insertAdjacentHTML('afterbegin', markup)
}

get()
