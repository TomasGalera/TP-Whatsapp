INSERT INTO Messages (userId, chatId, message)
VALUES (2, 1, "Hola como estas?");

INSERT INTO UsersWA (username, password)
VALUES ("a", "a");

INSERT INTO Chats (name)
VALUES ("Chat muchachos");

INSERT INTO Chats_users (chatId, userId)
VALUES (1, 2);

select * from Chats;

CREATE TABLE Chats_users (
    id int auto_increment,
    chatId int,
    userId int,
    primary key (id),
    foreign key (chatId) references Chats(chatId),
    foreign key (userId) references UsersWA(userId)
);

select Chats_users.chatId, name from Chats_users inner join Chats on Chats_users.chatId = Chats.chatId where userId = 1;