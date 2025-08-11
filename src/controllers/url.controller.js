import urlModels from "../models/url.models.js"
import ApiError from "../utiles/ApiError.js"
import asyncHandler from "../utiles/asyncHandler.js"
import Url from "../models/url.models.js"
import ApiResponse from "../utiles/ApiResponse.js"
import { nanoid } from "nanoid"




const CreateShortcode = asyncHandler(async (req, res) => {
  const { original_url } = req.body;


  if (!original_url || original_url.trim() === "") {
    throw new ApiError(400, "Original URL is required");
  }


  const existingUrl = await Url.findOne({ original_url: original_url.trim() });
  if (existingUrl) {
    return res.status(200).json(
      new ApiResponse(
        200,
        { shortUrl: `${process.env.BASE_URL}/${existingUrl.short_code}` },
        "Short URL already exists for this link"
      )
    );
  }
  const short_code = nanoid(6);

  const newUrl = await Url.create({
    original_url: original_url.trim(),
    short_code
  });


  return res.status(201).json(
    new ApiResponse(
      201,
      { shortUrl: `${process.env.BASE_URL}/${newUrl.short_code}` },
      "Short URL created successfully"
    )
  );
});


const getShortcode = asyncHandler(async (req, res) => {
  const shortcode = req.params.shortcode?.trim();

console.log("Requested shortcode:", shortcode);

  if (!shortcode) {
    throw new ApiError(400, "Shortcode is required");
  }

  const urlDoc = await Url.findOneAndUpdate(
    { short_code: shortcode },
    { $inc: { clicks: 1 } },
    { new: true } 
  );

  if (!urlDoc) {
    throw new ApiError(404, "Short URL not found");
  }

  return res.redirect(301, urlDoc.original_url); 
});



const getAllCollection = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default page number
  const limit = parseInt(req.query.limit) || 10; // Default limit
  const skip = (page - 1) * limit;

  const allUrls = await Url.find()
    .sort({ createdAt: -1 }) // Latest first
    .skip(skip)
    .limit(limit)
    .lean();

  if (allUrls.length === 0) {
    throw new ApiError(404, "No URLs found");
  }

  return res.status(200).json(
    new ApiResponse(200, allUrls, "Fetched all URLs")
  );
});


export{
    CreateShortcode,
    getShortcode,
    getAllCollection
}