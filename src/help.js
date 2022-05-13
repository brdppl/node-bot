const { MessageEmbed } = require('discord.js')

module.exports = (commands, command, arg1, prefix, msg) => {
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
}