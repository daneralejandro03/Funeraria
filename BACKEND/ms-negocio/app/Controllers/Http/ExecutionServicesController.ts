import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExecutionService from 'App/Models/ExecutionService'
import ExecutionServiceValidator from 'App/Validators/ExecutionServiceValidator'
//import ExecutionServiceValidator from 'App/Validators/ExecutionServiceValidator'

export default class ExecutionServicesController {

  public async find2(id:number){
    
      let theExecutionServices: ExecutionService = await ExecutionService.findOrFail(id)
      return theExecutionServices
  }
  public async find({ request, params }: HttpContextContract) {

    if (params.id) {
      let theExecutionServices: ExecutionService = await ExecutionService.findOrFail(params.id)
      await theExecutionServices.load('incident')
      await theExecutionServices.load('service')
      return theExecutionServices
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await ExecutionService.query().paginate(page, perPage)
      } else {
        return await ExecutionService.query()
      }
    }
  }
  public async store({ request }: HttpContextContract) {
    const body = await request.validate(ExecutionServiceValidator)
    //const body = request.body();
    const theExecutionServices: ExecutionService = await ExecutionService.create(body);
    return theExecutionServices;
  }

  public async update({ params, request }: HttpContextContract) {
    const theExecutionServices: ExecutionService = await ExecutionService.findOrFail(params.id)
    const body = request.body()
    theExecutionServices.cost = body.cost
    theExecutionServices.duration = body.duration
    theExecutionServices.state = body.state
    theExecutionServices.incident_id = body.incident_id
    theExecutionServices.service_id = body.service_id

    return await theExecutionServices.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theExecutionServices: ExecutionService = await ExecutionService.findOrFail(params.id)
    response.status(204)
    return await theExecutionServices.delete()
  }
}
