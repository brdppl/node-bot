const store = require('store')
const EmojiConvertor = require('emoji-js')

const emoji = new EmojiConvertor()

module.exports = async (commands, command, msg) => {
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
}