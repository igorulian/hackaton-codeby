import axios from "axios";

const headers = {
    "Host": "accessmonitor.acessibilidade.gov.pt",
    "Connection": "keep-alive",
    "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
    "Accept": "application/json, text/plain, */*",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://accessmonitor.acessibilidade.gov.pt/results/https:%2F%2Fcodeby.com.br",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7",
}

export async function requestData(site){
    try{
        site = site.replace('://', '%3A%2F%2F')
        const url = `https://accessmonitor.acessibilidade.gov.pt/api/amp/eval/${site}`
        const {data} = await axios.get(url, {headers: headers})

        const {pagecode} = data.result

        const haslibras = pagecode.includes('vlibras.gov.br')

        return {haslibras, ...data}
    }catch(error){
        console.log("Erro ao buscar do source", error.response.data)
        return null
    }
}