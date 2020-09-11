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