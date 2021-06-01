const Scrim = require('../../models/scrim')

module.exports = async function(req, res, next) {
   const scrim = await Scrim.findOne({ _id: req.params.id });
   if (!scrim) return res.status(404).json({error: "Could find the specified scrim."});

   if (scrim.hostId != req.user._id) return res.status(403).json({error: "You don't have permissions for this scrim."});
   req.scrim = scrim;
   next();
}