import { Message } from "discord.js"
import CommandManager from "../utils/CommandManager"
import BotDispatcher from "../dispatchers/BotDispatcher"

function messageController(message: Message) {
  if (!message.guild || message.author.bot) return

  const commandManager = new CommandManager()
  const command = message.content.startsWith('!') && commandManager.getCommand(message)

  !command && commandManager.commandNotFound(message)
  command && commandManager.executeCommand(message, command)

  new BotDispatcher().processMessage(message)
}

export default messageController