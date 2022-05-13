const axios = require('axios')
const env = require('../.env')

module.exports = async (commands, command, msg) => {
    if (commands.players.command === command || commands.players.aliases.includes(command)) {
        const res = await axios.get(`${env.BASE_URL}/oapi/integrantes`)
        const data = res.data.data
        const nicks = data.map(el => el.nick)

        msg.channel.send('- '+nicks.join('\n- '))
    }
}