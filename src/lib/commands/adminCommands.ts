import Command from '../../models/Command'
import AdminDispatcher from '../../dispatchers/AdminDispatcher'
import { Message } from 'discord.js'
import CommandType from '../../enums/CommandType'

const adminCommands: Command[] = [
  {
    id: '!rules',
    description: 'Avisa al usuario mencionado sobre su comportamiento\n\nEjemplo: !rules @FranyerRangel (Frandeveloper)👨💻',
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.rules(message)
    },
  },
  {
    id: '!desc',
    description: 'Devuelve la descripción para el live con los integrantes mencionados\n\nEjemplo: !desc @musarte @Wiar8 @vurokrazia',
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.description(message)
    },
  },
  {
    id: '!raffle',
    description: 'Retgistra el mensaje para que las personas puedan reaccioanr y participar en la rifa\n\nEjemplo: !raffle Reaccionen a este mensaje 😁\n\nNota: Solo se registrarán las reacciones hechas después de usar este comando',
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.raffle(message)
    },
  },
  {
    id: '!part',
    description: 'Recibe un el link del mensaje y muestra las personas que han reaccionado',
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.viewParticipants(message)
    },
  },
  {
    id: '!winner',
    description: 'Recibe el link del mensaje registrado con !raffle para elegir un ganador de forma aleatoria\n\nNota: El bot responde en el canal que fue invocado y menciona al ganador',
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.announceWinner(message)
    },
  },
  {
    id: '!meeting',
    description: 'Usar en caso de que sea algo importante para hablar sobre la comunidad',
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.meeting(message)
    },
  },
  {
    id: '!reply',
    description: 'Recibe el link del mensaje y responde por medio de Sauron',
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.reply(message)
    }
  },
  {
    id: '!st',
    description: 'Recibe un canal y envía el mensaje por medio de Sauron',
    type: CommandType.ADMIN,
    exec(dispatcher: AdminDispatcher, message: Message) {
      dispatcher.sauronTalk(message)
    }
  }
]

export default adminCommands
