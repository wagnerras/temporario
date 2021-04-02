
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('offers', table => {
        table.boolean('disabled_by_adm').defaultTo(false)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('offers', table => {
        table.dropColumn('disabled_by_adm')
    })
};