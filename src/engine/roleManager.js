module.exports = (m, msg, role) => {
    let usr = m.message.guild.members.cache.find(user => user.id === m.message.mentions.users.map(user => user.id)[0])
    usr.roles.add(role)
}