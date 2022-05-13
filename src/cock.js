const store = require('store')

module.exports = (commands, command, msg) => {
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
}