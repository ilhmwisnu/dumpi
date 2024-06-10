import type { Request, Response } from "express";
import profileData from "../data/profile";

const profileController = {
  getProfile: (req: Request, res: Response) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      res.json(profileData);
    } catch (error) {
      res.status(500);
    }
  },
};

export default profileController;
