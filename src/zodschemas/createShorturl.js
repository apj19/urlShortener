const {z}= require("zod");

module.exports.createShortCodeSchema=z.object({
    longUrl:z.string().min(5),
    expiry:z.string().date().optional(),
    customecode:z.string().min(8).optional(),
    password:z.string().min(8).optional()
});

