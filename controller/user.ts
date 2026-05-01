import { type Request, type Response } from "express";
import users, { type User } from "../data/users";

type ReqQuery = {
  page: string | undefined;
  limit: string | undefined;
};

export default {
  getAll: (req: Request<{}, {}, {}, ReqQuery>, res: Response) => {
    const page = Math.max(1, parseInt(req.query.page ?? "1") || 1);
    const limit = Math.max(1, parseInt(req.query.limit ?? "6") || 6);

    const total = users.length;
    const totalPage = Math.ceil(total / limit);
    const start = limit * (page - 1);
    const data = users.slice(start, start + limit);

    res.json({ page, limit, total, total_page: totalPage, data });
  },

  getById: (req: Request, res: Response) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === Number(id));

    if (user === undefined) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ data: user });
  },

  create: (req: Request, res: Response) => {
    const { name, email, avatar } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const nextId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const newUser: User = {
      id: nextId,
      name,
      email,
      avatar: avatar ?? `https://picsum.photos/id/${nextId}/200/200`,
    };

    // Dummy API: return the simulated user without persisting
    res.status(201).json({ data: newUser });
  },

  update: (req: Request, res: Response) => {
    const { id } = req.params;
    const index = users.findIndex((u) => u.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, avatar } = req.body;

    // Dummy API: return the simulated updated user without persisting
    const updatedUser: User = {
      ...users[index],
      ...(name && { name }),
      ...(email && { email }),
      ...(avatar && { avatar }),
    };

    res.json({ data: updatedUser });
  },

  destroy: (req: Request, res: Response) => {
    const { id } = req.params;
    const index = users.findIndex((u) => u.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Dummy API: confirm deletion without actually removing from the array
    res.json({ message: "User deleted successfully" });
  },
};
