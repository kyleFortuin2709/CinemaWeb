USE [master]
GO

DROP DATABASE IF EXISTS [CinemaBooking]
GO

CREATE DATABASE [CinemaBooking]
GO

USE [CinemaBooking]
GO

CREATE TABLE [Complex] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [name] NVARCHAR(255) NOT NULL,
)
GO

CREATE TABLE [Cinema] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [name] NVARCHAR(255) NOT NULL
)
GO

CREATE TABLE [CinemaComplex] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [complexId] INT NOT NULL,
  [cinemaId] INT NOT NULL
)
GO

CREATE TABLE [Seat] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [seatRow] NVARCHAR(4) NOT NULL,
  [seatNumber] INT NOT NULL
)
GO
select * from [Seat]

CREATE TABLE [Movie] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [name] NVARCHAR(255) NOT NULL,
  [apiMovieId] int NOT NULL,
  [startDate] DATE NOT NULL,
  [endDate] DATE NOT NULL
)
GO

CREATE TABLE [MovieSeat] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [showId] int not null,
  [seatId] INT NOT NULL,
  [ticketId] INT NOT NULL,
  [cinemaMovieId] INT NOT NULL
)
GO

CREATE TABLE [CinemaMovie] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [cinemaComplexId] INT NOT NULL,
  [movieId] INT NOT NULL,
  [showId] INT NOT NULL
)
GO

CREATE TABLE [Ticket] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [cinemaMovieId] INT NOT NULL,
  [bookingId] INT NOT NULL,
  [price] DECIMAL(15,2) NOT NULL
)
GO

CREATE TABLE [Extras] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [name] NVARCHAR(255) NOT NULL,
  [price] DECIMAL(15,2) NOT NULL
)
GO

CREATE TABLE [Booking] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [email] NVARCHAR(255) NOT NULL,
  [refNo] UNIQUEIDENTIFIER DEFAULT NEWID()
)
GO

CREATE TABLE [BookingExtras] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [bookingId] INT NOT NULL,
  [extrasId] INT NOT NULL
)
GO

CREATE TABLE [Shows] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [startDateTime] DATETIME NOT NULL,
  [endDateTime] DATETIME NOT NULL,
)

ALTER TABLE [CinemaComplex] ADD FOREIGN KEY ([cinemaId]) REFERENCES [Cinema] ([id])
GO

ALTER TABLE [CinemaComplex] ADD FOREIGN KEY ([complexId]) REFERENCES [Complex] ([id])
GO

ALTER TABLE [MovieSeat] ADD FOREIGN KEY ([seatId]) REFERENCES [Seat] ([id])
GO

ALTER TABLE [MovieSeat] ADD FOREIGN KEY ([cinemaMovieId]) REFERENCES [CinemaMovie] ([id])
GO

ALTER TABLE [MovieSeat] ADD FOREIGN KEY ([ticketId]) REFERENCES [Ticket] ([id])
GO

ALTER TABLE [CinemaMovie] ADD FOREIGN KEY ([cinemaComplexId]) REFERENCES [CinemaComplex] ([id])
GO

ALTER TABLE [CinemaMovie] ADD FOREIGN KEY ([movieId]) REFERENCES [Movie] ([id])
GO

ALTER TABLE [CinemaMovie] ADD FOREIGN KEY ([showId]) REFERENCES [Shows] ([id])
GO

ALTER TABLE [Ticket] ADD FOREIGN KEY ([cinemaMovieId]) REFERENCES [CinemaMovie] ([id])
GO

ALTER TABLE [Ticket] ADD FOREIGN KEY ([bookingId]) REFERENCES [Booking] ([id])
GO

ALTER TABLE [BookingExtras] ADD FOREIGN KEY ([bookingId]) REFERENCES [Booking] ([id])
GO

ALTER TABLE [BookingExtras] ADD FOREIGN KEY ([extrasId]) REFERENCES [Extras] ([id])
GO

ALTER TABLE [MovieSeat] ADD FOREIGN KEY ([showId]) REFERENCES [Shows] ([id])
GO

CREATE OR ALTER VIEW [CinemaComplexView] AS
	SELECT
		 com.id AS complexId,
		 com.name AS complexName,
		 cin.id AS CinemaId,
		 cin.name AS CinemaName
	FROM dbo.Complex com
	JOIN dbo.CinemaComplex cc
		ON com.id = cc.cinemaId
	JOIN dbo.Cinema cin
		ON cin.id = cc.cinemaId
GO


--use master
--go

--drop database [CinemaBooking]
--go