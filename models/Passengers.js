import mongoose from "mongoose";

// creation d'un modele depuis ma base de donnée
const passengerSchema = new mongoose.Schema({
  PassengerId: { type: String, required: true },
  Survived: { type: Number, required: true },
  Pclass: { type: Number, required: true },
  Name: { type: String, required: true },
  Sex: { type: String, required: true },
  Age: { type: Number, required: true },
  SibSp: { type: Number, required: true },
  Parch: { type: Number, required: true },
  Ticket: { type: Number, required: true },
  Fare: { type: mongoose.Schema.Types.Decimal128, required: true },
  Cabin: { type: String, required: true },
  Embarked: { type: String, required: true },
});

// creation d'une fontion statique pour analyser les donnée
passengerSchema.static("analyserPassenger", analyserPassenger);

// fonction qui permet d'effectuer l'analyse
export async function analyserPassenger(sexe, age, classe) {
  const errors = [];
  if (!sexe || sexe.toString().trim() === "")
    errors.push(`Le champs "sexe" est requis.`);
  if (!age || age.toString().trim() === "")
    errors.push(`Le champs "age" est requis.`);
  if (!classe || classe.toString().trim() === "")
    errors.push(`Le champs "classe" est requis.`);

  if (errors.length > 0) {
    throw new Error(errors.join("<br>"));
  }

  return await this.find({ Sex: sexe, Age: age, Pclass: classe });
}

const collectionName = "passengers";
export const PassengerModel = mongoose.model(
  "Passenger",
  passengerSchema,
  collectionName
);
