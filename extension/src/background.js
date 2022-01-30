async function start() {
  // const scores = links.for
  const headers = document.querySelectorAll("a h3, a [aria-level='3']")
  const links = getPageLinks(headers)
  /*   const scores = await Promise.all(links.forEach(async link => {
      if(link === undefined) return
      return await getScore(link)
    })) */
  const scores = await getScore(links[0])
  console.log(scores)
  // const scoresMounted = mountScores(scores)
  // insertScores(headers, scoresMounted)
}

async function getScore(rawurl) {
  let site = rawurl.replace('://', '%3A%2F%2F')
  site = site.replaceAll('/', '%2F')

  const url = `https://cors-anywhere.herokuapp.com/https://hackaton-uranianos.herokuapp.com/api/accessibility/${site}`
  console.log("url", url)
  try {
    const rawResponse = await fetch(url, { method: "GET" })
    console.log("rawResponse", rawResponse)
    return await rawResponse.json()
  } catch (error) {
    console.log(error)
  }
}

function getPageLinks(headers) {
  const links = []
  headers.forEach(header => {
    links.push(getParentNodeLink(header))
  });
  return links
}

function getParentNodeLink(link) {
  if (link.parentNode.localName == "a") {
    return link.parentNode.href
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
