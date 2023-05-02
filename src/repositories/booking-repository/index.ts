import { prisma } from '@/config';

async function findBookingWithUserId(userId: number) {
  const findBooking = await prisma.booking.findFirst({
    where: { id: userId },
  });

  const findRoom = await prisma.room.findFirst({
    where: { id: findBooking.roomId },
  });

  const findHotel = await prisma.hotel.findFirst({
    where: { id: findRoom.hotelId },
  });

  return {
    id: findBooking.id,
    Room: {
      name: findRoom.name,
      capacity: findRoom.capacity,
      hotel: findHotel.name,
      imageHotel: findHotel.image,
    },
  };
}

async function findRoomByRoomId(roomId: number) {
  return await prisma.room.findFirst({
    where: { id: roomId },
  });
}

async function findNumberOfVacancies(roomId: number) {
  return await prisma.booking.count({
    where: { roomId: roomId },
  });
}

async function insertNewBooking(roomId: number, userId: number) {
  await prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId,
    },
  });

  return 'OK';
}

const bookingRepository = {
  findBookingWithUserId,
  findRoomByRoomId,
  findNumberOfVacancies,
  insertNewBooking,
};

export default bookingRepository;
