

USE [FullstackCapstone]
GO

set identity_insert [ArtType] on
insert into ArtType (Id, Name) values(1, '3D')
insert into ArtType (Id, Name) values(2, '2D')
set identity_insert [ArtType] off

set identity_insert [MessageType] on
insert into MessageType (Id, Name) values(1, 'like')
insert into MessageType (Id, Name) values(2, 'comment')
insert into MessageType (Id, Name) values(3, 'follow')
set identity_insert [MessageType] off

set identity_insert [PrimaryFocus] on
insert into PrimaryFocus(Id, Name) values(1, '3D')
insert into PrimaryFocus(Id, Name) values(2, '2D')
set identity_insert [PrimaryFocus] off

set identity_insert [Categories] on
insert into Categories(Id, Name) values (1, 'Illustration')
insert into Categories(Id, Name) values (2, 'Anatomy')
insert into Categories(Id, Name) values (3, 'Comics')
insert into Categories(Id, Name) values (4, 'Anime/Manga')
insert into Categories(Id, Name) values (5, 'Portraits')
insert into Categories(Id, Name) values (6, 'Character Design')
insert into Categories(Id, Name) values (7, 'Creature Design')
insert into Categories(Id, Name) values (8, 'Stylized')
insert into Categories(Id, Name) values (9, 'Realism')
insert into Categories(Id, Name) values (10, 'Architecture')
insert into Categories(Id, Name) values (11, 'Fantasy')
insert into Categories(Id, Name) values (12, 'Objects')
insert into Categories(Id, Name) values (13, 'Weapons')
insert into Categories(Id, Name) values (14, 'Science Fiction')
set identity_insert [Categories] off

set identity_insert [UserProfile] on
insert into UserProfile(Id, Image,FireBaseUserId, FullName, DisplayName, Email, PrimaryFocusId, Description) values(1, 'https://cdnb.artstation.com/p/assets/images/images/031/366/305/large/emma-main-angle.jpg?1603397638', 'eCDjXa8NT7TXTZjw8VLEhGsJihu2', 'Tyler Hilliard', 'Lykrin', 'lykrin@admin.com', 1, 'An avid 3D artist and animator')
set identity_insert [UserProfile] off

set identity_insert [ArtPost] on
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted) values(1, 1, 'https://cdnb.artstation.com/p/assets/images/images/031/366/305/large/emma-main-angle.jpg?1603397638', 'Mushrooms!!', '2020-10-23', 'A stylized mushroom for your pleasureable viewing experience.', 8, 1, 0 )
set identity_insert [ArtPost] off

GO
