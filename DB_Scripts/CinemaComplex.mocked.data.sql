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
			('The Strip'),
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

