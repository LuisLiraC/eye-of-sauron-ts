import { Message, TextChannel } from "discord.js"
import CommandManager from "../utils/CommandManager"
import BotDispatcher from "../dispatchers/BotDispatcher"

function messageController(message: Message) {
  if (!message.guild || message.author.bot) return

  const commandManager = new CommandManager()
  const botDispatcher = new BotDispatcher()
  const command = message.content.startsWith('!') && commandManager.getCommand(message)
  const isUd = commandManager.isUndefined(message)
  
  if (command && isUd) {
    commandManager.executeCommand(message, command)
  } else if (message.content.startsWith('!') && isUd) {
    commandManager.commandNotFound(message)
  } else if (!isUd && command) {
    botDispatcher.hijole(message)
  }

  botDispatcher.processMessage(message)
}

export default messageController