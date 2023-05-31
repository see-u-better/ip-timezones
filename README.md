# See-U-Better IP Timezones

Gives geolocation / timezone infos about an IP

## Requirements
- Node >=18
- Download token from `https://www.ip2location.com` set in .env (`DOWNLOAD_TOKEN`)

## Commands
- `yarn setup`: Run post-install setup
- `yarn setup`

## Tests
- `yarn test`

## Usage
The API key should be set as the header `X-Api-Key` on every request.

- `yarn dev`: Start the development watcher
- `yarn start`: Start the server

The endpoints are the following :
- `/api/ip/{XXX.XXX.XXX.XXX}`: Get some infos about a v4 or v6 IP ([exemple response](#ip-details-response))
- `/api/timezone`: List the timezones ([exemple response](#timezones-response))
- `/api/ip/{XXX.XXX.XXX.XXX}`: Get some infos about a timezone ([exemple response](#timezone-details-response))


### IP details response
```apache
HTTP/1.1 GET localhost:9393/api/ip/1.1.1.1
```
```json
{
    data: {
        ip:	            "1.1.1.1"
        ipNo:	        "16843009"  // IP in decimal format
        countryShort:	"US"
        countryLong:	"United States of America"
        region:	        "California"
        city:	        "San Jose"
        zipCode:	    "95101"
        latitude:	    37.33939
        longitude:	    -121.894958
        timeZone:	    "America/Los_Angeles"
    }
}
```

### Timezones response
```apache
HTTP/1.1 GET localhost:9393/api/timezone
```
```json
{
    data: [
        {
            name	        "Pacific/Midway"
            country_code	"UM"
            dst	            "0"      // Daylight Saving Time
            gmt_offset	    -39600   // Offset to GMT in seconds
        },
        ...,
        {
            name	        "Europe/Paris"
            country_code	"FR"
            dst	            "1"
            gmt_offset	    7200
        },
        ...
    ]
}
```

### Timezone details response
```apache
HTTP/1.1 GET localhost:9393/api/timezone/Europe/Paris
```
```json
{
    data: {
        name	        "Europe/Paris"
        country_code	"FR"
        dst	            "1"
        gmt_offset	    7200
    },
}
```
