import { NextFunction, Request, Response } from "express";
import blogModel from "../../models/blogModel.js";

const getSearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchKeyword = (req.query.query as string).trim(); // Get the search keyword from query params and trim any whitespace

    // Create a regex for the entire search phrase
    const phraseRegex = new RegExp(searchKeyword, "i"); // Case-insensitive match for the entire phrase

    const searchQuery = {
      $or: [
        { title: phraseRegex }, // Match the entire phrase in the title
        { content: phraseRegex }, // Match the entire phrase in the content
        { tags: { $elemMatch: { $regex: phraseRegex } } }, // Match any tag that contains the search phrase
      ],
    };

    // Find blogs based on the search query
    const blogs = await blogModel.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: searchKeyword ? searchKeyword : "",
            path: {
              wildcard: "*",
            },
          },
        },
      },
      {
        $lookup: {
          from: "users", // Collection name in MongoDB
          localField: "authorId", // Field in blogs collection
          foreignField: "_id", // Field in users collection
          as: "author", // Alias for populated data
        },
      },
      {
        $unwind: "$author", // Converts array to an object (optional)
      },
      {
        $project: {
          title: 1,
          content: 1,
          createdAt: 1,
          "author.name": 1,
          "author.profilePicture": 1, // Include only necessary fields
        },
      },
    ]);

    //populate("authorId", "name profilePicture")

    return res.status(200).json({
      message: "All Blogs...🙂",
      data: blogs,
      success: true,
      error: false,
    });
  } catch (err: any) {
    return res.status(400).json({
      message: err.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

export default getSearch;
