import { GuildMember, PartialGuildMember } from "discord.js";
import BotDispatcher from "../dispatchers/BotDispatcher";

function newMemberController(member: GuildMember | PartialGuildMember) {
  const botDispatcher = new BotDispatcher()
  botDispatcher.welcome(member)
  botDispatcher.setUnverified(member)
}

export default newMemberController