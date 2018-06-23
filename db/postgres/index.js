'use strict';

const Sequelize = require('sequelize');
const userFactory = require('./models/user');
const addressFactory = require('./models/address');

let user;
let address;

// the assumption is that this option adheres to an interface
const postgres = {
  connect() {
    // new Sequelize('database', 'username', 'password', config)
    const sequelize = new Sequelize('bitcoin', 'postgres', null, {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });

    user = userFactory(sequelize);
    address = addressFactory(sequelize);

    user.hasMany(address);
    address.belongsTo(user);

    return sequelize.sync();
  },

  user: {
    create({ id, displayName, photoUrl }) {
      return user.create({
        id,
        displayName,
        photoUrl
      });
    },
    read({ id } = { id: null }) {
      const query = {};
      let queryType;

      if (id) {
        query.where = { id };
        queryType = 'findOne';
      } else {
        queryType = 'findAll';
      }

      return user[queryType](query);
    },
    update(id, obj) {
      return user.update(obj, { where: { id } });
    },
    delete(id) {
      return user.destory({ where: { id } });
    }
  },

  _seed() {
    // drop users table and seed new data
    return user.destroy({ where: {}, truncate: true }).then(() => user.bulkCreate([{}, {}]));
  }
};

module.exports = postgres;
