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
  [showId] Int NOT NULL,
  [booked] BIT,
  [seatId] INT NOT NULL,
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
  [price] DECIMAL(15,2) NOT NULL,
  [movieSeatId] INT NOT NUll
)
GO

CREATE TABLE [Extras] (
  [id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [name] NVARCHAR(255) NOT NULL,
  [price] DECIMAL(15,2) NOT NULL,
  [imagePath] NVARCHAR(255) NOT NULL
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

ALTER TABLE [Ticket] ADD FOREIGN KEY ([movieSeatId]) REFERENCES [MovieSeat] ([id])
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
		 cin.id AS cinemaId,
		 cin.name AS cinemaName,
		 cc.id as cinemaComplexId
	FROM dbo.Complex com
	JOIN dbo.CinemaComplex cc
		ON com.id = cc.complexId
	JOIN dbo.Cinema cin
		ON cin.id = cc.cinemaId
GO

CREATE OR ALTER VIEW [CinemaMovieView] AS
	SELECT
		cm.id AS cinemaMovieId,
		cm.cinemaComplexId,
		ccv.complexId,
		ccv.complexName,
		ccv.cinemaId,
		ccv.cinemaName,
		cm.movieId,
		m.name,
		cm.showId,
		s.startDateTime,
		s.endDateTime	
	FROM CinemaMovie cm
	LEFT JOIN Movie m
		ON m.id = cm.movieId
	LEFT JOIN Shows s
		ON s.id = cm.showId
	JOIN CinemaComplexView ccv
		ON ccv.cinemaComplexId = cm.cinemaComplexId