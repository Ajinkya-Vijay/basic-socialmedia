const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { where } = require("sequelize");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  const allComments = await Comments.findAll({ where: { PostId: postId } });
  res.json(allComments);
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  const id = await Comments.findOne({ where: { id: commentId } });
  if (!id) return res.json("id not present");
  await Comments.destroy({
    where: { id: commentId },
  });

  res.json("Deleted Succesfully");
});

module.exports = router;
