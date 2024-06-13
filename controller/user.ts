import { type Request, type Response } from "express";
import users from "../data/users";

type ReqQuery = {
  page: string | undefined;
  limit: string | undefined;
};

export default {
  getAll: (req: Request<{}, {}, {}, ReqQuery>, res: Response) => {
    try {
      const page = parseInt(req.query.page ?? "1")
      const limit = parseInt(req.query.limit ?? "6")

      const total = users.length;
      const totalPage = Math.ceil(total / limit);

      const start = 0 + (limit * (page - 1))

      const data = users.slice(start, start + limit )

      res.json({
        page: page,
        limit: limit,
        total: total,
        total_page: totalPage,
        data: data,
      });
    } catch (error) {
      res.status(500);
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
