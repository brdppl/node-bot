const { Client } = require('discord.js')
const env = require('./.env')
const commands = require('./src/commands')

const help = require('./src/help')
const photo = require('./src/photo')
const ranks = require('./src/ranks')
const about = require('./src/about')
const configs = require('./src/configs')
const curiosities = require('./src/curiosities')
const players = require('./src/players')
const gay = require('./src/gay')
const cock = require('./src/cock')
const match = require('./src/match')
const weather = require('./src/weather')
const currency = require('./src/currency')
const soccer = require('./src/soccer')

const client = new Client()

const prefix = '-'

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

    help(commands, command, arg1, prefix, msg)
    photo(commands, command, arg1, msg)
    ranks(commands, command, arg1, prefix, msg)
    about(commands, command, arg1, prefix, msg)
    configs(commands, command, arg1, prefix, msg)
    curiosities(commands, command, arg1, prefix, msg)
    players(commands, command, msg)
    gay(commands, command, msg)
    cock(commands, command, msg)
    match(commands, command, msg)
    weather(commands, command, args, arg1, msg)
    currency(commands, command, arg1, arg2, msg)
    soccer(commands, command, arg1, msg)
})

client.login(env.DISCORD_TOKEN)