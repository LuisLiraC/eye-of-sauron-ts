import Dispatcher from './Dispatcher'
import { Message, MessageEmbed, TextChannel } from 'discord.js'
import { createMessageEmbed, getChannelById } from '../utils/DiscordUtils'
import axios from 'axios'
import Quote from '../models/Quote'

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

  async randomQuote(message: Message) {
    try {
      const { data: phrase } = await axios.get<Quote>('https://programming-quotes-api.herokuapp.com/quotes/random/lang/en')
      const channel = getChannelById(message, message.channel.id);
      
      const msg = createMessageEmbed({
        title: phrase.author,
        description: phrase.en,
        thumbnail: {
          url: "https://i.imgur.com/NPQObWF.png"
        },
        footer: {
          text: "https://bit.ly/3k6Nwo1"
        }
      })

      channel instanceof TextChannel && channel.send(msg)
    } catch (error) {
      console.log(error)
    }
  }
}

export default StupidDispatcher