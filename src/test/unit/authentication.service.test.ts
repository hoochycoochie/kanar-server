import * as typeorm from 'typeorm';
import TokenData from '../../interfaces/tokenData.interface';
import AuthenticationService from '../../services/authentication.service';

(typeorm as any).getRepository = jest.fn();

describe('The AuthenticationService', () => {
  const authenticationService = new AuthenticationService();
  describe('when creating a cookie', () => {
    const tokenData: TokenData = {
      token: '',
      expiresIn: 1
    };

    (typeorm as any).getRepository.mockReturnValue({});

    it('should return a string', () => {
      expect(typeof authenticationService.createCookie(tokenData)).toEqual(
        'string'
      );
    });
  });
});
