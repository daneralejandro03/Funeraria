import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.date({format: 'yyyy-MM-dd'}),
    state: schema.boolean(),
    incident_id: schema.number([rules.exists({ table: 'incidents', column: 'id'})]),
  })

  public messages: CustomMessages = {
    'start_date.required': 'La fecha de inicio es requerida',
    'state.required': 'El estado del chat es requerido',
  }
}