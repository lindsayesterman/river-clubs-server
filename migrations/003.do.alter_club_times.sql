CREATE TYPE weekdays AS ENUM (
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday'
);
ALTER TABLE clubs
ADD COLUMN day_of_week weekdays;

CREATE TYPE daytimes AS ENUM (
  '11',
  '12',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6'
);
ALTER TABLE clubs
ADD COLUMN time_of_day daytimes;