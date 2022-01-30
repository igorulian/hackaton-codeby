async function start() {
  // const scores = links.for
  const headers = document.querySelectorAll("a h3, a [aria-level='3']")
  const links = getPageLinks(headers)
  console.log(links)
  const scores = await Promise.all(links.forEach(async link => {
    return await getScore(link)
  }))
  console.log(scores)
  // const scoresMounted = mountScores(scores)
  // insertScores(headers, scoresMounted)
}

async function getScore(rawurl) {
  let site = rawurl.replace('://', '%3A%2F%2F')
  site = site.replaceAll('/', '%2F')

  const url = `https://hackaton-uranianos.herokuapp.com/api/accessibility/${site}`
  try {
    const rawResponse = await fetch(url)
    const response = await rawResponse.json()
    return response
  } catch (error) {
    console.log(error)
  }
}

function getPageLinks(headers) {
  return headers.forEach(link => getParentNodeLink(link))
}

function getParentNodeLink(link) {
  if(link.parentNode.localName == "a") {
    return link.parentNode
  } else {
    getParentNodeLink(link.parentNode)
  }
}

function insertScores(headers, scores) {
  for (let index = 0; index < scores.length; index++) {
    headers[index].parentNode.innerHTML += scores[index]
  }
}

function mountScores(scoresMounted) {
  return scoresMounted.map((score) => {
    const scoreSpan = `<div aria-label="avaliação dessa página é ${score}" class="score">${score}</div>`
    return scoreSpan
  });
}

start()
