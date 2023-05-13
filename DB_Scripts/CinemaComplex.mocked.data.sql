USE [CinemaBooking]
GO

INSERT INTO [dbo].[Cinema]
           ([name])
     VALUES
           ('Cinema 1'),
           ('Cinema 2'),
           ('Cinema 3'),
           ('Cinema 4'),
           ('Cinema 5'),
           ('Cinema 6')
GO

USE [CinemaBooking]
GO

INSERT INTO [dbo].[Complex]
           ([name])
     VALUES
           ('Menlyn Park'),
			('Emperors Palace'),
			('Board Walk'),
			('The Glen'),
			('Clearwater'),
			('Bedford'),
			('Fourways'),
			('Fourways'),
			('The Strip')
GO

USE [CinemaBooking]
GO

INSERT INTO [dbo].[CinemaComplex]
           ([complexId]
           ,[cinemaId])
     VALUES
           (1,1),
           (1,2),
           (1,3),
           (1,4),
		   		 (2,1),
           (2,2),
           (2,3),
           (2,4),
		   		 (3,1),
           (3,2),
           (3,3),
           (3,4),
           (3,5),
		   		 (4,1),
           (4,2),
           (4,3),
           (4,4),
           (4,5),
           (4,6),
		   		 (5,1),
           (5,2),
		   		 (6,1),
           (6,2),
           (6,3),
           (6,4),
		   		 (7,1),
           (7,2),
           (7,3),
		   		 (8,1),
           (8,2),
           (8,3),
           (8,4),
           (8,5),
           (8,6),
		   		 (9,1),
           (9,2),
           (9,3),
           (9,4),
           (9,5),
           (9,6)
GO

INSERT INTO [dbo].[Seat]
           ([seatRow], [seatNumber])
     VALUES
            ('a', '1'),
						('a', '2'),
						('a', '3'),
						('a', '4'),
						('a', '5'),
						('a', '6'),
						('b', '1'),
						('b', '2'),
						('b', '3'),
						('b', '4'),
						('b', '5'),
						('b', '6'),
						('b', '7'),
						('b', '8'),
						('c', '1'),
						('c', '2'),
						('c', '3'),
						('c', '4'),
						('c', '5'),
						('c', '6'),
						('c', '7'),
						('c', '8'),
						('d', '1'),
						('d', '2'),
						('d', '3'),
						('d', '4'),
						('d', '5'),
						('d', '6'),
						('d', '7'),
						('d', '8'),
						('d', '9'),
						('e', '1'),
						('e', '2'),
						('e', '3'),
						('e', '4'),
						('e', '5'),
						('e', '6'),
						('e', '7'),
						('e', '8'),
						('e', '9'),
						('f', '1'),
						('f', '2'),
						('f', '3'),
						('f', '4'),
						('f', '5'),
						('f', '6'),
						('f', '7'),
						('f', '8'),
						('f', '9')
GO

INSERT INTO [Shows]
			([startDateTime], [endDateTime])
		VALUES
		(CAST('2023-05-18T10:30:00.000' AS DateTime), CAST('2023-05-18T12:30:00.000' AS DateTime)),
		(CAST('2023-05-18T14:30:00.000' AS DateTime), CAST('2023-05-18T16:30:00.000' AS DateTime))
GO

INSERT INTO [Movie]
			([name], [apiMovieId], [startDate], [endDate])
		VALUES
		('Evil Dead Rise', 713704, CAST('2023-05-11' as date), CAST('2023-05-20' AS DATE)),
		('Ant-Man and the Wasp: Quantumania', 640146, CAST('2023-05-11' as date), CAST('2023-05-20' AS DATE)),
		('The Super Mario Bros. Movie', 502356, CAST('2023-05-11' as date), CAST('2023-05-20' AS DATE)),
		('Guardians of the Galaxy Vol. 3', 447365, CAST('2023-05-11' as date), CAST('2023-05-20' AS DATE)),
		('Ghosted', 868759, CAST('2023-05-11' as date), CAST('2023-05-20' AS DATE)),
		('Avatar: The Way of Water', 76600, CAST('2023-05-11' as date), CAST('2023-05-20' AS DATE)),

		('Shazam! Fury of the Gods', 594767, CAST('2023-05-21' as date), CAST('2023-05-31' AS DATE)),
		('Creed III', 677179, CAST('2023-05-21' as date), CAST('2023-05-31' AS DATE)),
		('Scream VI', 934433, CAST('2023-05-21' as date), CAST('2023-05-31' AS DATE)),
		('The Last Kingdom: Seven Kings Must Die', 948713, CAST('2023-05-21' as date), CAST('2023-05-31' AS DATE)),
		('John Wick: Chapter 4"', 603692, CAST('2023-05-21' as date), CAST('2023-05-31' AS DATE)),
		('Peter Pan & Wendy', 420808, CAST('2023-05-21' as date), CAST('2023-05-31' AS DATE))
GO

INSERT INTO [Extras]
			([name], [price])
		VALUES
		('Popcorn', 40.00),
		('3D Glasses', 35.00),
		('Smarties', 25.00),
		('Soft Drink', 25.00),
		('Whispers Chocolate', 40.00),
		('Allsorts', 40.00)
GO

INSERT INTO [Booking]
			([email])
		VALUES
		('lisan@bbd.co.za')
GO

INSERT INTO [BookingExtras]
			([bookingId], [extrasId])
		VALUES
		(1, 1),
		(1, 2)
GO

INSERT INTO [CinemaMovie]
			([cinemaComplexId], [movieId], [showId])
		VALUES
		(1, 1, 2),
		(1, 1, 1)
GO


INSERT INTO [Ticket]
			([cinemaMovieId], [bookingId], [price])
		VALUES
		(2, 1, 180.50)
GO

INSERT INTO [MovieSeat]
			([showId], [seatId], [ticketId], [cinemaMovieId])
		VALUES
		(1, 5, 1, 2)
GO






