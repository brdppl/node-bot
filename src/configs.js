const axios = require('axios')
const env = require('../.env')
const EmojiConvertor = require('emoji-js')

const emoji = new EmojiConvertor()

module.exports = async (commands, command, arg1, prefix, msg) => {
    if (commands.config.command === command || commands.config.aliases.includes(command)) {
        if(!arg1) {
            msg.channel.send(`Este comando requer o nick de um player, digite ${prefix}help para mais informações.`)
        } else {
            const res = await axios.get(`${env.BASE_URL}/oapi/integrantes`)
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
            
            msg.channel.send(`
                Configs de ${player.nick}:
${emoji.replace_colons(':mouse_three_button:')} ${player.config.mouse}
◻️ ${player.config.pad}
${String.fromCodePoint(127911)} ${player.config.headset}
⌨️ ${player.config.keyboard}
${emoji.replace_colons(':desktop:')} ${player.config.screen}
            `)
        }
    }
}