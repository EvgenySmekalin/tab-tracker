// AuthenticationService.register({
//   email: "test@tatsm.com",
//   password: "123f4334r3" })

import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  }
}
