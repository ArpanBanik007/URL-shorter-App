import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    original_url: {
      type: String,
      required: [true, "Original URL is required"],
      trim: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^(https?:\/\/)([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(value);
        },
        message: "Please provide a valid URL",
      },
    },
    short_code: {
      type: String,
      required: [true, "Short code is required"],
      unique: true,
      trim: true,
      minlength: [4, "Short code must be at least 4 characters"],
      maxlength: [10, "Short code must be at most 10 characters"],
    },
    clicks: {
      type: Number,
      default: 0,
      min: [0, "Clicks cannot be negative"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UrlSchema.index({ short_code: 1 });
UrlSchema.index({ original_url: 1 });

UrlSchema.pre("save", function (next) {
  this.original_url = this.original_url.trim();
  this.short_code = this.short_code.trim();
  next();
});

export default mongoose.model("Url", UrlSchema);
