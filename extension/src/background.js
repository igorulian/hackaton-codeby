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
    const container = `<div class="accessibilityContainer" style="display: flex; align-items: cemter;" aria-label="Container dos selos de acessibilidade"> </div>`
    element.parentElement.parentElement.insertAdjacentHTML('beforeend', container)
    const {libras, colorblind, imageDescription, checkKeyBoardNavigation} = score
    const librasSpan = `<div tabindex="0" title="Essa página possui suporte para libras" aria-label="Essa página possui suporte para libras" class="score"> <img alt="Essa página possui suporte para libras" class="score-image" src="https://i.ibb.co/BNdn8gd/libras.png"/> </div>`
    const colorblindSpan = `<div title="Essa página possui suporte para daltonismo" aria-label="Essa página possui suporte para daltonismo" class="score"> <img alt="Essa página possui suporte para daltonismo" class="score-image" src="https://i.ibb.co/28jmkW6/daltonismo.png"/> </div>`
    const imageDescriptionSpan = `<div title="Essa página permite a navegação pelo leitor de texto" aria-label="Essa página permite a navegação pelo leitor de texto" class="score"> <img alt="Essa página permite a navegação pelo leitor de texto" class="score-image" src="https://i.ibb.co/cyf7jnq/visual.png"/> </div>`
    const KeyBoardNavigationSpan = `<div title="Essa página possui navegação por teclado" aria-label="Essa página possui navegação por teclado" class="score"> <img alt="Essa página possui navegação por teclado" class="score-image" src="https://i.ibb.co/zFFD86z/teclado.png"/> </div>`
    
    if(libras)
      element.parentElement.parentElement.querySelector('.accessibilityContainer').insertAdjacentHTML('beforeend', librasSpan)
    
    if(colorblind)
      element.parentElement.parentElement.querySelector('.accessibilityContainer').insertAdjacentHTML('beforeend', colorblindSpan)
  
    if(imageDescription)
      element.parentElement.parentElement.querySelector('.accessibilityContainer').insertAdjacentHTML('beforeend', imageDescriptionSpan)
  
    if(!KeyBoardNavigationSpan) // acho que ! é melhor n sei to com sono
      element.parentElement.parentElement.querySelector('.accessibilityContainer').insertAdjacentHTML('beforeend', KeyBoardNavigationSpan)
}

async function getAccesilibityData(site){
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
    return data
  }catch{
    console.log("Erro ao buscar data")
    return null
  }
}

start()
