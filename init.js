const mongoose = require('mongoose');
const Chat = require('./models/chat');

main()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Sample data
let chats = [
  {
    from: 'Yash',
    to: 'Khushi',
    msg: 'Hello Khushi! How are you?',
    time: new Date(),
  },
  {
    from: 'Khushi',
    to: 'Yash',
    msg: 'Hello Yash! I am fine. How about you?',
    time: new Date(),
  },
  {
    from: 'Yash',
    to: 'Khushi',
    msg: 'I am doing great. Thanks for asking!',
    time: new Date(),
  },
  {
    from: 'Khushi',
    to: 'Yash',
    msg: 'What are your plans for the weekend?',
    time: new Date(),
  },
  {
    from: 'Yash',
    to: 'Khushi',
    msg: 'I am thinking of going hiking. Would you like to join me?',
    time: new Date(),
  },
];

Chat.insertMany(chats)
  .then(() => console.log("✅ Sample chats inserted successfully"))
  .catch(err => console.log(err));
