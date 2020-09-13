import { Message, GuildMember, GuildChannel, GuildEmoji, PartialGuildMember, MessageEmbed, MessageEmbedOptions } from "discord.js";

export function getGuildMemberByMessage(message: Message): GuildMember | undefined | null {
  const user = message.author
  const member = message.guild?.member(user)
  return member
}

export function getChannelById(message: Message | GuildMember | PartialGuildMember, id: string): GuildChannel | undefined {
  const channel = message.guild?.channels.cache.find(ch => ch.id === id)
  return channel
}

export function getEmojiById(message: Message | GuildMember | PartialGuildMember, emojiId: string): GuildEmoji | undefined {
  const emoji = message.client.emojis.cache.get(emojiId)
  return emoji
}

export function createMessageEmbed(options: MessageEmbedOptions): MessageEmbed {
  const messageEmbed = new MessageEmbed()
    .setColor(options.color || '')
    .setTitle(options.title)
    .setDescription(options.description)
    .setFooter(options.footer?.text)
    .setThumbnail(options.thumbnail?.url || '')

  return messageEmbed
}