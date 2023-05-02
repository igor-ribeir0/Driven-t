import bookingRepository from '../../repositories/booking-repository';
import { notFoundError, unauthorizedError } from '@/errors';

async function getBookingWithUserId(userId: number) {
  const bookingWithUserId = await bookingRepository.findBookingWithUserId(userId);

  if (!bookingWithUserId) throw notFoundError();

  return bookingWithUserId;
}

async function getRoomById(roomId: number) {
  const searchRoomWithRoomId = await bookingRepository.findRoomByRoomId(roomId);
  const numberOfVacancies = await bookingRepository.findNumberOfVacancies(roomId);

  if (!searchRoomWithRoomId) throw notFoundError();
  if (numberOfVacancies === searchRoomWithRoomId.capacity) throw unauthorizedError();

  return searchRoomWithRoomId;
}

async function searchBookingWithUserId(userId: number) {
  const searchBooking = await bookingRepository.findBookingWithUserId(userId);

  if (!searchBooking) throw unauthorizedError();
}

async function creatingBooking(roomId: number, userId: number) {
  await bookingRepository.insertNewBooking(roomId, userId);

  return 'OK';
}

const bookingService = {
  getBookingWithUserId,
  getRoomById,
  searchBookingWithUserId,
  creatingBooking,
};

export default bookingService;
