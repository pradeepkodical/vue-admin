import store from '../store'
import mgr from '../services/security';

export default class AuthServices {

  static async getAccessToken() {
    console.log('getAccessToken')

    const user = await mgr.getUser();

    return user ? user.access_token : '';
  }

  static async renewToken() {
    console.log('renew')
    const user = await mgr.signinSilent();
    return user;
  }

  static async authenticate(returnPath: string) {
    let user = await mgr.getUser();
    if (!user) {
      if (returnPath) {
        await mgr.signinRedirect({ state: returnPath });
      } else {
        await mgr.signinRedirect();
      }
    }
    user = await mgr.getUser();
    const name = user?.profile.name;
    localStorage.setItem('userName', name || '');
    return user;
  }

  static async signinRedirectCallback() {
    console.log('signinRedirectCallback')
    const result = await mgr.signinRedirectCallback();
  }

  static async signinSilentCallback() {
    console.log('signinSilentCallback')
    const result = await mgr.signinSilentCallback();
  }

  static async isLoggedIn() {
    const user = await mgr.getUser();
    return !!user;
  }

  static async logout() {
    console.log('logout')
    await mgr.signoutRedirect();
  }

  static async getUser() {
    return await mgr.getUser();
  }

  static getUserName() {
    return localStorage.getItem('userName') || '_';
  }
  static getUserInitials() {
    return AuthServices.getUserName()[0]
  }
}
