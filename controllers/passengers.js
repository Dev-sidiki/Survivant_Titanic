import { PassengerModel } from "../models/Passengers.js";

export async function AnalysePassengersController(req, res) {
  const { sexe, age, classe } = req.body;

  //   try {
  const passengerList = await PassengerModel.analyserPassenger(
    sexe,
    age,
    classe
  );

  // req.flash(
  //   "success",
  //   `Inscription réussie ! Bienvenue sur l'application ${newUser.firstName}<br>Vous pouvez maintenant <a href="/login">vous connecter</a>`
  // );
  // res.redirect("/analyser");
  //   console.log(sexe, age, classe);
  console.log(passengerList);
  //   } catch ({ message: errorMessage }) {
  //     return res
  //       .status(400)
  //       .render("analyser", { errorMessage, values: req.body });
  //   }
}
