const pup = require('puppeteer')

module.exports = async (uname) => {
    let u = uname
    if(u.length < 3){
        u = ''
    }
    const browser = await pup.launch()
    const page = await browser.newPage()

    await page.setCookie({
        name: 'dle_password',
        value: process.env.pass_hash,
        domain: '.excalibur-craft.ru'
    },
    {
        name: 'dle_user_id',
        value: process.env.user_id,
        domain: '.excalibur-craft.ru'
    })

    await page.goto(`https://excalibur-craft.ru/index.php?do=profile&name=${u}`)

    await page.waitForTimeout(1000)

    let data = await page.evaluate(() => {
        let stats_raw = document.querySelectorAll('#home .row p'),
        clan = document.querySelector('#home .row .col-12 label'),
        skin = document.querySelector("#profile .profile-img "),
        stats = []

        if(stats_raw != null){
            stats_raw.forEach(item => {
                stats.push(item.innerHTML.replace(/(\<(\/?[^>]+)>)/g, ''))
            })
        }
        if(clan != null){
            clan = clan.innerHTML
            clan = clan.replace(/(\<(\/?[^>]+)>)/g, '')
        }
        if(skin != null){
            skin = skin.innerHTML
            skin = skin.split('"')
            skin = skin[1].split(';')
            skin = `https://excalibur-craft.ru/${skin[0]}`
        }
        return {
            stats,
            clan,
            skin
        }
    })
    return data
}
