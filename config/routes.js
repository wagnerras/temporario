module.exports = app => {

    app.route('/adm/offers')
        .post(app.api.offer.save)
        .get(app.api.offer.get)

    app.route('/adm/offers/:id')
        .get(app.api.offer.getById)
        .put(app.api.offer.update)
        .delete(app.api.offer.remove)

    app.route('/adm/offers/:id/disable')
        .put(app.api.offer.disable)


    app.route('/users/offers')
        .get(app.api.offer.usersGet)





}