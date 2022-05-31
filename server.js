// import ES6
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import route from "./routes/routes.js";
import flash from "connect-flash";
// ==========
// App initialization
// ==========

// pour la gestion des variable d'environnement
dotenv.config();
// les variable de  .env
const { APP_HOSTNAME, APP_PORT, NODE_ENV, MONGODB_URI } = process.env;
//  pour obtenir directement le chemin absolu de mes fichier statics
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// initialiser mon app avec express
const app = express();

// pour connecter son app a sa base de donnée mongo(titanic)
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(init);

// on definir le moteur de template que on utilse
// dans notre cas c'est le moteur de template pug
app.set("view engine", "pug");

// ==========
// App middlewares (on reconnait les middlewares grâce au mot clé use)
// ==========

// middlewares pour définir le dossier dans lequel les fichiers statiques se trouvent(dossier public)
app.use(express.static(path.join(__dirname, "public")));
// middlewares Pour récupérer les données POST en Express simplement
// Une fois que vous avez mis en place les deux ou une des méthodes ci-dessus vous pouvez les récupérer avec req.body sous forme d'un JSON
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//middlewares pour definir la session utilisateur
// (la session nous permet d'enregistrer des données)
app.use(
  session({
    name: "ma-session",
    secret: "ma-session-secrete",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
    cookie: { maxAge: 24 * 3600 * 1000 }, // on détermine la durée de vie de la session
  })
);

// "flash" doit impérativement être défini APRÈS le middleware de session
// Un flash message survient à la suite d'une opération quelconque.
// Cela peut-être un message de succès, d'avertissement, d'information ou d'erreur.
app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  res.locals.currentRoute = req.url;
  res.locals.loggedUser = null;
  next();
});

// ==========
// App routers
// ==========

// middlewares pour la gestion des différentes routes
app.use("/", route);
// ==========
// App start
// ==========
async function init() {
  console.log("Connexion à la base MongoDB initialisée!");

  app.listen(APP_PORT, () => {
    console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
  });
}
