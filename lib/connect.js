const { WAConnection } = require("@adiwajshing/baileys")
const chalk = require('chalk')
const fs = require("fs")

const nuy = new WAConnection()
exports.nuy = nuy

exports.connect = async() => {
    console.log(chalk.whiteBright('╭─── [ LOG ]'))
    let auth = './client.json'
    nuy.logger.level = 'warn'
    nuy.on("qr", () => {
        console.log(`Qr ready, scan`)
    })
    fs.existsSync(auth) && nuy.loadAuthInfo(auth)
    nuy.on('connecting', () => {
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright("Connecting..."))
    })
    nuy.on('open', () => {
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright("WA Version : " + nuy.user.phone.wa_version))
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright("OS Version : " + nuy.user.phone.os_version))
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright("Device : " + nuy.user.phone.device_manufacturer))
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright("Model : " + nuy.user.phone.device_model))
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright("OS Build Number : " + nuy.user.phone.os_build_number))
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright('Welcome My Senpai'))
        const authInfo = nuy.base64EncodedAuthInfo()
        fs.writeFileSync(auth, JSON.stringify(authInfo, null, '\t'))
    })
    await nuy.connect({ timeoutMs: 30 * 1000 })
    return nuy
}