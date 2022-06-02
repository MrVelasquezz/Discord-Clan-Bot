const getUser = require('../engine/getUser')
const params = require('../config/params.json')
const embed = require('../engine/embed')
let data_fields = [{
    name: 'Доп. информация:',
    value: 'NULL',
    inline: false
}],
image = 'https://excalibur-craft.ru//engine/ajax/lk/skin3d.php?login=' 
let col = ''


module.exports = async (m, client, ds) => {
    let m_Content = m.content.trim()
    m_Content = m_Content.slice(m_Content.search(/((1){1}[\,\.' ']?)/))
    //console.log(m_Content)
    m_Content = m_Content.replace(/((1|2|3)[\,\.' 'a-zA-Zа-яёА-ЯЁ])/g)
    //console.log(m_Content)
    m_Content = m_Content.split(/undefined/g)
    //console.log(m_Content)
    if (Array.isArray(m_Content) && m_Content.length == 4) {
        if (m_Content[0].length < 2) {
            m_Content.shift()
        }

        //console.log(m_Content[0].trim().split(' ')[1])
        let user_data = await getUser(typeof m_Content[0].trim().split(' ')[1] != 'undefined' && !m_Content[0].trim().split(' ')[1].match(/[а-яёА-ЯЁ]/) ? m_Content[0].trim().split(' ')[1] : m_Content[0].trim().split(' ')[0])
        console.log(await user_data)
        if (typeof await user_data === 'object' && await user_data !== null) {
            if(await user_data.stats.length == 4){
                data_fields = [{
                    name: 'Дата регистрации:',
                    value: user_data.stats[0],
                    inline: true
                },
                {
                    name: 'Всего часов:',
                    value: user_data.stats[2],
                    inline: true
                },
                {
                    name: 'Часов за месяц:',
                    value: user_data.stats[1],
                    inline: true
                },
                {
                    name: 'Статус:',
                    value: user_data.stats[3],
                    inline: true
                },
                {
                    name: 'Должность в клане:',
                    value: user_data.clan,
                    inline: false
                }
            ]
            if(user_data.skin !== null && user_data.skin !== ''){
                image = user_data.skin
            }
            }
        }

        if (params.MIN_AGE <= parseInt(m_Content[1])) {
            col = 'GREEN'
        } else {
            col = 'RED'
        }

        m.channel.send({
            content: `<@${m.author.id}>`,
            embeds: [embed(ds, m.author.username, m_Content, col)
                .addFields(data_fields)
                .setThumbnail(image)
            ]
        })
        .then(() => {
            m.delete()
        })
        .catch((e) => {
            console.error(e)
        })
    }
}