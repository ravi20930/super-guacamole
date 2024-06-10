import { DataTypes, Model, Optional } from "sequelize";
import User from "./user.model";
import { sequelize } from "../config/database";

interface CandidateResponseAttributes {
  id: number;
  userId: number;
  skillId: number;
  difficultyLevel: "easy" | "medium" | "hard";
  question: string;
  response: string;
  rating: number | null;
}

interface CandidateResponseCreationAttributes
  extends Optional<CandidateResponseAttributes, "id" | "rating"> {}

class CandidateResponse
  extends Model<
    CandidateResponseAttributes,
    CandidateResponseCreationAttributes
  >
  implements CandidateResponseAttributes
{
  public id!: number;
  public userId!: number;
  public skillId!: number;
  public difficultyLevel!: "easy" | "medium" | "hard";
  public question!: string;
  public response!: string;
  public rating!: number | null;
}

CandidateResponse.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    skillId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    difficultyLevel: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "candidateResponses",
    sequelize,
  }
);

export default CandidateResponse;
