import { GuildMember, PartialGuildMember } from "discord.js";
import BotDispatcher from "../dispatchers/BotDispatcher";

function newMemberController(member: GuildMember | PartialGuildMember) {
  const botDispatcher = new BotDispatcher()
  botDispatcher.welcome(member)
}

export default newMemberController