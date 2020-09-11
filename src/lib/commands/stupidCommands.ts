import Command from "../../models/Command"
import StupidDispatcher from "../../dispatchers/StupidDispatcher"
import { Message } from "discord.js"
import CommandType from "../../enums/CommandType"

const stupidCommands: Command[] = [
  {
    id: "!fj",
    description: "Le dice a Fran que se ponga a jalar",
    type: CommandType.STUPID,
    exec(dispatcher: StupidDispatcher, message: Message) {
      dispatcher.getToWorkFran(message)
    }
  },
  {
    id: "!love",
    description: "Les dice a todos que los queremos",
    type: CommandType.STUPID,
    exec(dispatcher: StupidDispatcher, message: Message) {
      dispatcher.love(message)
    },
  }
]

export default stupidCommands
