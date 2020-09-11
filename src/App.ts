import { Client } from 'discord.js'
import addedReactionController from './controllers/addedReactionController'
import messageController from './controllers/messageController'
import newMemberController from './controllers/newMemberController'

class App {
  client: Client
  private token: string

  constructor(token: string) {
    this.client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
    this.token = token
  }

  start(): void {
    this.client.login(this.token)
    this.initialize()
  }

  private initialize(): void {
    this.client.on('ready', () => console.log('Sauron is watching everything 😈'))
    this.client.on('guildMemberAdd', newMemberController)
    this.client.on('message', messageController)
    this.client.on('messageReactionAdd', addedReactionController)
  }
}


export default App