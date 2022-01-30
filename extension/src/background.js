async function start() {
  const headers = document.querySelectorAll("a h3, a [aria-level='3']")

  headers.forEach(async element => {
    if(!element || element === undefined) return

    const site = getParentNodeLink(element)
    if(!site) return

    const data =  await getAccesilibityData(site)
    if(!data) return

    mountScores(element, data)
  })
}

function getPageLinks(headers) {
  const links = []
  headers.forEach(header => {
    links.push(getParentNodeLink(header))
  });
  return links
}

function getParentNodeLink(element) {
  if(!element.parentElement) return

  if(element.parentElement.tagName === 'A'){
    return element.parentElement.href
  }else{
    return null
  }
}

function mountScores(element, score) {
    const scoreSpan = `<div aria-label="avaliação dessa página é ${score.imageDescription}" class="score">${score.imageDescription}</div>`
    element.parentElement.parentElement.insertAdjacentHTML('beforeend', scoreSpan)
}

async function getAccesilibityData(site){
  console.log('site')
  console.log(site)
  // const url = 'http://localhost:3000/api/accessibility'
  const url = 'https://hackaton-uranianos.herokuapp.com/api/accessibility'

  try{
    const response = await fetch(url,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        site: site
      })
    })
    const data = await response.json()
    console.log(data)
    return data
  }catch{
    console.log("Erro ao buscar data")
    return null
  }
}

start()
