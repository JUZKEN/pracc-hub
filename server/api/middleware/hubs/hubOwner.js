const Hub = require('../../models/hub')

module.exports = async function(req, res, next) {
   const hub = await Hub.findOne({ _id: req.params.id });
   if (hub.ownerId != req.user._id) return res.status(403).json({error: "Access denied."});
   next();
}