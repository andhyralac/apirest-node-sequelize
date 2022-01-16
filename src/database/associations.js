const {
    User,
    Task,
    Note,
    Address
} = require('../models/index');


// relationships

//One-To-One
User.hasOne(Address, { as: 'address_user', foreignKey: 'id_user' });
Address.belongsTo(User, { foreignKey: 'id_user' });

//One-To-Many
User.hasMany(Note, {foreignKey: 'note_user'});
Note.belongsTo(User, { foreignKey: 'note_user'});

User.hasMany(Task, { foreignKey: 'task_user' });
Task.belongsTo(User, { foreignKey: 'task_user' });