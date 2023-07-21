import { DataTypes, Model } from "sequelize";
import { UserEntity } from "../../domain";
import { dbInstance } from "../../../../infrastructure/db/dependencies";

class User extends Model<UserEntity> implements UserEntity {
  public id!: string;
  public correo!: string;
  public password!: string;
  public nombre!: string;
  public apellido!: string;
  public permiso!: '1'|'2';
  public photo!: string|null;
  public lastLogin!: Date|null;
  public active!: boolean;
  public creado!:Date;
  public modificado!:Date;
  public empresa_id!: string|null;
}

User.init(
  {
    id:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      primaryKey:true
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    permiso:{
      type:DataTypes.ENUM,
      values:['1','2'],
      allowNull:false,
      defaultValue:'2'
    },
    photo:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:null
      },
    lastLogin:{
      type:DataTypes.DATE,
      allowNull:true,
      defaultValue:null
      },
    active:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
    empresa_id:{
    type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'Empresa',
        key: 'id',
      },
    }

  },
  {
    sequelize:dbInstance,
    modelName: 'User',
    tableName:"usuarios",
    timestamps:true,
    createdAt:"creado",
    updatedAt:"modificado"
  }
);
User.belongsTo(dbInstance.models.Empresa, { foreignKey: 'empresa_id', targetKey: 'id', as: 'empresa' });

export const UserModel= User