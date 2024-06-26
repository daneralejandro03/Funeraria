import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.string([rules.minLength(5), rules.maxLength(20), rules.required()]),
    start_date: schema.date({format: 'yyyy-MM-dd'}),
    end_date: schema.date({format: 'yyyy-MM-dd'})
  })

  public messages: CustomMessages = {
    
  }
}