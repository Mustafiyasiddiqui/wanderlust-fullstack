const joi = require("joi");

module.exports.listingSchema = joi.object({
  listings: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
      image: joi.string().allow("", null),
      price: joi.number().required().min(0),
      location: joi.string().required(),
      country: joi.string().required(),
      categories: joi
        .array()
        .items(joi.string().valid(...validNames))
        .min(1)
        .max(2),
    })
    .required(),
});

module.exports.reviewSchema = joi.object({
  review: joi
    .object({
      rating: joi.number().required().min(1).max(5),
      comment: joi.string().required(),
    })
    .required(),
});

// categories: joi.array().items(joi.string().valid("farms","trending","rooms","iconic-cities","volleyball",
//         "beach","pools","cabins","table-tennis","mountains",
// "castles","camping","jungle","arctic","gifts","child-friendly","verified")).min(1).max(2).required()
