import lowDb from 'lowdb'
import { default as FileAsync } from 'lowdb/adapters/FileAsync'
import path from 'path'

import commands from '../lib/commands'
import emojis from '../lib/emojis'
import messages from '../lib/messages'
import channels from '../lib/channels'
import undefinedDevs from '../lib/undefinedDevs'
import roles from "../lib/roles"
import Database from '../models/Database'
import Raffle from '../models/Raffle'
import { Message } from 'discord.js'

abstract class Dispatcher {
  protected db: lowDb.LowdbAsync<Database>
  protected commands = commands
  protected channels = channels
  protected emojis = emojis
  protected messages = messages
  protected uds = undefinedDevs
  protected roles = roles

  protected async initDatabase() {
    const adapter = new FileAsync<Database>(path.resolve(__dirname, '../lib/raffles/db.json'))
    const db = await lowDb(adapter)
    this.db = db
  }

  protected async isRaffle(messageId: string) {
    try {
      await this.initDatabase()

      const raffle: Raffle = { messageId }
      const result = this.db.get('raffles')
        .find(raffle)
        .value()

      return result
    } catch (error) {
      console.log(error)
    }
  }

  protected async validateRaffle(message: Message): Promise<Raffle | void> {
    try {
      const haveValidId = message.content.match(/[0-9]{18,}/g)

      if (haveValidId) {
        const [,,messageId] = haveValidId
        const isRaffle = await this.isRaffle(messageId)
        return isRaffle
      }
    } catch (error) {
      console.log(error)
    }
  }

}

export default Dispatcher