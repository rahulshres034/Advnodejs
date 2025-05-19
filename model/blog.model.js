module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("blogs", {
    title: {
      type: DataTypes.STRING,
    },
    subtitle: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    userId: DataTypes.INTEGER, // this line is important!
  });
  return Blog;
};
