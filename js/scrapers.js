const puppeteer = require('puppeteer'); //Importando biblioteca do puppeteer

async function scrapeProduct(url){ //trabalhando com promessas async/await
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();  
        await page.setDefaultNavigationTimeout(0); //retirando limite de espera da requisição
        await page.goto(url);

        const [el] = await page.$x('/html/body/div[2]/h2/text()');  //pegando titulo da página HTML
        const txt = await el.getProperty('textContent');
        const subtitle = await txt.jsonValue();

        const [el1] = await page.$x('//*[@id="text-content"]/text()'); //pegando texto da página
        const txt2 = await el1.getProperty('textContent');
        const textContent = await txt2.jsonValue();

        const [el2] = await page.$x('/html/body/div[1]/div/a/img'); //retirando URL da imagem
        const img = await el2.getProperty('src');
        const imgURL = await img.jsonValue();

        //saida no console
        console.log({subtitle, textContent, imgURL});

        browser.close();
    } catch (e) {
        console.error(e);
    }
}

scrapeProduct('http://localhost/index.html'); //Adicionando página que deseja fazer o scraping