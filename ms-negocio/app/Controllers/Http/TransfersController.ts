import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transfer from 'App/Models/Transfer';

export default class TransfersController {
    //Create
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theTransfer: Transfer = await Transfer.create(body);
        return theTransfer;
    }


    //Read
    public async find({ request, params }: HttpContextContract) {

        if (params.id) {
            return await Transfer.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Transfer.query().paginate(page, perPage)
            } else {
                return await Transfer.query()
            }

        }

    }

    //Update
    public async update({ params, request }: HttpContextContract) {

            const theTransfer: Transfer = await Transfer.findOrFail(params.id);
            const body = request.body();
            theTransfer.location = body.location;
            theTransfer.state = body.state;
            theTransfer.departure_time = body.departure_time;
            theTransfer.arrival_time = body.arrival_time;

            return await theTransfer.save();
        }

        //Delete
        public async delete({ params, response }: HttpContextContract) {

            const theTransfer: Transfer = await Transfer.findOrFail(params.id);
            response.status(204);

            return await theTransfer.delete();
        }
}
