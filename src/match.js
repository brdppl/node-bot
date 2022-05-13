const { MessageEmbed } = require('discord.js')

module.exports = (commands, command, msg) => {
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
}