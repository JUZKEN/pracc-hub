const Hub = require('../../models/hub')

module.exports = async function(req, res, next) {
   const hub = await Hub.findOne({ _id: req.params.id });
   if (!hub) return res.status(404).json({error: "Could find the specified hub."});

   if (hub.ownerId != req.user._id) return res.status(403).json({error: "You don't have permissions for this hub."});
   req.hub = hub;
   next();
}