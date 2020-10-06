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
  },
  {
    id: "!ck",
    description: "Les enseña que una victoria sin honor ni dignidinad es una lección muy cara a pagar",
    type: CommandType.STUPID,
    exec(dispatcher: StupidDispatcher, message: Message) {
      dispatcher.cobraKai(message)
    },
  }
]

export default stupidCommands
