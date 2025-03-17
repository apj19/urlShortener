const {z}= require("zod");

module.exports.createShortCodeSchema=z.object({
    longUrl:z.string().min(5),
    expiry:z.string().date().optional(),
    customecode:z.string().min(8).optional(),
    password:z.string().min(8).optional()
});


module.exports.deleteShorlUrl=z.object({
    shortCode:z.string().min(5)
});

module.exports.updateShortUrl=z.object({
    expiry:z.string().date().optional(),
    password:z.string().min(8).optional()
});

