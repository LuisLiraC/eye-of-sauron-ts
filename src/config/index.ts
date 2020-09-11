import dotenv from 'dotenv'
dotenv.config()

const config = {
  token: process.env.DISCORD_TOKEN || ''
}

export default config