import { test, expect, request } from '@playwright/test';
import { API_URLS, API_CREDENTIALS, BOOKING_PAYLOAD } from '../../data/apiData';

let authToken: string;
let bookingId: number;

test.describe('Restful Booker API', () => {
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async () => {
        const context = await request.newContext({ baseURL: API_URLS.base });
        const response = await context.post(API_URLS.auth, {
            data: API_CREDENTIALS.valid,
        });
        const body = await response.json();
        console.log('=== AUTH ===');
        console.log('Status:', response.status());
        console.log('Body:', JSON.stringify(body, null, 2));
        authToken = body.token;
        console.log('Token captured:', authToken);
        expect(response.status()).toBe(200);
        await context.dispose();
    });

    test('GET - should return list of bookings', async ({ request }) => {
        const response = await request.get(`${API_URLS.base}${API_URLS.booking}`);
        const body = await response.json();
        console.log('=== GET ALL BOOKINGS ===');
        console.log('Status:', response.status());
        console.log('Body:', JSON.stringify(body, null, 2));
        expect(response.status()).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
    });

    test('POST - should create a new booking', async ({ request }) => {
        const response = await request.post(`${API_URLS.base}${API_URLS.booking}`, {
            data: BOOKING_PAYLOAD.valid,
        });
        const body = await response.json();
        console.log('=== POST CREATE BOOKING ===');
        console.log('Status:', response.status());
        console.log('Body:', JSON.stringify(body, null, 2));
        bookingId = body.bookingid;
        console.log('BookingId captured:', bookingId);
        expect(response.status()).toBe(200);
        expect(body.bookingid).toBeDefined();
        expect(body.booking.firstname).toBe(BOOKING_PAYLOAD.valid.firstname);
        expect(body.booking.lastname).toBe(BOOKING_PAYLOAD.valid.lastname);
    });

    test('GET - should retrieve created booking by ID', async ({ request }) => {
        console.log('=== GET BOOKING BY ID ===');
        console.log('Using bookingId:', bookingId);
        console.log('Using authToken:', authToken);
        const response = await request.get(`${API_URLS.base}${API_URLS.booking}/${bookingId}`);
        const body = await response.json();
        console.log('Status:', response.status());
        console.log('Body:', JSON.stringify(body, null, 2));
        expect(response.status()).toBe(200);
        expect(body.firstname).toBe(BOOKING_PAYLOAD.valid.firstname);
        expect(body.lastname).toBe(BOOKING_PAYLOAD.valid.lastname);
    });

    test('PUT - should update booking with valid auth token', async ({ request }) => {
        console.log('=== PUT UPDATE BOOKING ===');
        console.log('Using bookingId:', bookingId);
        console.log('Using authToken:', authToken);
        const response = await request.put(`${API_URLS.base}${API_URLS.booking}/${bookingId}`, {
            headers: {
                'Cookie': `token=${authToken}`,
                'Accept': 'application/json',
            },
            data: BOOKING_PAYLOAD.updated,
        });
        const body = await response.json();
        console.log('Status:', response.status());
        console.log('Body:', JSON.stringify(body, null, 2));
        expect(response.status()).toBe(200);
        expect(body.firstname).toBe(BOOKING_PAYLOAD.updated.firstname);
        expect(body.totalprice).toBe(BOOKING_PAYLOAD.updated.totalprice);
    });

    test('DELETE - should delete booking with valid auth token', async ({ request }) => {
        console.log('=== DELETE BOOKING ===');
        console.log('Using bookingId:', bookingId);
        console.log('Using authToken:', authToken);
        const response = await request.delete(`${API_URLS.base}${API_URLS.booking}/${bookingId}`, {
            headers: {
                'Cookie': `token=${authToken}`,
            },
        });
        const body = await response.text();
        console.log('Status:', response.status());
        console.log('Body:', body);
        expect(response.status()).toBe(201);
    });

    test('NEGATIVE - should return 403 when deleting with invalid token', async ({ request }) => {
        const response = await request.delete(`${API_URLS.base}${API_URLS.booking}/1`, {
            headers: {
                'Cookie': 'token=invalid_token_123',
            },
        });
        const body = await response.text();
        console.log('=== NEGATIVE DELETE INVALID TOKEN ===');
        console.log('Status:', response.status());
        console.log('Body:', body);
        expect(response.status()).toBe(403);
    });

    test('NEGATIVE - should return 404 when getting non-existent booking', async ({ request }) => {
        const response = await request.get(`${API_URLS.base}${API_URLS.booking}/999999`);
        const body = await response.text();
        console.log('=== NEGATIVE GET NON-EXISTENT BOOKING ===');
        console.log('Status:', response.status());
        console.log('Body:', body);
        expect(response.status()).toBe(404);
    });

    test('NEGATIVE - should fail auth with invalid credentials', async () => {
        const context = await request.newContext({ baseURL: API_URLS.base });
        const response = await context.post(API_URLS.auth, {
            data: API_CREDENTIALS.invalid,
        });
        const body = await response.json();
        console.log('=== NEGATIVE AUTH INVALID CREDENTIALS ===');
        console.log('Status:', response.status());
        console.log('Body:', JSON.stringify(body, null, 2));
        expect(response.status()).toBe(200);
        expect(body.reason).toBe('Bad credentials');
        await context.dispose();
    });
});