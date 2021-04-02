module.exports = app => {

    app.route('/offers')
        .post(app.api.offer.save)
        .get(app.api.offer.get)

    app.route('/offers/:id')
        .get(app.api.offer.getById)
        .put(app.api.offer.update)
        .delete(app.api.offer.remove)

    app.route('/offers/:id/disable')
        .put(app.api.offer.disable)

    app.route('/setState')
        .get(app.api.offer.setState)




}