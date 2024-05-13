import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    privileges: schema.string([rules.minLength(2)]),
    responsabilities: schema.string([rules.minLength(10)]),
    user_id: schema.string([rules.required(), rules.minLength(1)])
  })

  public messages: CustomMessages = {}
}