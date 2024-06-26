import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServicePlan from './ServicePlan'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public duration: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ServicePlan, {
    foreignKey: 'plan_id',
  })
  public servicesplan: HasMany<typeof ServicePlan>
}
