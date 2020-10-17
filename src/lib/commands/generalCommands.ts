import Command from "../../models/Command";
import CommandType from "../../enums/CommandType";
import { Message } from "discord.js";
import GeneralDispatcher from "../../dispatchers/GeneralDispatcher";

const generalCommands: Command[] = [
  {
    id: "!help",
    description: "description",
    type: CommandType.GENERAL,
    exec(dispatcher: GeneralDispatcher, message: Message) {
      dispatcher.help(message)
    }
  },
  {
    id: '!q',
    description: 'Send a randomn quote',
    type: CommandType.GENERAL,
    exec(disptacher: GeneralDispatcher, message: Message) {
      disptacher.randomQuote(message)
    }
  },
]

export default generalCommands