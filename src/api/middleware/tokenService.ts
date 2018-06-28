import { Request, Response, NextFunction } from "express";

import jwt = require("jsonwebtoken");
import bcrypt = require("bcryptjs");
import dotenv = require("dotenv");

const environ: dotenv.DotenvResult = dotenv.config({ path: "./variables.env" });
if (environ.error) {
  throw environ.error;
}
// Proteger password de usuario
const passProtect = userPassword => {
  return bcrypt.hashSync(userPassword, 8);
};
// Crear token
const createToken = user => {
  // user: {userId, userEmail, userPass, userRole}
  console.log("Content of user seen in createToken:", user);
  return jwt.sign(user, process.env.PUBLIC_KEY, { expiresIn: "1d" });
};
// Revisar token
const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // const token: string = req.headers.authorization.toString().split(" ")[1];
    const token: string = req.headers["x-access-token"].toString();
    // const token: string = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.header["x-access-token"];
    // console.log("The passed Token:", token);
    
    jwt.verify(token, process.env.PUBLIC_KEY);
    /*
      console.log("Se procesó Token: ", decoded);
      console.log("Error:", err);
      La salida de Date.now() está en ms y token.iat, token.exp está en s
      */
    next();
  } catch (err) {
    // console.log("Error:", err);
    if (err.name.toLowerCase() === "tokenexpirederror") {
      return res.status(401).json({
        message: "Auth failed: Token expirado"
      });
    } else {
      return res.status(401).json({
        message: "Auth failed: Error de JWT"
      });
    }
  }
};

/*
  const user = {
    userId: accesoOk[0]["id"],
    userEmail: accesoOk[0]["email"],
    userRole: accesoOk[0]["role"]
  };
  */
 
  /*
const processToken = (dato: number, req?: Request, res?: Response, next?: NextFunction) => {

  const token: string = req.headers["x-access-token"].toString();
  const decoded = jwt.verify(token, process.env.PUBLIC_KEY);

 switch(dato) {
   case 1: 
    return decoded[0].userId;
    break;
   case 2: 
    return decoded[0].userEmail;
    break;
   case 3: decoded[0].userRole;
    break;
 }
}
*/
export { passProtect, createToken, checkToken };
