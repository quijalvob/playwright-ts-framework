export const API_URLS = {
  base: 'https://restful-booker.herokuapp.com',
  auth: '/auth',
  booking: '/booking',
};

export const API_CREDENTIALS = {
  valid: {
    username: 'admin',
    password: 'password123',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};

export const BOOKING_PAYLOAD = {
  valid: {
    firstname: 'Bobby',
    lastname: 'Quijalvo',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-01-01',
      checkout: '2024-01-07',
    },
    additionalneeds: 'Breakfast',
  },
  updated: {
    firstname: 'Updated',
    lastname: 'Name',
    totalprice: 999,
    depositpaid: false,
    bookingdates: {
      checkin: '2025-01-01',
      checkout: '2025-01-10',
    },
    additionalneeds: 'Dinner',
  },
};