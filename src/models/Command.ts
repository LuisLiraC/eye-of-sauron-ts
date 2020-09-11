import CommandType from "../enums/CommandType"
import { Message } from "discord.js"
import Dispatcher from "../dispatchers/Dispatcher"

export default interface Command {
  id: string
  description: string
  exec(disptacher: Dispatcher, message: Message): void
  type: CommandType
}