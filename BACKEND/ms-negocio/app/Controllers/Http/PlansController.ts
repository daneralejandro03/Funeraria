import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan'

export default class PlansController {

    //Create
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const thePlan: Plan = await Plan.create(body);
        return thePlan;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await Plan.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Plan.query().paginate(page, perPage)
            } else {
                return await Plan.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

        const thePlan: Plan = await Plan.findOrFail(params.id);
        const body = request.body();
        thePlan.message = body.message;
        thePlan.send_date = body.send_date;

        return await thePlan.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const thePlan: Plan = await Plan.findOrFail(params.id);
        response.status(204);

        return await thePlan.delete();
    }

}