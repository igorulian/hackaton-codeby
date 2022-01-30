import axios from "axios"

const header = (url) => ({
    Host: url
})

function checkLibras(content){
    content = content.toString()
    return content.includes('vlibras.gov.br')
}

function checkColorBlind(content){
    return false
}

function checkImageDescription(content){
    const images = (content.split('<img').length - 1)
    const alts = (content.split('alt=').length - 1)
    console.log(images,alts)
    return (alts >= images)
}

function checkKeyBoardNavigation(content){
    const tabindexs = (content.split('tabindex=').length - 1)
    const elements = ((content.split('<').length - 1) /2 )
    console.log(tabindexs, elements)
    return (tabindexs >= elements)
}

export async function requestData(site){
    try{
        site = site.toString()
        console.log('site', site)
        site = site.replace('/:/g', '%3A')
        site = site.replace('///g', '%2F')
        const {data:content} = await axios.get(`${site}`, {Headers: {header: header(site)}})

        const response = {
            libras: checkLibras(content),
            colorblind: checkColorBlind(content),
            imageDescription: checkImageDescription(content),
            checkKeyBoardNavigation: checkKeyBoardNavigation(content)
        }
        
        console.log(response)
        return response
    }catch(error){
        console.log('erro ao fazer request para api')
        console.log(error.response.data)
        return null
    }
}