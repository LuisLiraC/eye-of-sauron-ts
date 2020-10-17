import Command from "../../models/Command"
import adminCommands from "./adminCommands"
import generalCommands from "./generalCommands"
import stupidCommands from "./stupidCommands"

const commands: Command[] = [
  ...adminCommands,
  ...stupidCommands,
  ...generalCommands
]

export default commands