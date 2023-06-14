import { DataTypes, Model } from 'sequelize';
import { EmpresaEntity } from '../../domain';
import { dbInstance } from '../../../../infraestructure/db/dependencies';



class Empresa extends Model<Omit<EmpresaEntity,"creado"|"modificado">> implements Omit<EmpresaEntity,"creado"|"modificado"> {
  public id!: string;
  public nombre!: string;
  public subdominio!: string;
  public correo!: string|null;
  public telefono!: string|null;
  public logo!: string|null;
  public description!: string|null;
  public active!: boolean;
  public creado!:Date;
  public modificado!:Date;
}

export const EmpresaModel= Empresa.init(
  {
    id:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subdominio: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:null
    },
    telefono:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:null
    },
    logo:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:null
      },
    description:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:null
      },
    active:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }

  },
  {
    sequelize:dbInstance,
    modelName: 'Empresa',
    tableName:"empresas",
    timestamps:true,
    createdAt:"creado",
    updatedAt:"modificado"
  }
);
