import { type Request, type Response } from "express";
import users from "../data/users";

export default {
  getAll: (req: Request, res: Response) => {
    try {
      res.json({
        data: users,
      });
    } catch (error) {
      res.status(500)
    }
  },

  getById: (req: Request, res: Response) => {
    try {
      let { id } = req.params;

      let user = users.find((user) => user.id == Number(id));

      if (user == undefined) {
        return res.status(404).json({
          message: "Data tidak ditemukan",
        });
      }

      res.json({
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
