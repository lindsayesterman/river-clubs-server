CREATE TYPE club_topic AS ENUM (
    'academic',
    'athletics',
    'art',
    'tech',
    'social',
    'science',
    'work',
    'other'
);

ALTER TABLE clubs
  ADD COLUMN
    topic club_topic;