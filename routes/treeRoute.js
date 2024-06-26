const express = require('express');
const Trees = require('../models/treeModel');

const router = express.Router();

//create 
router.post('/tree/save', async (req, res) => {
  try {
    // Check if treeID already exists in the database
    const existingTree = await Trees.findOne({ treeID: req.body.treeID });
    if (existingTree) {
      return res.status(400).json({ error: "Tree ID already exists" });
    }

    // If treeID doesn't exist, save the new tree details
    let newTree = new Trees(req.body);
    await newTree.save();

    return res.status(200).json({
      success: "Details saved successfully."
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
});

//read (trees of a specific block)
router.get("/trees", async (req, res) => {
  try {
    const { blockName } = req.query;
    let trees;
    if (blockName) {
      trees = await Trees.find({ blockName }).exec();
    } else {
      trees = await Trees.find().exec();
    }

    const formattedTrees = trees.map(tree => ({
      ...tree.toObject(),
      plantedDate: tree.plantedDate.toISOString().split('T')[0]
    }));

    return res.status(200).json({
      success: true,
      existingTrees: formattedTrees,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});


//update
router.patch("/trees/update/:id", async (req, res) => {
  try {
    await Trees.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();

    return res.status(200).json({
      success: "Updated Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//delete
router.delete("/trees/delete/:id", async (req, res) => {
  try {
    const treeDelete = await Trees.findByIdAndDelete(req.params.id).exec();

    return res.json({
      message: "Deleted Successfully",
      treeDelete,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Unsuccessfull",
      error: err.message,
    });
  }
});

//get details of a tree
router.get("/trees/:id", async (req, res) => {
  try {
    let treeID = req.params.id;
    let tree = await Trees.findById(treeID);
    if (!tree) {
      return res.status(404).json({ success: false, message: "Details not found" });
    }
    return res.status(200).json({ success: true, tree });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

//get the tree count of a block
router.get("/treeCount/:blockName", async (req, res) => {
  try {
    let blockName = req.params.blockName;
    let count = await Trees.countDocuments({ blockName: blockName });
    return res.status(200).json({ success: true, count: count });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

//get the tree count of whole estate
router.get("/treeCount", async (req, res) => {
  try {
    let count = await Trees.countDocuments();
    return res.status(200).json({ success: true, count: count });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

//get all tree details
router.get("/allTrees", async (req, res) => {
  try {
    const trees = await Trees.find().exec();

    const allTrees = trees.map(trees => ({
      ...trees.toObject(),
      plantedDate: trees.plantedDate?.toISOString()?.split('T')[0]
    }));

    return res.status(200).json({
      success: true,
      viewtrees: allTrees,
    });
  }
  catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});


module.exports = router;