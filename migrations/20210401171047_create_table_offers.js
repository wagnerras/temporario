
exports.up = function (knex, Promise) {
    return knex.schema.createTable('offers', table => {
        table.increments('id').primary()
        table.string('advertiser_name').notNull().unique()
        table.string('url').notNull()
        table.string('description', 500).notNull()
        table.timestamp('starts_at').notNull()
        table.timestamp('ends_at')
        table.boolean('premium').notNull().defaultTo(false)
        table.string('state').notNull().defaultTo("disabled")    
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('offers')
};