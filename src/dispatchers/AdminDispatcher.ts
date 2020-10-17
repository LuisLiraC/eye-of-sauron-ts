import Dispatcher from './Dispatcher'
import { Message, TextChannel } from 'discord.js'
import { getChannelById, getGuildMemberByMessage, getEmojiById } from '../utils/DiscordUtils'
import Raffle from '../models/Raffle'

class AdminDispatcher extends Dispatcher {

  rules(message: Message) {
    try {
      const user = message.mentions.users.first()
      if (user) {
        const member = message.guild?.member(user)
        if (member) {
          const channel = getChannelById(message, this.channels.moderation)
          const emoji = getEmojiById(message, this.emojis.pepeRules)
          const rulesChannel = getChannelById(message, this.channels.rulesChannel)?.toString()

          channel instanceof TextChannel
            && channel.send(`<:rules:${emoji}> <@${member}> tu comportamiento no está siendo el adecuado, te recomendamos leer las reglas de nuevo ${rulesChannel}`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  description(message: Message) {
    try {
      const participants = message.mentions.users.array()
      let result = `En este #UndefinedLive estaremos hablando sobre [insertar descripción del tema]\n\nSi te gustan estos lives no olvides compartir y seguirnos en nuestras redes 😁👇🏼\n\nParticipantes:\n`

      participants.forEach(p => this.uds.find(ud => ud.id === p.id
        ? result += `👉 ${ud.name}:\n<${ud.youtube}>\n<${ud.twitter}>\n`
        : ''
      ))

      result += `\nDiscord: <https://discord.gg/UKPbV3j>\n\nLive anterior: [insertar link del live]`
      const channel = getChannelById(message, this.channels.undefinedDevsBots)
      const member = getGuildMemberByMessage(message)

      channel instanceof TextChannel &&
        channel.send(`<@${member}> Descripción:\n${result}`)
    } catch (error) {
      console.log(error)
    }
  }

  meeting(message: Message) {
    try {
      const channel = getChannelById(message, this.channels.organization)
      channel instanceof TextChannel
        && channel.send('@here', { files: ['https://i.ibb.co/02hWZ3C/emergency.png'] })
    } catch (error) {
      console.log(error)
    }
  }

  async raffle(message: Message) {
    try {
      await this.initDatabase()

      const messageToReactId = message.id
      const raffle: Raffle = { messageId: messageToReactId }
      const exists = this.db.get('raffles')
        .find(raffle)
        .value()

      if (!exists) {
        raffle.reactions = []

        await this.db.get('raffles')
          .push(raffle)
          .write()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async announceWinner(message: Message) {
    try {
      const raffle = await this.validateRaffle(message)

      if (raffle) {
        const users = this.db.get('raffles')
          .find(raffle)
          .get('reactions')
          .value()

        const randomNum = Math.floor(Math.random() * users.length)
        const winner = users[randomNum]
        const emoji = getEmojiById(message, this.emojis.xmaxCheems)
        const channel = getChannelById(message, this.channels.undefinedDevsBots)

        channel instanceof TextChannel
          && channel.send(`Felicidades <@${winner}> ganaste la rifa del día hoy <:xmaxcheems:${emoji}>`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async viewParticipants(message: Message) {
    try {
      const raffle = await this.validateRaffle(message)
      if (raffle) {
        const users = this.db.get('raffles')
          .find(raffle)
          .get('reactions')
          .value()

        const result = users.map(id => ` <@${id}>`).join()
        message.reply(`Particiantes: ${result}`)
      }

    } catch (error) {
      console.log(error)
    }
  }

  async reply(message: Message) {
    try {
      const haveIds = message.content.match(/[0-9]{18,}/g)
      const messageReply = message.content.replace(/^!reply\s+https:\/\/discordapp.com\/channels\/[0-9]{18,}\/[0-9]{18,}\/[0-9]{18,}\s+(.*)$/, "$1")

      if (!haveIds) return

      if (haveIds.length > 1) {
        const [, channelId, messageId] = haveIds
        const channel = await getChannelById(message, channelId)?.fetch()

        if (channel instanceof TextChannel) {
          const messageToReply = await channel.messages.fetch(messageId)
          messageToReply.reply(messageReply)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  sauronTalk(message: Message) {
    try {
      const channel = message.mentions.channels.first()
      const msg = message.content.replace(`!st <#${channel}>`, '').trim()
      if (channel == undefined || msg === '') return
      channel instanceof TextChannel && channel.send(msg)
    } catch (error) {
      console.log(error)
    }
  }
}

export default AdminDispatcher