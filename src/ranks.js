const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const env = require('../.env')

module.exports = async (commands, command, arg1, prefix, msg) => {
    if (commands.rank.command === command || commands.rank.aliases.includes(command)) {
        if(!arg1) {
            msg.channel.send(`Este comando requer o nick de um player, digite ${prefix}help para mais informações.`)
        } else {
            const res = await axios.get(`${env.BASE_URL}/oapi/integrantes`)
            const embed = new MessageEmbed()
            const data = res.data.data
            const player = data.filter(el => {
                let nick = el.nick.toLowerCase()
                let arg = arg1
                if(arg1 === 'rzao') arg = 'rz4o'
                return nick === arg
            })[0]

            if (!player) {
                msg.channel.send('Digite um nick válido')
                return
            }

            embed.setImage(`https://clanpauamarelo.com.br/assets/img/ranks/${player.sobre.patente}.png`)
            msg.channel.send(`${player.nick} é:`, embed)
        }
    }
}