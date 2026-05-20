import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

export const adminApp = exp.Router();

// ─── Get all users and authors
adminApp.get("/users", verifyToken("ADMIN"), async (req, res, next) => {
  try {
    const users = await UserModel.find({
      role: { $in: ["USER", "AUTHOR"] },
    }).select("-password");

    res.status(200).json({ message: "users list", payload: users });
  } catch (err) {
    next(err);
  }
});

// ─── Block / Unblock a user or author 
adminApp.patch("/user/:id", verifyToken("ADMIN"), async (req, res, next) => {
  try {
    const { isUserActive } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: { isUserActive } },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const statusMsg = isUserActive ? "unblocked" : "blocked";
    res
      .status(200)
      .json({ message: `User ${statusMsg} successfully`, payload: user });
  } catch (err) {
    next(err);
  }
});

// ─── Get all articles (active + inactive) 
adminApp.get("/articles", verifyToken("ADMIN"), async (req, res, next) => {
  try {
    const articles = await ArticleModel.find().populate(
      "author",
      "firstName lastName email"
    );

    res.status(200).json({ message: "all articles", payload: articles });
  } catch (err) {
    next(err);
  }
});
