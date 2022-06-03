import { PassengerModel } from "../models/Passengers.js";

export async function AnalysePassengersController(req, res) {
  const { sexe, age, classe } = req.body;

  try {
    const passengerList = await PassengerModel.analyserPassenger(
      sexe,
      age,
      classe
    );

    if (passengerList) res.render("analyser", { passengerList });

    // console.log(sexe, age, classe);
    console.log(passengerList);
  } catch ({ message: errorMessage }) {
    return res
      .status(400)
      .render("dashboard", { errorMessage, values: req.body });
  }
}
