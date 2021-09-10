const { Client, MessageEmbed } = require('discord.js')
const env = require('./.env')
const axios = require('axios')
const EmojiConvertor = require('emoji-js')
const commands = require('./src/commands')
const store = require('store')

const client = new Client()
const emoji = new EmojiConvertor()

const prefix = '!'

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
    if (msg.author.bot) return
    if (!msg.content.startsWith(prefix)) return

    const commandBody = msg.content.slice(prefix.length)
    const args = commandBody.split(' ')
    const command = args.shift().toLowerCase()
    const arg1 = args.length ? args[0]?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : ''
    const arg2 = args.length ? args[1]?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : ''

    // HELP
    if (commands.help.command === command || commands.help.aliases.includes(command)) {
        let description
        const embed = new MessageEmbed()
        embed.type = 'rich'
        embed.setColor('GREEN')

        if (!arg1) {
            const arr = []
            Object.keys(commands).forEach(key => {
                arr.push(`**${prefix}${commands[key].command}${commands[key].args.list.length ? ' <'+commands[key].args.list.join('|')+'>' : ''}:** ${commands[key].description}`)
            })
            description = `
                **Lista de comandos**

                ${arr.join('\n')}
            `
        } else {
            Object.keys(commands).forEach(key => {
                if (commands[key].command === arg1) {
                    description = `
                        ${prefix}${commands[key].aliases.length ? '['+commands[key].command+'|'+commands[key].aliases.join('|')+']' : commands[key].command} ${commands[key].args.list.length ? '<'+commands[key].args.list.join('|')+'>' : ''}

                        ${commands[key].description}

                        ${commands[key].args.list.length ? (commands[key].args.required ? '' : 'Obs.: O argumento <'+commands[key].args.list.join('|')+'> é opcional') : ''}
                    `
                } else {
                    commands[key].aliases.forEach(el => {
                        if (arg1 === el) {
                            description = `
                                ${prefix}[${commands[key].command}|${commands[key].aliases.join('|')}] ${commands[key].args.list.length ? '<'+commands[key].args.list.join('|')+'>' : ''}
                                    
                                ${commands[key].description}

                                ${commands[key].args.list.length ? (commands[key].args.required ? '' : 'Obs.: O argumento <'+commands[key].args.list.join('|')+'> é opcional') : ''}
                            `
                        }
                    })
                }
            })
        }

        embed.setDescription(description)
        msg.channel.send(embed)
    }

    // FOTO
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

    // PATENTE
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

            embed.setImage(`http://clanpauamarelo.com/assets/img/ranks/${player.sobre.patente}.png`)
            msg.channel.send(`${player.nick} é:`, embed)
        }
    }

    // SOBRE
    if (commands.about.command === command || commands.about.aliases.includes(command)) {
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
                Sobre ${player.nick}:
- Função: ${player.sobre.funcao}
- Mapa: ${player.sobre.mapa}
- Armas: ${player.sobre.armas.join(', ')}
- Amigão: ${player.sobre.amigao}
- Características: ${player.sobre.caracteristicas.join(', ')}
- Carreira: ${player.sobre.carreira}
            `)
        }
    }

    // CONFIGS
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

    // CURIOSIDADES
    if (commands.curiosities.command === command || commands.curiosities.aliases.includes(command)) {
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
                Curiosidades sobre ${player.nick}:
${player.curiosidades}
            `)
        }
    }

    // PLAYERS
    if (commands.players.command === command || commands.players.aliases.includes(command)) {
        const res = await axios.get(`${env.BASE_URL}/oapi/integrantes`)
        const data = res.data.data
        const nicks = data.map(el => el.nick)

        msg.channel.send('- '+nicks.join('\n- '))
    }

    // GAY
    if (commands.gay.command === command || commands.gay.aliases.includes(command)) {
        const { id } = msg.author
        let value
        if (store.get(id)?.gay) {
            value = store.get(id).gay
        } else {
            const randomValue = Math.floor(Math.random()*100)
            value = randomValue
            store.set(id, { gay: randomValue })

            setTimeout(() => {
                store.remove(id)
            }, 7200000)
        }

        msg.reply(`você está ${value}% gay hoje  ${emoji.replace_colons(':rainbow_flag:')}`)

        if (value >= 20 && value < 40) {
            msg.channel.send('Tá começando a gostar da coisa')   
        } else if(value >= 40 && value < 70) {
            msg.channel.send('Já abriu a porta do armário pra dar uma espiada  👀')
        } else if(value >= 70 && value < 95) {
            msg.channel.send('Sai de cima da piça do pai do ido  🍆')
        } else if(value >= 95) {
            msg.channel.send(`O Sifão de Tomé fica pra lá  👉👉👉`)
        } else {
            msg.channel.send('Hoje tá comedido')
        }
    }

    // PAU
    if (commands.cock.command === command || commands.cock.aliases.includes(command)) {
        const { id } = msg.author
        let value
        if (store.get(id+'cockhash')?.cock) {
            value = store.get(id+'cockhash').cock
        } else {
            const randomValue = Math.floor(Math.random()*30)
            value = randomValue
            store.set(id+'cockhash', { cock: randomValue })

            setTimeout(() => {
                store.remove(id+'cockhash')
            }, 7200000)
        }

        msg.reply(`tem ${value}cm de  🍆`)

        if (value >= 5 && value < 12) {
            msg.channel.send('Tá na média do PAU AMARELO')   
        } else if(value >= 12 && value < 18) {
            msg.channel.send('Privilegiado')
        } else if(value >= 18 && value < 25) {
            msg.channel.send('O pai do ido aguenta rindo  🤗🤗')
        } else if(value >= 25) {
            msg.channel.send(`👉👉👉  Esse cara tem o Sifão de Tomé  👈👈👈`)
        } else {
            msg.channel.send('Já pensou em fazer uma vaginoplastia?')
        }
    }

    // MATCH
    if (commands.match.command === command || commands.match.aliases.includes(command)) {
        const { members } = msg.mentions
        const embed = new MessageEmbed()
        const randomValue = Math.floor(Math.random()*100)
        let phrase

        if (randomValue >= 0 && randomValue < 15) {
            embed.setImage('https://res.cloudinary.com/dlbgx94ux/image/upload/v1631230195/galeria/1631230194707-1631230191264-image.jpg')
            phrase = 'Vão passar frio essa noite, assim como nosso awper'
        } else if(randomValue >= 15 && randomValue < 30) {
            embed.setImage('https://res.cloudinary.com/dlbgx94ux/image/upload/v1631230219/galeria/1631230219495-1631230216057-image.jpg')
            phrase = 'ldo reproves'
        } else if(randomValue >= 30 && randomValue < 50) {
            embed.setImage('https://res.cloudinary.com/dlbgx94ux/image/upload/v1631230208/galeria/1631230208222-1631230204779-image.jpg')
            phrase = 'Foi por pouco, quebraram a cara igual o amigão'
        } else if(randomValue >= 50 && randomValue < 63) {
            embed.setImage('https://res.cloudinary.com/dlbgx94ux/image/upload/v1631230153/galeria/1631230153361-1631230149907-image.jpg')
            phrase = 'ldo approves'
        } else if(randomValue >= 63 && randomValue < 75) {
            embed.setImage('https://res.cloudinary.com/dlbgx94ux/image/upload/v1631230213/galeria/1631230213937-1631230210485-image.jpg')
            phrase = 'Confia'
        } else if(randomValue >= 75 && randomValue < 90) {
            embed.setImage('https://res.cloudinary.com/dlbgx94ux/image/upload/v1631230201/galeria/1631230201179-1631230197743-image.jpg')
            phrase = 'Isso vai render bons orgasmos'
        } else {
            embed.setImage('https://res.cloudinary.com/dlbgx94ux/image/upload/v1631230224/galeria/1631230223964-1631230220695-image.jpg')
            phrase = 'BDSM tá liberado pro casal'
        }

        msg.channel.send(`
            ${members.first()} e ${members.last()} combinam ${randomValue}%
${phrase}
        `, embed)
    }

    // TEMPO
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

    // MOEDA
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
})

client.login(env.DISCORD_TOKEN)