USE [master]
GO

DROP DATABASE IF EXISTS [CinemaBooking]
GO

CREATE DATABASE [CinemaBooking]
GO

USE [CinemaBooking]
GO

CREATE TABLE [Complex] (
  [id] uniqueidentifier PRIMARY KEY default NEWID(),
  [name] nvarchar(255)
)
GO

CREATE TABLE [Cinema] (
  [id] uniqueidentifier PRIMARY KEY default NEWID(),
  [name] nvarchar(255)
)
GO

CREATE TABLE [CinemaComplex] (
  [id] uniqueidentifier PRIMARY KEY default NEWID(),
  [complexId] integer,
  [cinemaId] integer
)
GO

CREATE TABLE [Seat] (
  [id] uniqueidentifier PRIMARY KEY default NEWID(),
  [cinemaId] integer,
  [seatRow] nvarchar(255),
  [seatNumber] integer
)
GO

CREATE TABLE [Movie] (
  [id] uniqueidentifier PRIMARY KEY default NEWID(),
  [name] nvarchar(255)
)
GO

CREATE TABLE [MovieSeat] (
  [id] uniqueidentifier PRIMARY KEY default NEWID(),
  [booked] bit,
  [seatId] uniqueidentifier,
  [ticketId] uniqueidentifier,
  [cinemaMovieId] uniqueidentifier
)
GO

CREATE TABLE [CinemaMovie] (
  [id] uniqueidentifier PRIMARY KEY default NEWID(),
  [cinemaId] UNIQUEIDENTIFIER,
  [movieId] UNIQUEIDENTIFIER,
  [date] date,
  [time] time
)
GO

CREATE TABLE [Ticket] (
  [id] uniqueidentifier PRIMARY KEY default NEWID(),
  [cinemaMovieId] UNIQUEIDENTIFIER,
  [bookingId] UNIQUEIDENTIFIER,
  [price] decimal(15,2)
)
GO

CREATE TABLE [Extras] (
  [id] uniqueidentifier PRIMARY KEY default NEWID(),
  [name] nvarchar(255),
  [price] decimal(15,2)
)
GO

CREATE TABLE [Booking] (
  [id] uniqueidentifier PRIMARY KEY default NEWID(),
  [email] nvarchar(255),
  [refNo] uniqueidentifier default NEWID()
)
GO

CREATE TABLE [BookingExtras] (
  [id] uniqueidentifier PRIMARY KEY default NEWID(),
  [bookingId] integer,
  [extrasId] integer
)
GO

ALTER TABLE [CinemaComplex] ADD FOREIGN KEY ([cinemaId]) REFERENCES [Cinema] ([id])
GO

ALTER TABLE [CinemaComplex] ADD FOREIGN KEY ([complexId]) REFERENCES [Complex] ([id])
GO

ALTER TABLE [Seat] ADD FOREIGN KEY ([cinemaId]) REFERENCES [Cinema] ([id])
GO

ALTER TABLE [MovieSeat] ADD FOREIGN KEY ([seatId]) REFERENCES [Seat] ([id])
GO

ALTER TABLE [MovieSeat] ADD FOREIGN KEY ([cinemaMovieId]) REFERENCES [CinemaMovie] ([id])
GO

ALTER TABLE [MovieSeat] ADD FOREIGN KEY ([ticketId]) REFERENCES [Ticket] ([id])
GO

ALTER TABLE [CinemaMovie] ADD FOREIGN KEY ([cinemaId]) REFERENCES [Cinema] ([id])
GO

ALTER TABLE [CinemaMovie] ADD FOREIGN KEY ([movieId]) REFERENCES [Movie] ([id])
GO

ALTER TABLE [Ticket] ADD FOREIGN KEY ([cinemaMovieId]) REFERENCES [CinemaMovie] ([id])
GO

ALTER TABLE [Ticket] ADD FOREIGN KEY ([bookingId]) REFERENCES [Booking] ([id])
GO

ALTER TABLE [BookingExtras] ADD FOREIGN KEY ([bookingId]) REFERENCES [Booking] ([id])
GO

ALTER TABLE [BookingExtras] ADD FOREIGN KEY ([extrasId]) REFERENCES [Extras] ([id])
GO
