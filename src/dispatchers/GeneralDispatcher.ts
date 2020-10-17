import { EmbedField, Message, MessageEmbed, MessageEmbedOptions, TextChannel } from "discord.js";
import Quote from "../models/Quote";
import { createMessageEmbed, getChannelById, getGuildMemberByMessage } from "../utils/DiscordUtils";
import Dispatcher from "./Dispatcher";
import axios from 'axios'
import CommandManager from "../utils/CommandManager";
import CommandType from "../enums/CommandType";


class GeneralDispatcher extends Dispatcher {
  
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

  help(message: Message) {
    try {
      const isUd = new CommandManager().isUndefined(message)
      const channel = isUd 
        ? getChannelById(message, this.channels.undefinedDevsBots) 
        : getChannelById(message, this.channels.generalBots)
      const member = getGuildMemberByMessage(message)

      const options: MessageEmbedOptions = {
        title: `Lista de comandos`,
        fields: this.getCommandsFields(isUd),
        thumbnail: {
          url: 'https://i.imgur.com/r3KnljE.png'
        }
      }
      const msg = new MessageEmbed(options)

      channel instanceof TextChannel && channel.send(`<@${member}>`, msg)

    } catch (error) {
      console.log(error)
    }
  }

  getCommandsFields(isUd: boolean) : EmbedField[] {
    if (isUd) {
      return this.commands.map(c => ({
        name: c.id,
        value: c.description,
        inline: false
      }))
    } else {
      const filtered = this.commands.filter(c => c.type === CommandType.GENERAL)
      return filtered.map(c => ({
        name: c.id,
        value: c.description,
        inline: false
      }))
    }
  }
}

export default GeneralDispatcher