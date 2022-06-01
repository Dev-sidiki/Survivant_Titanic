import mongoose from "mongoose";
import { sha256 } from "../utils/utils.js";

// un modèle de creation d'un utilisateur
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// question??
UserSchema.static("createUser", createUser);
UserSchema.static("checkUserCredentials", checkUserCredentials);

// fonction d'inscription d'un nouveau utilisateur da la base de donneé
async function createUser(
  firstName,
  lastName,
  email,
  password,
  passwordConfirm
) {
  const errors = [];

  // Fields check
  if (!firstName || firstName.toString().trim() === "")
    errors.push(`Le champs "firstName" est requis.`);
  if (!lastName || lastName.toString().trim() === "")
    errors.push(`Le champs "lastName" est requis.`);
  if (!email || email.toString().trim() === "")
    errors.push(`Le champs "email" est requis.`);
  if (!password || password.toString().trim() === "")
    errors.push(`Le champs "password" est requis.`);
  if (!passwordConfirm || passwordConfirm.toString().trim() === "")
    errors.push(`Le champs "passwordConfirm" est requis.`);

  if (errors.length > 0) {
    throw new Error(errors.join("<br>"));
  }

  // methode de comparasion des mots de passe saissis
  if (password !== passwordConfirm) {
    throw new Error("Les mots de passe doivent correspondre");
  }

  // verifie si utilisateur existe deja
  const existingUser = await this.findOne({ email });
  if (existingUser !== null) {
    throw new Error("Un utilisateur existe déjà avec cette adresse email");
  }

  // Hash password
  const passwordHash = sha256(password);
  // question??
  return await this.create({
    firstName,
    lastName,
    email,
    password: passwordHash,
  });
}

// methode de verifications des identifiant de l'utilisateur depuis la base de donnée
async function checkUserCredentials(email, password) {
  const user = await this.findOne({ email, password: sha256(password) });

  if (!user)
    throw new Error(`Identifiants invalides ou utilisateur inexistant`);

  return user;
}

// Récupération d'un Model mongoose sur la base du Schéma
const collectionName = "users";
export const UserModel = mongoose.model("User", UserSchema, collectionName);
