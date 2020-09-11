import Command from "../../models/Command"
import adminCommands from "./adminCommands"
import stupidCommands from "./stupidCommands"

const commands: Command[] = [
  ...adminCommands,
  ...stupidCommands
]

export default commands