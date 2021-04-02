module.exports = app => {

    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

    app.route('/adm/offers')
        .post(app.api.offer.save)
        .get(app.api.offer.get)

    app.route('/adm/offers/:id')
        .get(app.api.offer.getById)
        .put(app.api.offer.update)
        .delete(app.api.offer.remove)

    app.route('/adm/offers/:id/disable')
        .put(app.api.offer.disable)

    app.route('/user/offers')
        .get(app.api.offer.usersGet)




}