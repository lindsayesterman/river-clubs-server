# River Clubs Server

River Clubs is a directory of all Spanish River's Clubs' information. Club leadership can post meeting times, meeting places, club members, a club description, etc. on the page.

These docs describe how to use the [River Clubs](https://river-clubs.vercel.app) API. 

## Authorization

Currently no authorization is required.

## Requests

When posting a request to our clubs endpoint, format the json data like this: 

```javascript
{
    "name": "test_club",
    "description": "test club description",
    "leadership":"enter leadership names here separated by commas",
    "topic":"tech",
    "time_of_day":"12",
    "day_of_week":"monday",
    "date_created":"now"
}
```

## Status Codes

River Clubs returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

