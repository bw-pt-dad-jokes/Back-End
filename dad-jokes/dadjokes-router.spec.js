const server = require('./dadjokes-router');
const request = require('supertest');

describe('GET /', () => {
    it('returns 200', () => {
        return request(server).get('/')
        .then( res => {
            expect(res.status).toBe(200)
        })
    })
    it('should run the testing env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
});

describe('POST /', () => {
    it('returns 201', () => {
        return request(server).get('/')
        .then( res => {
            expect(res.status).toBe(201);
        })
    })
    it('should run the testing env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
});

describe('DELETE /:id', () => {
    it('returns 204', () => {
        return request(server).get('/:id')
        .then( res => {
            expect(res.status).toBe(204);
        })
    })
    it('should run the testing env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
});