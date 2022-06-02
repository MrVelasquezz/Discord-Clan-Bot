let f = []
module.exports = (ds, user, content, col, fields, descr) => {
    let name = '',
    nick = ''
    
    if(content != null){
        let c = content[0].trim().split(' ')
        if(content[0].trim().match(' ')){
            if(c[0].match(/[а-яёА-ЯЁ]/) && c[1].match(/[a-zA-Z0-9]/)){
                name = c[0]
                nick = c[1]
            }
            else if(c[0].match(/[a-zA-Z0-9]/) && c[1].match(/[а-яёА-ЯЁ]/)){
                name = c[1]
                nick = c[0]
            }
            else{
                name = c[0]
                nick = c[1]
            }
        }
        else{
            if(c[0].match(/[а-яёА-ЯЁ]/)){
                name = c[0],
                nick = 'NULL'
            }
            else{
                name = 'NULL',
                nick = c[0]
            }
            
        }
    }
    if(content != null){
        f = [{
            name: 'Имя:',
            value: name,
            inline: true
        },
        {
            name: 'Никнейм:',
            value: nick,
            inline: true
        },
        {
            name: 'Возраст:',
            value: content[1].trim(),
            inline: true
        },
        {
            name: 'Цель:',
            value: content[2].trim(),
            inline: false
        }]
    }
    else{
        f = fields
    }
    return new ds.MessageEmbed({
        title: `Заявка от ${user}`,
        description: `Статус: ${!descr ? 'На рассмотрении' : descr}`,
        fields: f,
        footer: {text:`${!descr ? 'Ваша заявка будет рассмотрена в близжайшее время. Пожалуйста, будьте терпеливы.' : 'Добро пожаловать!'}`},
        color: col
    })
}