import { Router } from 'express';
import { getBookingByUser, createBooking } from '@/controllers/booking-controller';
import { authenticateToken } from '@/middlewares';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken);
bookingRouter.get('/booking', getBookingByUser);
bookingRouter.post('/booking', createBooking);
