import Dispatcher from "./Dispatcher";
import { GuildMember, PartialGuildMember, MessageReaction, User, Message, TextChannel, Role, UserResolvable } from "discord.js";
import { getChannelById, getEmojiById, getGuildMemberByMessage, createMessageEmbed } from "../utils/DiscordUtils";
import Raffle from '../models/Raffle'

class BotDispatcher extends Dispatcher {
  welcome(member: GuildMember | PartialGuildMember) {
    try {
      const channel = getChannelById(member, this.channels.welcome)

      if(!channel) return

      const emoji = getEmojiById(member, this.emojis.linkPepe)
      const rulesChannel = getChannelById(member, this.channels.rulesChannel)?.toString()

      const messageEmbed = createMessageEmbed({
        title: `¡Bienvenid@!`,
        description: `Gracias <@${member}> por unirte a la comunidad de Undefined Devs <:linkpepe:${emoji}>\n\nLee nuestro canal de ${rulesChannel} hasta el final y sigue las instrucciones para poder entrar a todos los canales.`,
        footer: {
          text: 'Atte: Comunidad de UndefinedDevs'
        },
        color: '#0761E2',
        thumbnail: {
          url: 'https://i.imgur.com/r3KnljE.png'
        },
      })

      channel instanceof TextChannel && channel.send(messageEmbed)

    } catch (error) {
      console.log(error)
    }
  }

  setUnverified(member: GuildMember | PartialGuildMember) {
    try {
      let role = member.guild.roles.cache.find(r => r.id === this.roles.unverified)
      member.roles.add(role as Role)
    } catch (error) {
      console.log(error)
    }
  }

  private removeUnverified(reaction: MessageReaction, user: UserResolvable) {
    try {
      const member = reaction.message.guild?.member(user)
      if (member) {
        let role = member.guild.roles.cache.find(r => r.id === this.roles.unverified)
        member.roles.remove(role as Role)
        const channel = getChannelById(reaction.message, this.channels.undefinedDevsBots)
        channel instanceof TextChannel &&
          channel.send(`<@${member}> ha reaccionado a las reglas`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  processReaction(reaction: MessageReaction, user: User) {
    try {
      switch (reaction.message.id) {
        case this.messages.rulesMessage:
          this.removeUnverified(reaction, user)
          break
        default:
          this.isRaffle(reaction.message.id)
            && this.addParticipant(reaction, user)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async addParticipant(reaction: MessageReaction, user: User) {
    try {
      await this.initDatabase()

      const raffle: Raffle = { messageId: reaction.message.id }

      const registeredUsers = this.db.get('raffles')
        .find(raffle)
        .get('reactions')
        .value()

      if (registeredUsers?.includes(user.id)) return

      await this.db.get('raffles')
        .find(raffle)
        .get('reactions')
        .push(user.id)
        .write()

    } catch (error) {
      console.log(error)
    }
  }

  hijole(message: Message) {
    try {
      const channel = getChannelById(message, this.channels.generalBots)
      const member = getGuildMemberByMessage(message)
      channel instanceof TextChannel
        && channel.send(`<@${member}>`, { files: ['https://i.pinimg.com/564x/e8/17/80/e8178017c48860752523cc080af84d57.jpg'] })
    } catch (error) {
      console.log(error)
    }
  }

  processMessage(message: Message) {
    try {
      message.channel.id === this.channels.live && this.isInvalidLink(message.content) && this.liveWarning(message)
    } catch (error) {
      console.log(error)
    }
  }

  isInvalidLink(content: string): boolean {
    const result = content.match(/https:\/\/[www]?.[youtube.com|twitch.tv|youtu.be]/)
    return result == undefined || result.length == 0
      ? true
      : false
  }

  liveWarning(message: Message) {
    try {      
      message.delete()
      const member = getGuildMemberByMessage(message)
      const channel = getChannelById(message, this.channels.generalBots)
      const liveChannel = getChannelById(message, this.channels.live)
      channel instanceof TextChannel 
        && channel.send(`<@${member}>, por favor usa el canal de <#${liveChannel}> de la forma correcta. Comparte el link directo a la transmisión.`)
    } catch (error) {
      console.log(error)
    }
  }
}

export default BotDispatcher