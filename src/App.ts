import { Client, TextChannel } from 'discord.js'
import addedReactionController from './controllers/addedReactionController'
import messageController from './controllers/messageController'
import newMemberController from './controllers/newMemberController'
import cron from 'node-cron'

class App {
  client: Client
  private token: string

  constructor(token: string) {
    this.client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
    this.token = token
  }

  async start(): Promise<void> {
    await this.client.login(this.token)
    this.initialize()
  }

  private initialize(): void {
    this.client.on('ready', () => console.log('Sauron is watching everything 😈'))
    this.client.on('guildMemberAdd', newMemberController)
    this.client.on('message', messageController)
    this.client.on('messageReactionAdd', addedReactionController)
    cron.schedule('30 2 17 10 *', () => {
      const channel = this.client.channels.cache.find(ch => ch.id === '752642305650852020')
      if (channel === undefined) return

      channel instanceof TextChannel &&
        channel.send('Scheduled Heroku')
    })
  }
}


export default App