import Command from '../../models/Command'
import CommandType from '../../enums/CommandType'
import { Message } from 'discord.js'
import GeneralDispatcher from '../../dispatchers/GeneralDispatcher'

const generalCommands: Command[] = [
  {
    id: '!help',
    description: 'Muestra los comandos',
    type: CommandType.GENERAL,
    exec(dispatcher: GeneralDispatcher, message: Message) {
      dispatcher.help(message)
    }
  },
  {
    id: '!q',
    description: 'Responder con una frase aleatoria',
    type: CommandType.GENERAL,
    exec(disptacher: GeneralDispatcher, message: Message) {
      disptacher.randomQuote(message)
    }
  },
]

export default generalCommands