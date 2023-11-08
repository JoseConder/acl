const acl = require('acl');
const {mongoose } = require('mongoose');
const url = 'mongodb://localhost:27017/video-club';
mongoose.connect(url);
const dbInstance = mongoose.connection
///aclInstance = new acl(new acl.mongodbBackend(dbInstance));
aclInstance = new acl(new acl.memoryBackend());

function checkPermission(permission) {
  return (req, res, next) => {
    const userId = req.auth.id; 

    aclInstance.isAllowed(userId, 'movies', permission, (err, allowed) => {
      if (err) {
        return res.status(500).json({ message: 'Error de autorización', error: err });
      }

      if (allowed) {
        next(); 
      } else {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
    });
  };
}
module.exports = { checkPermission };