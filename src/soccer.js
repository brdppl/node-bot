const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const axios = require('axios')
const env = require('../.env')

module.exports = async (commands, command, arg1, msg) => {
    if (commands.soccer.command === command || commands.soccer.aliases.includes(command)) {
        const embed = new MessageEmbed()
        embed.type = 'rich'
        embed.setColor('GREEN')
        const headers = {
            'X-Auth-Token': env.FOOTBALL_DATA_API_KEY
        }

        if(!arg1) {
            embed.setDescription(`
                **⚽ CAMPEONATOS ⚽**

                **- WC:** FIFA World Cup
                **- CL:** UEFA Champions League
                **- BL1:** Bundesliga
                **- DED:** Eredivisie
                **- BSA:** Campeonato Brasileiro Série A
                **- PD:** Primera Division
                **- FL1:** Ligue 1
                **- ELC:** Championship
                **- PPL:** Primeira Liga
                **- EC:** European Championship
                **- SA:** Serie A
                **- PL:** Premier League
                **- CLI:** Copa Libertadores
            `)
        } else {
            try {
                const res = await axios.get(`${env.FOOTBALL_DATA_BASE_URL}/competitions`)
                const data = res.data
                const competition = data.competitions.filter(el => el.code?.toLowerCase() === arg1)[0]

                const last7days = moment().subtract(7, 'd').format('YYYY-MM-DD')
                const next7days = moment().add(7, 'd').format('YYYY-MM-DD')

                const competitionRes = await axios({
                    method: 'get',
                    url: `${env.FOOTBALL_DATA_BASE_URL}/competitions/${competition.id}/matches?dateFrom=${last7days}&dateTo=${next7days}`,
                    headers
                })
                const competitionData = competitionRes.data
                const results = []

                for(let match of competitionData.matches) {
                    results.push({
                        homeTeam: match.homeTeam.name,
                        homeTeamScore: match.score.fullTime.homeTeam,
                        awayTeam: match.awayTeam.name,
                        awayTeamScore: match.score.fullTime.awayTeam,
                        date: match.utcDate
                    })
                }
                const arr = []
                for(let result of results) {
                    arr.push(`- ${result.homeTeam} ${result.homeTeamScore !== null ? '**'+result.homeTeamScore+'**' : ''} x ${result.awayTeamScore !== null ? '**'+result.awayTeamScore+'**' : ''} ${result.awayTeam} (${moment(result.date).format('DD/MM/YYYY')})`)
                }
                embed.setDescription(arr.length ? arr.join('\n') : `Não tem jogos no intervalo de datas ${moment(last7days).format('DD/MM/YYYY')} - ${moment(next7days).format('DD/MM/YYYY')}`)
            } catch(e) {
                console.log('error', e)
                msg.channel.send('Erro na API, tente novamente')
                return
            }
        }

        msg.channel.send(embed)
    }
}