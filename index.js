const ds = require('discord.js')
const config = require('./src/config/config.json')
const messageHandler = require('./src/functions/handler')
const embed = require('./src/engine/embed')
const role = require('./src/engine/roleManager')
require('dotenv').config()

const client = new ds.Client({
    intents: [ds.Intents.FLAGS.GUILDS, ds.Intents.FLAGS.GUILD_MESSAGES, ds.Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
})

global.cookie = ''
global.hash = ''

client.login(process.env.TOKEN)

client.once('ready', () => {
    console.log('Logged as ' + client.user.tag)
})

client.on('messageCreate', m =>{
    if(m.channel.permissionsFor(m.guild.me).has('SEND_MESSAGES') && m.channel.permissionsFor(m.guild.me).has('MANAGE_MESSAGES') && m.channel.permissionsFor(m.guild.me).has('ADD_REACTIONS') && m.channel.permissionsFor(m.guild.me).has('VIEW_CHANNEL')){
        if(!m.author.bot){
            messageHandler(m, client, ds)
        }
        else{
            m.react('✅')
            m.react('☑️')
            m.react('❌')
            m.react('🟢')
        }
    }
    else{
        console.log(m.channel.permissionsFor(m.guild.me).has('SEND_MESSAGES'), m.channel.permissionsFor(m.guild.me).has('MANAGE_MESSAGES'), m.channel.permissionsFor(m.guild.me).has('ADD_REACTIONS'), m.channel.permissionsFor(m.guild.me).has('VIEW_CHANNEL'))
    }
})

client.on('messageReactionAdd', async (m, u) => {
    if(m.message.channel.permissionsFor(m.message.guild.me).has('MANAGE_ROLES')){
        if(config.ADMINS.indexOf(parseInt(u.id)) < 0 && !u.bot){
            m.users.remove(u.id)
        }
        else{
            try{
                if(m.count > 1 && m.emoji.name == '✅'){
                    const msg = await m.message.fetch(true)
                    m.message.edit({embeds: [embed(ds, msg.mentions.users.map(user=>user.username), null, 'GREEN', msg.embeds[0].fields, 'Принят').setThumbnail(msg.embeds[0].thumbnail.url)]})
                    m.message.reactions.removeAll()
                    role(m, msg, ['968783911373144075', '965681442162102342'])
                }
                else if(m.count > 1 && m.emoji.name == '☑️'){
                    const msg = await m.message.fetch(true)
                    m.message.edit({embeds: [embed(ds, msg.mentions.users.map(user=>user.username), null, 'BLUE', msg.embeds[0].fields, 'Заключен союз').setThumbnail(msg.embeds[0].thumbnail.url)]})
                    m.message.reactions.removeAll()
                    role(m, msg, ['970768145319071794'])
                }
                else if(m.count > 1 && m.emoji.name == '❌'){
                    const msg = await m.message.fetch(true)
                    m.message.edit({embeds: [embed(ds, msg.mentions.users.map(user=>user.username), null, 'RED', msg.embeds[0].fields, 'Отклонено').setThumbnail(msg.embeds[0].thumbnail.url)]})
                    m.message.reactions.removeAll()
                    role(m, msg, ['965681442162102342'])
                }
                else if(m.count > 1 && m.emoji.name == '🟢'){
                    const msg = await m.message.fetch(true)
                    m.message.edit({embeds: [embed(ds, msg.mentions.users.map(user=>user.username), null, 'YELLOW', msg.embeds[0].fields, 'Добавлен как гость').setThumbnail(msg.embeds[0].thumbnail.url)]})
                    m.message.reactions.removeAll()
                    role(m, msg, ['965681442162102342'])
                }
            }
            catch(e){
                console.error('Error'+e)
            }
        }
    }
    else{
        console.log(m.message.channel.permissionsFor(m.message.guild.me).has('MANAGE_ROLES'))
    }
})