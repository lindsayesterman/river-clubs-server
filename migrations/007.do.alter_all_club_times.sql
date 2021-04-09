ALTER TABLE clubs DROP COLUMN IF EXISTS time_of_day;
DROP TYPE IF EXISTS daytimes;

CREATE TYPE daytimes AS ENUM (
    '11',
    '11:15',
    '11:30',
    '11:45',
    '12',
    '12:15',
    '12:30',
    '12:45',
    '1',
    '1:15',
    '1:30',
    '1:45',
    '2',
    '2:15',
    '2:30',
    '2:45',
    '3',
    '3:15',
    '3:30',
    '3:45',
    '4',
    '4:15',
    '4:30',
    '4:45',
    '5',
    '5:15',
    '5:30',
    '5:45',
    '6',
    '6:15',
    '6:30',
    '6:45'
);

ALTER TABLE clubs
ADD COLUMN time_of_day daytimes;