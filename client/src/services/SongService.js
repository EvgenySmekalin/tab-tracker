// AuthenticationService.register({
//   email: "test@tatsm.com",
//   password: "123f4334r3" })

import Api from '@/services/Api'

export default {
  index () {
    return Api().get('songs')
  },
  post (song) {
    return Api().post('songs', song)
  }
}
