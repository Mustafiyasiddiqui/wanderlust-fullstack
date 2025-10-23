const joi = require("joi");
// const categories = await category.find().select("name -_id");
// const validNames = categories.map((c) => c.name);

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
        .items(
          joi
            .string()
            .valid(
              "farms",
              "trending",
              "rooms",
              "iconic-cities",
              "volleyball",
              "beach",
              "pools",
              "cabins",
              "table-tennis",
              "mountains",
              "castles",
              "camping",
              "jungle",
              "arctic",
              "gifts",
              "child-friendly",
              "verified"
            )
        )
        .min(1)
        .max(2)
        .required(),
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

// categories: joi
//         .array()
//         .items(joi.string().valid(...validNames))
//         .min(1)
//         .max(2),
//     })
