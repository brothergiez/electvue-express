module.exports = (sequelize, DataType) => {
  const Members = sequelize.define('Members', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    fullname: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    isAdmin: {
      type: DataType.BOOLEAN,
      defaultValue: false
    }
  });

  // Users.associate = (models) => {

  // }
  return Members;
};
