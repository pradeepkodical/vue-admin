import ApiServices from './api'
export interface UserInfo {
  firstName: string;
  lastName: string;
  userName: string;
  aggregateId: string;
  emailAddress: string;
}
export default class UserServices {
  static async getUsers(filter?: any) {
    return ApiServices.get(`${process.env.VUE_APP_USERS_API}/api/userssearch/index`, filter)
  }
}
