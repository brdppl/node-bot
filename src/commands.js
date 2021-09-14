const commands = {
    help: {
        command: 'help',
        aliases: ['ajuda'],
        args: {
            required: false,
            list: ['comando']
        },
        description: 'Descrição do comando'
    },
    photo: {
        command: 'foto',
        aliases: ['fotos', 'imagem', 'photo', 'photos', 'image', 'pic', 'picture'],
        args: {
            required: false,
            list: ['nick']
        },
        description: 'Os melhores cliques de cada integrante'
    },
    rank: {
        command: 'patente',
        aliases: ['rank', 'elo'],
        args: {
            required: true,
            list: ['nick']
        },
        description: 'Patente atualizadinha dos players do clan'
    },
    about: {
        command: 'sobre',
        aliases: ['about'],
        args: {
            required: true,
            list: ['nick']
        },
        description: 'Saiba tudo sobre seu player preferido'
    },
    config: {
        command: 'config',
        aliases: ['configs'],
        args: {
            required: true,
            list: ['nick']
        },
        description: 'Conheça as configs dos players do PA'
    },
    curiosities: {
        command: 'curiosidades',
        aliases: ['curiosities', 'cur', 'curio', 'curios'],
        args: {
            required: true,
            list: ['nick']
        },
        description: 'As curiosidades mais tops dos integrantes'
    },
    players: {
        command: 'players',
        aliases: ['jogadores', 'nicks'],
        args: {
            required: false,
            list: []
        },
        description: 'Lista o nick dos integrantes e ex-integrantes do PAU'
    },
    gay: {
        command: 'gay',
        aliases: [],
        args: {
            required: false,
            list: []
        },
        description: 'Saiba o quão gay você está hoje'
    },
    cock: {
        command: 'pau',
        aliases: ['pinto', 'rola', 'cock'],
        args: {
            required: false,
            list: []
        },
        description: 'Saiba se você tem o verdadeiro Sifão de Tomé'
    },
    match: {
        command: 'shippo',
        aliases: ['match', 'shippar'],
        args: {
            required: true,
            list: ['@usuario1', '@usuario2']
        },
        description: 'Será que sai uma paquera?'
    },
    weather: {
        command: 'tempo',
        aliases: ['clima', 'temperatura', 'weather'],
        args: {
            required: true,
            list: ['cidade']
        },
        description: 'Saiba como está o tempo na sua cidade'
    },
    currency: {
        command: 'moeda',
        aliases: ['converter', 'convert', 'currency'],
        args: {
            required: false,
            list: ['moeda1', 'moeda2']
        },
        description: 'Converta moedas (use o código da moeda ex.: BRL)'
    },
    soccer: {
        command: 'futebol',
        aliases: ['fut', 'soccer'],
        args: {
            required: false,
            list: ['campeonato']
        },
        description: 'Saiba o resultado dos jogos (use o código do campeonato ex.: BSA)'
    }
}

module.exports = commands