const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const io = require('socket.io');
const https=require('https');


const sequelize = require('./util/database');

const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/creategroup');
const userGroup = require('./models/usergroup');
const GroupMessage = require('./models/groupmessage');
const app = express();

const server = require('http').createServer(app);
const ioInstance = io(server);


const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const groupRoutes = require('./routes/creategroup');
const contentRoutes = require('./routes/groupmessage');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flag: 'a'});


app.use(express.json());
app.use(cors());
app.use(morgan('combined', {stream: accessLogStream}));
app.use(helmet());
app.use(compression());

app.use('/user', userRoutes);
app.use('/message', messageRoutes);
app.use('/group', groupRoutes);
app.use('/content', contentRoutes);

app.use((req,res) => {
    res.sendFile(path.join(__dirname, `Frontend/${req.url}`));
});


User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group, {through: userGroup});
Group.belongsToMany(User, {through: userGroup});

User.hasMany(GroupMessage);
GroupMessage.belongsTo(User);


// ... (existing code)

sequelize.sync()
.then((result) => {
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    // Socket.IO connection and event handling
    ioInstance.on('connection', (socket) => {
        console.log('A user connected');

        // Example event: Send a welcome message to the connected user
        socket.emit('welcome', 'Welcome to the chat app!');

        // Handle incoming messages from clients
        socket.on('chat message', (msg) => {
            console.log('Received message:', msg);

            // Broadcast the message to all connected clients
            ioInstance.emit('chat message', msg);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
})
.catch(err => {
    console.log(err);
})
