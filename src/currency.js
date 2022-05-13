const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const env = require('../.env')

module.exports = async (commands, command, arg1, arg2, msg) => {
    if (commands.currency.command === command || commands.currency.aliases.includes(command)) {
        const embed = new MessageEmbed()
        embed.type = 'rich'
        embed.setColor('GOLD')

        if (!arg1) {
            const res = await axios.get(`${env.CURRENCY_CONVERT_BASE_URL}/api/v7/currencies?apiKey=${env.CURRENCY_CONVERT_API_KEY}`)
            const data = res.data
            const arr = []
            for(key in data.results) {
                arr.push(`${key}: ${data.results[key].currencyName}`)
            }
            embed.setDescription(`
                **🪙  Moedas  🪙**

                ${arr.sort().join('\n')}
            `)
        } else {
            try {
                const res = await axios.get(`${env.CURRENCY_CONVERT_BASE_URL}/api/v7/convert?q=${arg1}_${arg2}&apiKey=${env.CURRENCY_CONVERT_API_KEY}`)
                const data = res.data
                const value = Object.keys(data.results).map(el => el)[0]
                embed.setDescription(`
                    **🪙  A conversão de ${data.results[value].fr} para ${data.results[value].to} é: ${data.results[value].val.toLocaleString('pt-BR', { style: 'currency', currency: data.results[value].to })}**
                `)
            } catch(e) {
                msg.channel.send('Erro na API, tente novamente')
                return
            }
        }

        msg.channel.send(embed)
    }
}