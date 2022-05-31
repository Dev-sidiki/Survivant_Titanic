# Survivant_Titanic

Dans une application sécurisée par vos soin avec Node/Express, et d'autres technologies, vous allez développer une interface permettant de faire des statistiques sur un Dataset spécifique : le titanic.

L'utilisation de React pour l'interface utilisateur peut être utilisé. Vous pouvez utiliser Symfony pour développer une API, avec React éventuellement.

L'objectif de l'application et d'afficher les survivants du Titanic en fonction du sex, de l'age et de la classe des billets.

Vous apporterez un soin particulier au rendu des statistiques.

La piste graphique à suivre est le design Web de l'application kaggle.com.

# Commencer avec le backend (node/express)

# module à installer

# pour initialiser le package.json

npm init -y

# définir l'option ci-dessous dans le fichier package.json à la racine du projet.

{ "type" : "module" }

# installer express

npm install express --save

# installer dotenv pour gerer les variable d'environnement

npm install dotenv --save

# installer express session pour la session utlisateur

npm install express-session

# Nous allons également installer nodemon et définir un script de démarrage :

npm install nodemon --save-dev

"scripts": {
"start": "nodemon server.js"
},

# Pensez à changer le nom du point d'entrée dans le fichier package.json de votre application :

"main": "server.js",

# installer pug pour le moteur de template

npm install pug

# installer mongoose pour utiliser mongo dans notre app node

npm install mongoose --save

# installer jsonwebtoken pour verifier l'authentification de l'utilisateur dans notre app node

npm install --save jsonwebtoken

# installer connect-mongo pour faire persister nos sessions en Base de données

npm install connect-mongo

# installer connect-flash pour afficher un flash message à la suite d'une opération quelconque. Cela peut-être un message de succès, d'avertissement, d'information ou d'erreur.

npm install connect-flash
