import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicePlanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    statusHiring: schema.boolean(),
    dateHiring: schema.date(),
    dateExpiration: schema.date(),
    service_id: schema.number([rules.minLength(2)]),
    plan_id: schema.number([rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    'statusHiring.required': 'El estado de contratación es requerido',
    'dateHiring.required': 'La fecha de contratación es requerida',
    'dateExpiration.required': 'La fecha de vencimiento es requerida',
    'service_id.required': 'El ID del servicio es requerido',
    'plan_id.required': 'El ID del plan es requerido',
  }
}