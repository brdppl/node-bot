const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const env = require('../.env')

module.exports = async (commands, command, arg1, msg) => {
    if (commands.photo.command === command || commands.photo.aliases.includes(command)) {
        const res = await axios.get(`${env.BASE_URL}/oapi/galeria`)
        const embed = new MessageEmbed()
        const data = res.data.data
        let randomItem
        
        if (!arg1) {
            randomItem = data[Math.floor(Math.random()*data.length)]
        } else {
            const playerPhotos = data.filter(el => {
                let nick = el.integrante.split('"')[1].toLowerCase()
                let arg = arg1
                if(arg1 === 'rzao') arg = 'rz4o'
                return nick === arg
            })
            
            if (!playerPhotos.length) {
                msg.channel.send('Digite um nick válido')
                return
            } else {
                randomItem = playerPhotos[Math.floor(Math.random()*playerPhotos.length)]
            }
        }

        embed.setImage(randomItem?.foto)
        msg.channel.send(randomItem?.legenda, embed)
    }
}