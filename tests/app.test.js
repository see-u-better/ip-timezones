const request = require('supertest')
let app

const TEST_API_KEY = '00000000-0000-0000-0000-000000000000'
const FAIL_API_KEY = '11111111-1111-1111-1111-111111111111'

const invalidRequest = (url) => {
    return request(app)
        .get(url)
        .set({ 'X-Api-Key': FAIL_API_KEY })
}

const authRequest = (url, method = 'get') => {
    return request(app)
        [method](url)
        .set({ 'X-Api-Key': TEST_API_KEY })
}

beforeEach(() => {
    process.env.API_KEY = TEST_API_KEY
    app = require('../app')
});

describe('Testing landing, authentication and middlewares', () => {
    it('should show the landing', async () => {
        app.removeApiKeyForTests()
        const html = await request(app).get('/').send()
        expect(html.statusCode).toEqual(200)
        expect(html.text).toContain('IP Timezones')
        expect(html.headers['x-robots-tag']).toContain('noindex')

        const favicon = await request(app).get('/favicon.svg').send()
        expect(favicon.statusCode).toEqual(200)
        expect(favicon.header['content-type']).toEqual('image/svg+xml; charset=utf-8')
        expect(html.headers['x-robots-tag']).toContain('noindex')

    })

    it('should fail without API key', async () => {
        app.removeApiKeyForTests()
        const res = await request(app).get('/api').send()
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('message')
    })

    it('should fail with the wrong API key', async () => {
        const res = await invalidRequest('/api').send()
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('message')
    })

    it('should fail with POST methods', async () => {
        const res = await authRequest('/api', 'post').send({})
        expect(res.statusCode).toEqual(405)
        expect(res.body).toHaveProperty('message')
    })

    it('should succeed with the right API key', async () => {
        const res = await authRequest('/api').send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Testing timezone infos', () => {
    it('should return a list not found when no timezone is set', async () => {
        const res = await authRequest('/api/timezone/').send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data[0]).toHaveProperty('name')
        expect(res.body.data[0]).toHaveProperty('country_code')
        expect(res.body.data[0]).toHaveProperty('dst')
        expect(res.body.data[0]).toHaveProperty('gmt_offset')
    })

    it('should return a the infos for a timezone', async () => {
        const res = await authRequest('/api/timezone/europe/paris').send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('name')
        expect(res.body.data).toHaveProperty('country_code')
        expect(res.body.data).toHaveProperty('dst')
        expect(res.body.data).toHaveProperty('gmt_offset')
    })

    it('should fail when the timezone is invalid', async () => {
        const res = await authRequest('/api/timezone/invalid/timezone').send()
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Testing IP infos', () => {
    it('should return a 404 not found when no IP is set', async () => {
        const res = await authRequest('/api/ip/').send()
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
    })

    it('should fail when the IP is invalid', async () => {
        const res = await authRequest('/api/ip/some-invalid-ip').send()
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })

    it('should succeed for a valid IP', async () => {
        const googleFixture = {
            ip:             "66.249.66.3",
            ipNo:           "1123631619",
            countryShort:   "US",
            countryLong:    "United States of America",
            region:         "California",
            city:           "Mountain View",
            zipCode:        "94043",
            latitude:       37.405991,
            longitude:      -122.078514,
            timeZone:	    "America/Los_Angeles",
        }

        const res = await authRequest(`/api/ip/${googleFixture.ip}`).send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data.ip).toEqual(googleFixture.ip)
        expect(res.body.data.ipNo).toEqual(googleFixture.ipNo)
        expect(res.body.data.countryShort).toEqual(googleFixture.countryShort)
        expect(res.body.data.countryLong).toEqual(googleFixture.countryLong)
        expect(res.body.data.region).toEqual(googleFixture.region)
        expect(res.body.data.city).toEqual(googleFixture.city)
        expect(res.body.data.zipCode).toEqual(googleFixture.zipCode)
        expect(res.body.data.latitude).toEqual(googleFixture.latitude)
        expect(res.body.data.longitude).toEqual(googleFixture.longitude)
        expect(res.body.data.timeZone).toEqual(googleFixture.timeZone)
    })

    it('should yield zeroed fields', async () => {
        const zeroedFixture = {
            'ip':	         "0.0.0.0",
            'ipNo':	         "0",
            'countryShort':	 "-",
            'countryLong':	 "-",
            'region':	     "-",
            'city':	         "-",
            'zipCode':	     "-",
            'latitude':	     0,
            'longitude':	 0,
            'timeZone':	     "-",
        }

        const res = await authRequest(`/api/ip/${zeroedFixture.ip}`).send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data.ip).toEqual(zeroedFixture.ip)
        expect(res.body.data.ipNo).toEqual(zeroedFixture.ipNo)
        expect(res.body.data.countryShort).toEqual(zeroedFixture.countryShort)
        expect(res.body.data.countryLong).toEqual(zeroedFixture.countryLong)
        expect(res.body.data.region).toEqual(zeroedFixture.region)
        expect(res.body.data.city).toEqual(zeroedFixture.city)
        expect(res.body.data.zipCode).toEqual(zeroedFixture.zipCode)
        expect(res.body.data.latitude).toEqual(zeroedFixture.latitude)
        expect(res.body.data.longitude).toEqual(zeroedFixture.longitude)
        expect(res.body.data.timeZone).toEqual(zeroedFixture.timeZone)
    })
})
