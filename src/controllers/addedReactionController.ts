import { MessageReaction, PartialUser, User } from "discord.js";
import BotDispatcher from "../dispatchers/BotDispatcher";

function addedReactionController(raection: MessageReaction, user: User | PartialUser) {
  const botDisptacher = new BotDispatcher()
  botDisptacher.processReaction(raection, user as User)
}

export default addedReactionController