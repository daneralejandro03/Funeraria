import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pay from 'App/Models/Pay'

export default class PaysController {

    //Create
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const thePay: Pay = await Pay.create(body);
        return thePay;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await Pay.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Pay.query().paginate(page, perPage)
            } else {
                return await Pay.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

        const thePay: Pay = await Pay.findOrFail(params.id);
        const body = request.body();
        thePay.pay_day = body.pay_day;
        thePay.amount = body.amount;


        return await thePay.save();
    }

    //Delete
    public async delete({ params, response }: HttpContextContract) {

        const thePay: Pay = await Pay.findOrFail(params.id);
        response.status(204);

        return await thePay.delete();
    }

}