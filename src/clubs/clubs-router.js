const path = require("path");
const express = require("express");
const xss = require("xss");
const ClubsService = require("./clubs-service");

const clubsRouter = express.Router();
const jsonParser = express.json();

const serializeClub = (club) => ({
  id: club.id,
  name: xss(club.name),
  description: xss(club.description),
  leadership: xss(club.leadership),
  topic: xss(club.topic),
  day_of_week: xss(club.day_of_week),
  time_of_day: xss(club.time_of_day),
  google_classroom_code: xss(club.google_classroom_code),
  remind_code: xss(club.remind_code),
  date_created: club.date_created,
});

clubsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    ClubsService.getAllClubs(knexInstance)
      .then((clubs) => {
        res.json(clubs.map(serializeClub));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      name,
      description,
      topic,
      leadership,
      day_of_week,
      time_of_day,
      date_created,
      google_classroom_code,
      remind_code,
    } = req.body;
    const newClub = { name, description };

    for (const [key, value] of Object.entries(newClub)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
      }
    }

    newClub.topic = topic;
    newClub.day_of_week = day_of_week;
    newClub.time_of_day = time_of_day;
    newClub.leadership = leadership;
    newClub.date_created = date_created;
    newClub.google_classroom_code = google_classroom_code;
    newClub.remind_code = remind_code;

    ClubsService.insertClub(req.app.get("db"), newClub)
      .then((club) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${club.id}`))
          .json(serializeClub(club));
      })
      .catch(next);
  });

clubsRouter
  .route("/:club_id")
  .all((req, res, next) => {
    ClubsService.getById(req.app.get("db"), req.params.club_id)
      .then((club) => {
        if (!club) {
          return res.status(404).json({
            error: { message: `club doesn't exist` },
          });
        }
        res.club = club;
        next();
      })
      .catch(next);
  })

  .get((req, res, next) => {
    res.json(serializeClub(res.club));
  })

  .delete((req, res, next) => {
    ClubsService.deleteClub(req.app.get("db"), req.params.club_id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(jsonParser, (req, res, next) => {
    const {
      name,
      description,
      topic,
      leadership,
      day_of_week,
      time_of_day,
      date_created,
      google_classroom_code,
      remind_code,
    } = req.body;
    const clubToUpdate = { name, description };

    const numberOfValues = Object.values(clubToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'name', 'description', or 'date_created'`,
        },
      });

    clubToUpdate.topic = topic;
    clubToUpdate.day_of_week = day_of_week;
    clubToUpdate.time_of_day = time_of_day;
    clubToUpdate.leadership = leadership;
    clubToUpdate.date_created = date_created;
    clubToUpdate.google_classroom_code = google_classroom_code;
    clubToUpdate.remind_code = remind_code;

    ClubsService.updateClub(req.app.get("db"), req.params.club_id, clubToUpdate)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = clubsRouter;
