const loadingElement = `
  <div>
    <p> loading </p>
  </div>
`; // verificar se possui libras, vendo de tem 	https://vlibras.gov.br no innertml da página

// daltonismo
// libras
// se tem zoom, alguma coisa coisa

function start() {
  const scores = [4.1, 0, 4.2, 3, 4, 5, 6.1]; //Será retornado do fetch
  const links = getPageLinks();
  // const scores = links.for
  const headers = document.querySelectorAll("a h3");
  const scoresMounted = mountScore(scores);
  insertScore(headers, scoresMounted);
  getScore();
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

function getPageLinks() {
  const links = document.querySelectorAll("a h3");
  return links.forEach((link) => {
    if (!link) return;

    const url = link.parentElement.href;

    if (!url) return;
  });
}

function insertScore(headers, ranks) {
  for (let index = 0; index < ranks.length; index++) {
    headers[index].innerHTML += ranks[index];
  }
}

function mountScore(scores) {
  scores.forEach((score) => {
    `<span aria-label="score-${score}" class="score">${score}</span>`;
  });
  return scores
}

start();
