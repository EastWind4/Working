import 'package:yashram_app/helpers/api.dart';
import 'package:yashram_app/models/login_State.dart';
import 'package:http/http.dart' as http;

class SignUp {
  Future<LoginState> signUp(
      String username, String password, String name, String email) async {
    try {
      var url = Uri.parse(API.BASEURL + API.signupEndpoint);
      var params = {
        "username": username,
        "password": password,
        "name": name,
        "email": email
      };
      var resp = await http.post(url, body: params);
      print(resp.toString());
      return LoginState(success: true);
    } catch (e) {
      return LoginState(success: false);
    }
  }
}
