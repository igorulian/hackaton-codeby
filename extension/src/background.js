
// verificar se possui libras, vendo de tem 	https://vlibras.gov.br no innertml da página

// daltonismo
// libras
// se tem zoom, alguma coisa coisa

function start() {
  const scores = [1.1,2.2,3.3,4.4,5.5,6.6,7.7,8.8,9.9]; //Será retornado do fetch
  // const scores = links.for
  const headers = document.querySelectorAll("a h3, a [aria-level='3']");
  const links = getPageLinks(headers);
  const scoresMounted = mountScores(scores);
  insertScores(headers, scoresMounted);
  // getScore();
}

async function getScore() {
  const site = "https%3A%2F%2Fwww.ajplace.com.br%2F";
  const url = `https://accessmonitor.acessibilidade.gov.pt/api/amp/eval/${site}`;
  const header = {
    Host: "accessmonitor.acessibilidade.gov.pt",
    Connection: "keep-alive",
    "sec-ch-ua":
      '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
    Accept: "application/json, text/plain, */*",
    "sec-ch-ua-mobile": "?0",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    "sec-ch-ua-platform": '"Windows"',
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    Referer:
      "https://accessmonitor.acessibilidade.gov.pt/results/https:%2F%2Fcodeby.com.br",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    Cookie:
      "_ga=GA1.3.1300002416.1643466078; _gid=GA1.3.132998371.1643466078; _gat_gtag_UA_35831726_11=1",
  };
  try {
    const rawResponse = await fetch(url, {
      headers: header,
    });
    const response = await rawResponse.json();
    return response.result.data.score
  } catch (error) {
    console.log(error);
  }
}

function getPageLinks(headers) {
  return headers.forEach(link => getParentNodeLink(link));
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
    headers[index].parentNode.innerHTML += scores[index];
  }
}

function mountScores(scoresMounted) {
  return scoresMounted.map((score) => {
    const scoreSpan = `<div aria-label="avaliação dessa página é ${score}" class="score">${score}</div>`;
    return scoreSpan
  });
}

start();
