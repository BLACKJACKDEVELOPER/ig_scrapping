const ppt = require('puppeteer')
const download = require('download');


// grap data to api

async function main(ppt) {
    const browser = await ppt.launch({
        headless: true
    })
    // go to URL destination
    const page = await browser.newPage()
    await page.goto('https://www.instagram.com/tonkla_jh37/', {
        waitUntil: 'networkidle0'
    })
    //x1iyjqo2
    let more
    try {
        more = await page.waitForXPath('/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[2]/section/main/div/div[2]/div[1]/div/button')
    } catch (e) {
        more = await page.waitForXPath('/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[2]/section/main/div/div[3]/div[1]/div/button')
    }
    await more.click()
    await page.waitForTimeout(2000)




    // load more
    while (true) {
        let box
        try {
            box = await page.waitForXPath('/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[2]/section/main/div/div[3]/article/div/div')
        } catch (e) {
            box = await page.waitForXPath('/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[2]/section/main/div/div[2]/article/div/div')
        }
        const items = await box.$$('._ac7v')
        await page.mouse.wheel({ deltaY: 1000 });
        const login = await page.$x('/html/body/div[2]/div/div/div[3]/div/div')
        if (login[0]) {
            await page.evaluate(el => el.remove(), login[0])
        }
        // loop pass in each items
        for (const item of items) {
            const listsDeep = await item.$$('._aabd')
            for (const div of listsDeep) {
                await page.waitForTimeout(1000)
                const img = await (await (await (await div.$('[role="link"]')).$('._aagu')).$('._aagv')).$('img')
                const src = await page.evaluate(el => el.src, img)
                download(src, './api').then(() => {
                    console.log(`>> Download : BYTE ${Math.floor(Math.random() * 1000000)} : Completed <<`);
                })
            }
        }

    }




}

main(ppt)