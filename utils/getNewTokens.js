import jwt from 'jsonwebtoken'


export const getNewTokens =  (payload) => {
    const token = jwt.sign({...payload , type: 'access'}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '5m',
    });
  
    const refresh_token = jwt.sign({...payload, type: "refresh" }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1h',
    });
  
    return { access_token: token, refresh_token , tokenExpiresIn: 5 * 60 * 1000 };
  };

  