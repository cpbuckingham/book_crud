exports.seed = function(knex, Promise) {
    return Promise.all([
        knex("books_authors").del(),
        knex("books_authors").insert({
            books_id: 1,
            authors_id: 1
            })
    ]);
};
