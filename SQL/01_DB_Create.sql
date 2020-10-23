USE [master]

if db_id('FullstackCapstone') IS NULL 
		CREATE DATABASE [FullstackCapstone]
GO

USE [FullstackCapstone]
GO


ALTER TABLE [Likes] DROP CONSTRAINT [FK_Likes_Post];
ALTER TABLE [Favorites] DROP CONSTRAINT [FK_Favorites_Post];
ALTER TABLE [Comments] DROP CONSTRAINT [FK_Comments_Post];
ALTER TABLE [ArtPost] DROP CONSTRAINT [FK_ArtPost_ArtType];
ALTER TABLE [ArtPost] DROP CONSTRAINT [FK_ArtPost_Category];
ALTER TABLE [Message] DROP CONSTRAINT [FK_Message_OpenMessenger];
ALTER TABLE [Notifications] DROP CONSTRAINT [FK_Notifications_MessageType];
ALTER TABLE [UserProfile] DROP CONSTRAINT [FK_UserProfile_PrimaryFocus];
ALTER TABLE [ArtPost] DROP CONSTRAINT [FK_ArtPost_UserProfile];
ALTER TABLE [Comments] DROP CONSTRAINT [FK_Comments_UserProfile];
ALTER TABLE [Commissions] DROP CONSTRAINT [FK_Commissions_Artist];
ALTER TABLE [Commissions] DROP CONSTRAINT [FK_Commissions_UserProfile];
ALTER TABLE [Favorites] DROP CONSTRAINT [FK_Favorites_UserProfile];
ALTER TABLE [Following] DROP CONSTRAINT [FK_Following_SubscribedTo];
ALTER TABLE [Following] DROP CONSTRAINT [FK_Following_Subscriber];
ALTER TABLE [Likes] DROP CONSTRAINT [FK_Likes_UserProfile];
ALTER TABLE [Message] DROP CONSTRAINT [FK_Message_UserProfile];
ALTER TABLE [Notifications] DROP CONSTRAINT [FK_Notifications_EventOriginator];
ALTER TABLE [Notifications] DROP CONSTRAINT [FK_Notifications_UserProfile];
ALTER TABLE [OpenMessenger] DROP CONSTRAINT [FK_OpenMessenger_UserOne];
ALTER TABLE [OpenMessenger] DROP CONSTRAINT [FK_OpenMessenger_UserTwo];



GO

DROP TABLE IF EXISTS [MessageType]
DROP TABLE IF EXISTS [PrimaryFocus]
DROP TABLE IF EXISTS [ArtType]
DROP TABLE IF EXISTS [Comments]
DROP TABLE IF EXISTS [Likes]
DROP TABLE IF EXISTS [Following]
DROP TABLE IF EXISTS [Favorites]
DROP TABLE IF EXISTS [Commissions]

DROP TABLE IF EXISTS [Notifications]
DROP TABLE IF EXISTS [OpenMessenger]
DROP TABLE IF EXISTS [UserProfile]
DROP TABLE IF EXISTS [Message]
DROP TABLE IF EXISTS [Categories]
DROP TABLE IF EXISTS [UserProfile]
DROP TABLE IF EXISTS [ArtPost]







CREATE TABLE [ArtType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL
)


CREATE TABLE [PrimaryFocus] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL
)


CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Image] nvarchar(255) NOT NULL,
  [FireBaseUserId] NVARCHAR(28) NOT NULL,
  [FullName] nvarchar(50) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [PrimaryFocusId] integer NOT NULL,
  [Description] text NOT NULL,
  
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId),
  CONSTRAINT [FK_UserProfile_PrimaryFocus] FOREIGN KEY ([PrimaryFocusId]) REFERENCES [PrimaryFocus] ([Id])
)

CREATE TABLE [Categories] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL,
 

  
)

CREATE TABLE [ArtPost] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer,
  [Image] nvarchar(255) NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [PostDate] datetime NOT NULL,
  [Description] text NOT NULL,
  [CategoryId] integer NOT NULL,
  [ArtTypeId] integer NOT NULL,
  [IsDeleted] integer NOT NULL DEFAULT 0,

  CONSTRAINT [FK_ArtPost_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_ArtPost_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]),
  CONSTRAINT [FK_ArtPost_ArtType] FOREIGN KEY ([ArtTypeId]) REFERENCES [ArtType] ([Id])
)



CREATE TABLE [Comments] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [PostId] integer NOT NULL,
  [Content] text NOT NULL,

  CONSTRAINT [FK_Comments_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Comments_Post] FOREIGN KEY ([PostId]) REFERENCES [ArtPost] ([Id])
)


CREATE TABLE [Likes] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [PostId] integer NOT NULL

CONSTRAINT [FK_Likes_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
CONSTRAINT [FK_Likes_Post] FOREIGN KEY ([PostId]) REFERENCES [ArtPost] ([Id])
)


CREATE TABLE [Following] (
  [Id] integer PRIMARY KEY IDENTITY,
  [SubscriberId] integer NOT NULL, 
  [SubscribedToId] integer NOT NULL

  CONSTRAINT [FK_Following_Subscriber] FOREIGN KEY ([SubscriberId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Following_SubscribedTo] FOREIGN KEY ([SubscribedToId]) REFERENCES [UserProfile] ([Id])
)


CREATE TABLE [Favorites] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [PostId] integer NOT NULL

  CONSTRAINT [FK_Favorites_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Favorites_Post] FOREIGN KEY ([PostId]) REFERENCES [ArtPost] ([Id])
)






CREATE TABLE [Commissions] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [ArtistId] integer NOT NULL,
  [Rate] nvarchar(255) NOT NULL,
  [Message] text NOT NULL,
  [IsAccepted] integer

   CONSTRAINT [FK_Commissions_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
    CONSTRAINT [FK_Commissions_Artist] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [MessageType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL
)

CREATE TABLE [Notifications] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [EventOriginatorId] integer NOT NULL,
  [MessageTypeId] integer NOT NULL,
  [Message] text NOT NULL

   CONSTRAINT [FK_Notifications_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
    CONSTRAINT [FK_Notifications_EventOriginator] FOREIGN KEY ([EventOriginatorId]) REFERENCES [UserProfile] ([Id]),
     CONSTRAINT [FK_Notifications_MessageType] FOREIGN KEY ([MessageTypeId]) REFERENCES [MessageType] ([Id])
)




CREATE TABLE [OpenMessenger] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserOneId] integer NOT NULL,
  [UserTwoId] integer NOT NULL,
  [IsDeleted] integer NOT NULL DEFAULT 0,

   CONSTRAINT [FK_OpenMessenger_UserOne] FOREIGN KEY ([UserOneId]) REFERENCES [UserProfile] ([Id]),
    CONSTRAINT [FK_OpenMessenger_UserTwo] FOREIGN KEY ([UserTwoId]) REFERENCES [UserProfile] ([Id])
     
)


CREATE TABLE [Message] (
  [Id] integer PRIMARY KEY IDENTITY,
  [OpenMessengerId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  [Content] text NOT NULL,
  [Time] datetime NOT NULL

   CONSTRAINT [FK_Message_OpenMessenger] FOREIGN KEY ([OpenMessengerId]) REFERENCES [OpenMessenger] ([Id]),
    CONSTRAINT [FK_Message_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)










GO
