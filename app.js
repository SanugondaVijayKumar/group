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

const sequelize = require('./util/database');

const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/creategroup');
const userGroup = require('./models/usergroup');
const GroupMessage = require('./models/groupmessage');
const app = express();

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


sequelize.sync()
.then((result) => {
    app.listen(process.env.PORT || 3000);
})
.catch(err => {
    console.log(err);
})