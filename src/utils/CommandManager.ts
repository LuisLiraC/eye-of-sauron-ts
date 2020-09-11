import Command from "../models/Command"
import CommandType from "../enums/CommandType"
import { Message, Role } from "discord.js"
import commands from '../lib/commands'
import AdminDispatcher from "../dispatchers/AdminDispatcher"
import StupidDispatcher from "../dispatchers/StupidDispatcher"
import { getGuildMemberByMessage } from "./DiscordUtils"

class CommandManager {
  private commands: Command[] = commands

  getCommand(message: Message): Command | undefined {
    try {
      const messageCommand: string = message.content.replace(/(![a-zA-Z]{0,9}) .*/, '$1')
      const command = this.commands.find(c => c.id === messageCommand)
      return command
    } catch (error) {
      console.log(error)
    }
  }

  executeCommand(message: Message, command: Command): void {
    switch (command.type) {
      case CommandType.ADMIN:
        command.exec(new AdminDispatcher(), message)
        break
      case CommandType.STUPID:
        command.exec(new StupidDispatcher(), message)
        break
      default:
        this.commandNotFound(message)
    }
  }

  commandNotFound(message: Message): void {
    try {
      message.reply('el comando no existe, usa `!help` para mostrar la lista de comandos')
    } catch (error) {
      console.log(error)
    }
  }

  isUndefined(message: Message): boolean | void {
    try {
      const user = getGuildMemberByMessage(message)
      if (!user)
        return false

      const roles = message.member?.roles.cache.map(r => r.name.toLowerCase())
      if (roles?.some((r: string) => r.toLowerCase().includes('undefined')))
        return true

    } catch (error) {
      console.log(error)
    }
  }

}

export default CommandManager