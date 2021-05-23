const Team = require('../../models/team')

module.exports = async function(req, res, next) {
   const team = await Team.findOne({
      _id: req.params.id,
      members: {
         $elemMatch: {
            member: req.user._id,
            type: 'admin'
         }
      }
   });
   if (!team) return res.status(403).json({error: "Could not delete this team."});
   next();
}