const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const env = require('../.env')

module.exports = async (commands, command, args, arg1, msg) => {
    if (commands.weather.command === command || commands.weather.aliases.includes(command)) {
        const embed = new MessageEmbed()
        embed.type = 'rich'
        embed.setColor('BLUE')

        if (!arg1) {
            msg.channel.send(`Digite o argumento obrigatório, para mais informações digite ${prefix}help`)
            return
        } else {
            let arg = arg1
            if (args.length > 1) arg = args.join('%20').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            
            try {
                const res = await axios.get(`${env.OPEN_WEATHER_BASE_URL}?q=${arg}&units=metric&appid=${env.OPEN_WEATHER_API_KEY}`)
                const data = res.data
                embed.setDescription(`
                    🌡️  **Temperatura em ${data.name}**
                    - Agora: ${Math.round(data.main.temp)}ºC
                    - Sensação térmica: ${Math.round(data.main.feels_like)}ºC
                    - Mínima: ${Math.round(data.main.temp_min)}ºC
                    - Máxima: ${Math.round(data.main.temp_max)}ºC
                    - Barômetro: ${data.main.pressure} mb
                    - Humidade: ${data.main.humidity}%
                    - Visibilidade: ${Number(data.visibility/1000)} km
                `)
            } catch(e) {
                e.response.status === 404 ? msg.channel.send('Cidade não encontrada') : msg.channel.send('Erro na API, tente novamente')
                return
            }
        }

        msg.channel.send(embed)
    }
}