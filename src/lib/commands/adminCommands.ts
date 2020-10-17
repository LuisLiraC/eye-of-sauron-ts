import Command from "../../models/Command"
import AdminDispatcher from "../../dispatchers/AdminDispatcher"
import { Message } from "discord.js"
import CommandType from "../../enums/CommandType"

const adminCommands: Command[] = [
  {
    id: "!help",
    description: "description",
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.help(message)
    }
  },
  {
    id: "!rules",
    description: "Avisa al usuario mencionado sobre su comportamiento\n        Ejemplo: !rules @FranyerRangel (Frandeveloper)👨💻",
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.rules(message)
    },
  },
  {
    id: "!desc",
    description: "Devuelve la descripción para el live con los integrantes mencionados\n        Ejemplo: !desc @musarte @Wiar8 @vurokrazia",
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.description(message)
    },
  },
  {
    id: "!raffle",
    description: "Retgistra el mensaje para que las personas puedan reaccioanr y participar en la rifa\n        Ejemplo: !raffle Reaccionen a este mensaje 😁        \n        Nota: Solo se registrarán las reacciones hechas después de usar este comando",
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.raffle(message)
    },
  },
  {
    id: "!part",
    description: "Recibe un ID de mensaje y muestra las personas que han reaccionado\n        Ejemplo !part 724861047768350831",
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.viewParticipants(message)
    },
  },
  {
    id: "!winner",
    description: "Recibe el ID de un mensaje registrado con !raffle para elegir un ganador de forma aleatoria\n        Ejemplo: !winner 724861047768350831        \n        Nota: El bot responde en el canal que fue invocado y mencionan al ganador",
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.announceWinner(message)
    },
  },
  {
    id: "!meeting",
    description: "Usar en caso de que sea algo importante para hablar sobre la comunidad",
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.meeting(message)
    },
  },
  {
    id: "!reply",
    description: "",
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.reply(message)
    }
  },
  {
    id: '!st',
    description: '',
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.sauronTalk(message)
    }
  }
]

export default adminCommands
