import Oidc from 'oidc-client'

const mgr = new Oidc.UserManager({
  authority: 'https://heliosauth-test.myrenatus.io',
  client_id: `${process.env.VUE_APP_IDENTITY_CLIENT_ID}`,
  redirect_uri: `${process.env.VUE_APP_REDIRECT_URL}`,
  response_type: 'code',
  scope: 'openid leads.scope education.scope catalog.scope media.scope sales.scope users.scope profile',
  post_logout_redirect_uri: `${process.env.VUE_APP_LOGOFF_REDIRECT_URL}`,
  includeIdTokenInSilentRenew: false,
  automaticSilentRenew: false,
  userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })
})

Oidc.Log.logger = console
Oidc.Log.level = Oidc.Log.INFO

export default mgr
