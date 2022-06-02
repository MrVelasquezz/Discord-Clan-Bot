const params = require('../config/params.json')
const config = require('../config/config.json')
const qs = require('qs')
const axios = require('axios')
const url = 'https://excalibur-craft.ru/engine/ajax/profile/ajax.php'

module.exports = async (u_name) => {
    const data = qs.stringify({
        action: 'loadProfile',
        user_id: '796545',
        hash: hash,
        name: u_name.toLowerCase()
    })
    try {
        if(hash.length > 5 && cookie.length > 5){
            let content = await axios({
                method: 'post',
                url: url,
                headers: {
                    'Host': 'excalibur-craft.ru',
                    'Cookie': cookie,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': 77 + u_name.length,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
                },
                data: data
            })
            //console.log(content)
            if (content.status === 200 && content.data.data) {
                let u_data = content.data.data.replace(/(\<(\/?[^>]+)>)/g, '').match(/[a-zA-Z0-9\-]+/g)
                console.log(u_data)
                return u_data
            }
        }
    } catch (e) {
        console.log(e)
    }
}