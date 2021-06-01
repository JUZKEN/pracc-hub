const Team = require('../../models/team')

module.exports = async function(req, res, next) {
   const team = await Team.findOne({
      _id: req.params.id,
      members: {
         $elemMatch: {
            type: 'admin',
            member: req.user._id
         }
      }
   });
   if (!team) return res.status(403).json({error: "You are not an admin of this team."});
   next();
}