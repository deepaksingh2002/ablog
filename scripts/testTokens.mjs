import { User } from '../src/models/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from '../src/config/config.js';

(async () => {
  try {
    const user = new User({
      _id: '507f1f77bcf86cd799439011',
      email: 'test@example.com',
      username: 'testuser',
      fullName: 'Test User'
    });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    console.log('accessToken:', accessToken ? 'generated' : 'missing');
    console.log('refreshToken:', refreshToken ? 'generated' : 'missing');

    const decodedAccess = jwt.verify(accessToken, config.accessTokenSec);
    const decodedRefresh = jwt.verify(refreshToken, config.refereshTokenSec);

    console.log('decodedAccess._id:', decodedAccess._id);
    console.log('decodedRefresh._id:', decodedRefresh._id);
  } catch (err) {
    console.error('Test failed:', err);
  }
})();
