

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
insert into UserProfile(Id, Image,FireBaseUserId, FullName, DisplayName, Email, PrimaryFocusId, Description) values(1, 'https://cdnb.artstation.com/p/assets/images/images/031/366/305/large/emma-main-angle.jpg?1603397638', 'eCDjXa8NT7TXTZjw8VLEhGsJihu2', 'Tyler Hilliard', 'Lykrin', 'lykrin@admin.com', 2, 'An avid 3D artist and animator')
insert into UserProfile(Id, Image,FireBaseUserId, FullName, DisplayName, Email, PrimaryFocusId, Description) values(2, 'https://cdnb.artstation.com/p/assets/images/images/031/366/305/large/emma-main-angle.jpg?1603397638', 'EiP0fZLeiEXPFnLVCoTPMafBtXR2', 'Sarah Sanderson', 'Sarah', 'sarah@admin.com', 1, 'An avid 2D artist.')
insert into UserProfile(Id, Image,FireBaseUserId, FullName, DisplayName, Email, PrimaryFocusId, Description) values(3, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1602875012/nrqqy4fgaalzhe9rllyd.png', 'BsmBfcAu1ANZNeYfvfOpLoQNavo2', 'Kaliph Anderson', 'Kai', 'kai@admin.com', 2, 'A extrmely devoted 3D artist specializing in styled characters and creatures.')
insert into UserProfile(Id, Image,FireBaseUserId, FullName, DisplayName, Email, PrimaryFocusId, Description) values(4, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1597455011/Paladin-Logo_fnbeee.png', 'tLckuGwkD6Yktwro0F7PcJESZQD2', 'Ethan Neal', 'Ethan', 'ethan@admin.com', 1, 'A 2D focused writer and character artist.')
insert into UserProfile(Id, Image,FireBaseUserId, FullName, DisplayName, Email, PrimaryFocusId, Description) values(5, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1597455011/Ranger-Logo_fx5hh3.png', 'bPnSAjHxhddArp1pvIV4p19NFG02', 'Katie Adams', 'Katie', 'katie@admin.com', 1, 'A 2D artist and animator.')
set identity_insert [UserProfile] off

set identity_insert [ArtPost] on
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(1, 1, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464479/Tyler_Image_8_n33dap.png', 'Mushrooms!!', '2020-10-23', 'A stylized mushroom for your pleasureable viewing experience.', 8, 2, 0, 5 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(2, 1, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464474/Tyler_Image_7_cpxc7x.png', 'Orders Up Kitchen', '2020-10-29', 'A 3D kitchen for my animation capstone.', 6, 2, 0, 25 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(3, 1, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464464/Tyler_Image_6_pqdi18.png', 'Orders Up Fried Rice', '2020-10-25', 'A 3D bowl of rice with the main character Chris in my animation capstone.', 8, 2, 0, 36 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(4, 1, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464457/Tyler_Image_5_h2l4hu.png', '24 Hour Animation Contest', '2020-10-30', 'A still from my animation for the 24 hour animation contest that won 10th place out of 225 teams.', 8, 2, 0, 12 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(5, 1, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464440/Tyler_Image_2_a3irpi.jpg', 'Character Bust', '2020-11-03', 'A 3D realistic sculpt of a MMA fighter that I created for practice.', 10, 2, 0, 56 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(6, 1, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464444/Tyler_Image_3_o1mz8s.jpg', 'Moogle!', '2020-10-21', 'A moogle sculpt based on the moogles from FInal Fantasy XIV.', 6, 2, 0, 12 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(7, 1, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464435/Tyler_Image_1_et3uaz.jpg', 'Pointillism Self portrait', '2020-10-27', 'A pointillism made using primary colored marker dots only, layered to create depth and a multitude of colors.', 1, 1, 0, 24 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(8, 3, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464450/Tyler_Image_4_ii3da1.jpg', 'Beast Combination', '2020-10-30', 'A combination of a sea snail and a velociraptor.', 7, 2, 0, 12 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(9, 3, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464381/IMG_2680_laggnv.jpg', 'Color Abstraction', '2020-10-19', 'An abstract piece meant to be dynamic and show depth through layering and patterns.', 2, 1, 0,3 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(10, 3, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464426/Pig_Front_liqssb.png', 'Pigu', '2020-10-22', 'A stylized pig model created for my animation capstone.', 9, 2, 0, 42 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(11, 1, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464338/Chris_Front_bcfppx.png', 'Chris', '2020-10-22', 'A stylized human created as the main character for Orders Up my animation capstone.', 6, 2, 0, 15 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(12, 2, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464431/Random_Image_1_lkk4ph.jpg', 'EDM Abstract', '2020-10-29', 'An abstract piece portraying neon lighting.', 12, 1, 0, 1 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(13, 4, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464373/Ethan_Image_4_dteiy2.jpg', 'A Stylized Witch', '2020-10-28', 'A witch design for a short story I am working on.', 6, 1, 0, 36 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(14, 4, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464367/Ethan_Image_3_ncnecz.jpg', 'Warlock Channeling SKull', '2020-10-29', 'An initial sketch of the warlock icon used in the Roll Out App.', 1, 1, 0, 28 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(15, 4, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464354/Ethan_Image_2_lajr7d.jpg', 'Demon Sketch', '2020-11-01', 'Demon sketch I did while at work to hone my character design skills.', 1, 1, 0, 37 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(16, 4, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464345/Ethan_Image_1_unvyub.jpg', 'Initial Villian Sketch', '2020-10-30', 'An inital sketch of the villian of my upcoming short story.', 1, 1, 0, 27 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(17, 5, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464421/Kaite_image_8_rg2vzf.jpg', 'Random Doodles', '2020-10-27', 'A sketch I did for my friends birthday card!', 2, 1, 0, 12 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(18, 5, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464415/Kaite_image_7_cpxfnn.jpg', 'Me as a Sloth', '2020-10-28', 'A drawing I did of myself a cute little sloth!', 1, 1, 0,7 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(19, 5, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464410/Kaite_image_6_qocglx.jpg', 'Koi Water Color', '2020-10-29', 'Trying out watercolor and I think it went really well!', 2, 1, 0, 39 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(20, 5, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464406/Kaite_image_5_x7citv.jpg', 'Myself Stylized as a Nerd', '2020-10-31', 'A stylized sketch of myself as a nerd for an Inktober prompt.', 1, 1, 0, 5 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(21, 5, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464399/Kaite_image_4_thmbkl.jpg', 'Pumpkin Pointillism', '2020-10-15', 'A pointillism of a pumpkin done with ink for Inktober!', 6, 1, 0, 8 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(22, 5, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464395/Kaite_image_3_slvar9.jpg', 'Me and Billy!', '2020-10-22', 'A drawing of me and my boyfriend and how happy he makes me!', 2, 1, 0, 12 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(23, 5, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464390/Kaite_image_2_p5en6m.jpg', 'Venus FlyTrap', '2020-10-27', 'A spooky plant for Inktober.', 1, 2, 0, 25 )
insert into ArtPost(Id, UserProfileId, Image, Title,PostDate, Description, CategoryId, ArtTypeId, IsDeleted, Likes) values(24, 5, 'https://res.cloudinary.com/dgllrw1m3/image/upload/v1604464385/Kaite_image_1_br3o3s.jpg', 'Woods from Below', '2020-10-25', 'A view of trees from below to give a new perspective!', 2, 1, 0, 14 )

set identity_insert [ArtPost] off

GO
