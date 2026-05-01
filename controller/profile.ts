import type { Request, Response } from "express";
import profileData from "../data/profile";

const profileController = {
  getProfile: (req: Request, res: Response) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.json(profileData);
  },
};

export default profileController;
