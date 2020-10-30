import Dispatcher from './Dispatcher'
import { Message, TextChannel } from 'discord.js'
import { getChannelById } from '../utils/DiscordUtils'

class StupidDispatcher extends Dispatcher {

  getToWorkFran(message: Message) {
    try {
      const channel = getChannelById(message, this.channels.undefinedDevsBots)
      const franId = this.uds.find(ud => ud.name === 'Frandeveloper')?.id

      channel instanceof TextChannel
        && channel.send(`Ya ponte a jalar <@${franId}>`)

    } catch (error) {
      console.log(error)
    }
  }

  getToWorkMarcode(message: Message) {
    try {
      const channel = getChannelById(message, this.channels.undefinedDevsBots)
      const marcoId = this.uds.find(ud => ud.name === 'Marcode')?.id
      
      channel instanceof TextChannel
        && channel.send(`Ya ponte a programar de verdad <@${marcoId}> , https://www.youtube.com/watch?v=VTLAX5IZY0A`)

    } catch (error) {
      console.log(error)
    }
  }

  sendAtentionCall(message: Message) {
    try {
      const user = message.mentions.users.first()
      if (user) {
        const member = message.guild?.member(user)
        if (member) {
          const channel = getChannelById(message, this.channels.general)

          channel instanceof TextChannel
            && channel.send(`<@${member}> Se ha eliminado tu publicación por favor lee las reglas...`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  sendGameCall(message: Message) {
    try {
      const channel = getChannelById(message, this.channels.gaming)
      channel instanceof TextChannel && channel.send(`Vamos a jugar @everyone `)
    } catch (error) {
      console.log(error)
    }
  }

  cobraKai(message: Message) {
    try {
      const channel = getChannelById(message, this.channels.general)
      channel instanceof TextChannel
        && channel.send(`No es karate, es cobra kai!! 🐍 🐍 🐍`)

    } catch (error) {
      console.log(error)
    }
  }

  love(message: Message) {
    try {
      const channel = getChannelById(message, this.channels.generalBots)
      channel instanceof TextChannel
        && channel.send(`Buenos días, buenas tardes, buenas noches, recuerden que los queremos mucho`, { files: ['https://i.imgur.com/QrBXmAC.jpg'] })
    } catch (error) {
      console.log(error)
    }
  }
}

export default StupidDispatcher