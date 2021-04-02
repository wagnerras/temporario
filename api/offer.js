
module.exports = app => {

    function save(req, res) {
        const offer = { ...req.body }

        //só para exemplo, verificação desnecessaria pois o banco já retornaria o erro
        //também o banco irá retornar o erro se advertiser_name já existir
        if (offer.description.length >= 500) {
            return res.status(400).send("can’t exceed 500 chars")
        }

        if (!validURL(offer.url)) {
            return res.status(400).send("must have a valid URI format")
        }


        app.db('offers')
            .insert(offer)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err.detail))

    }

    async function get(req, res) {

        await setState()

        app.db('offers')
            .select('id', 'advertiser_name', 'description', 'url', 'starts_at', 'ends_at', "state")
            .orderBy('id', 'desc')
            .then(offers => res.json(offers))
            .catch(err => res.status(500).send(err))
    }

    function getById(req, res) {
        app.db('offers')
            .where({ id: req.params.id })
            .first()
            .then(offer => res.json(offer))
            .catch(err => res.status(500).send(err))
    }


    function update(req, res) {
        const offer = { ...req.body }
        const offerid = req.params.id

        app.db('offers')
            .update(offer)
            .where({ id: offerid })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    async function remove(req, res) {

        const rowsDeleted = await app.db('offers')
            .where({ id: req.params.id }).del()

        if (!rowsDeleted) {
            return res.status(400).send("offer not found")
        } else {
            return res.status(204).send()
        }

    }

    function disable(req, res) {
        app.db('offers')
            .where({ id: req.params.id })
            .update({
                disabled_by_adm: true,
                state: 'disabled'
            })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))

    }

    async function setState() {


        const date = dataHoraAtual();

        await app.db('offers')
            .where('disabled_by_adm', false)
            .andWhere(function () {
                this.where('ends_at', '<=', date).orWhere('ends_at', null)
            })
            .update({
                state: 'enabled',
            })


        await app.db('offers')
            .where('disabled_by_adm', false)
            .andWhere('ends_at', '<=', date)
            .update({
                state: 'disabled',
            })


    }



    function validURL(str) {
        regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

        if (regexp.test(str)) {
            return true
        } else {
            return false
        }
    }


    function dataHoraAtual() {
        let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        if (dia < 10) {
            dia = "0" + dia;
        }
        if (mes < 10) {
            mes = "0" + mes;
        }
        let ano = data.getFullYear();
        var horas = new Date().getHours();
        if (horas < 10) {
            horas = "0" + horas;
        }
        let minutos = new Date().getMinutes();
        if (minutos < 10) {
            minutos = "0" + minutos;
        }

        let result = `${ano}-${mes}-${dia} ${horas}:${minutos}:00-03`;

        return result
    }




    return { save, get, getById, update, remove, setState, disable }
}