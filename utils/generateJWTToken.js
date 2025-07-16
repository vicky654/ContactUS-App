// utils/generateJWTToken.ts
import { encode } from 'react-native-jwt-io';

export const generateJWTToken = () => {
  const payload = {
    iss: 'https://portal-uat.dpdpconsultants.com',
    aud: 'https://tech.portal-uat.dpdpconsultants.com',
    email: 'jaspal.singh@dpdpconsultants.com',
    expiry: Math.floor(Date.now() / 1000) + 3600,
  };

  const secret = '031950e5-cc58-4e34-b442-70136a791c80';
  return encode(payload, secret);
};
