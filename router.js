// import { Router } from 'express'
// // import { addData } from './reqhandler.js'
// import * as rh from './reqhandler.js'
// import Auth from './middleware/auth.js';
// const router=Router()
// router.route('/addData').post(Auth,rh.addData)
// router.route('/getData').get(rh.getData)
// router.route('/getSingleData/:id/').get(rh.getSingleData)
// router.route("/update").put(Auth,rh.updateData);
// router.route("/delete/:id/").delete(rh.deleteData);
// router.route('/addUser').post(rh.AddUser)
// router.route('/login').post(rh.login)
// router.route("/updateProduct/:id").put(Auth,rh.updateProduct);

// export default router


import { Router } from "express";
import * as rh from "./reqhandler.js";
import Auth from "./middleware/auth.js";

const router = Router();

/* 🔐 AUTH */
router.post("/addUser", rh.AddUser);
router.post("/login", rh.login);

/* 📦 DATA CRUD */
router.post("/addData", Auth, rh.addData);
router.get("/getData",rh.getData);
router.get("/getSingleData/:id/", Auth, rh.getSingleData);
router.put("/updateData/:id", Auth, rh.updateData);
router.delete("/deleteData/:id", Auth, rh.deleteData);
router.put("/updateProfile/:id", Auth,rh.updateProfile);

export default router;
