import AuthServices from './auth'

export default class ApiServices {
  static async getAuthHeaders() {
    const accessToken = await AuthServices.getAccessToken();
    return {
      Authorization: `Bearer ${accessToken}`
    }
  }
  static async get(url: string, params?: any) {
    const nUrl = params ? `${url}?filter=${JSON.stringify(params)}` : url;
    let result = await fetch(nUrl, {
      headers: await ApiServices.getAuthHeaders()
    });
    if (result.status === 401) {
      await AuthServices.renewToken();
      result = await fetch(nUrl, {
        headers: await ApiServices.getAuthHeaders()
      });
    }
    return result;
  }

  static async post(url: string, data?: any) {
    let result = await fetch(url, {
      headers: await ApiServices.getAuthHeaders(),
      body: JSON.stringify(data)
    })

    if (result.status === 401) {
      await AuthServices.renewToken();
      result = await fetch(url, {
        headers: await ApiServices.getAuthHeaders(),
        body: JSON.stringify(data)
      });
    }
    return result;
  }
}
