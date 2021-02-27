const ClubsService = {
  getAllClubs(knex) {
    return knex
    .select("*")
    .from("clubs");
  },

  insertClub(knex, newClub) {
    return knex
      .insert(newClub)
      .into("clubs")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex
    .from("clubs")
    .select("*")
    .where("id", id)
    .first();
  },

  deleteClub(knex, id) {
    return knex("clubs")
    .where({ id })
    .delete();
  },

  updateClub(knex, id, newClubFields) {
    return knex("clubs")
    .where({ id })
    .update(newClubFields);
  },

};

module.exports = ClubsService;
