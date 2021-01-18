module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING
  }, {
    tableName: 'user',
    timestamps: false,
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });
  return User;
};
