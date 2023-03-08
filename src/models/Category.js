/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @returns 
 */

const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category',
    {
      id: { allowNull: false, autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'categories',
      underscored: true,
    });

  return Category;
};

module.exports = CategoryModel;