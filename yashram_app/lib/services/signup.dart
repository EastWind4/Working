import 'package:yashram_app/helpers/api.dart';
import 'package:yashram_app/models/login_State.dart';
import 'package:http/http.dart' as http;

class Login {
  Future<LoginState> signUp(
      String username, String password, String name, String email) async {
    try {
      var url = Uri.parse(API.BASEURL + API.loginEndpoint);
      var params = {
        "email": email,
        "password": password,
      };
      var resp = await http.post(url, body: params);
      String data = resp.body;
      int statusCode = resp.statusCode;

      if (statusCode != 200) throw Error();

      print("success");

      return LoginState(success: true);
    } catch (e) {
      return LoginState(success: false);
    }
  }
}

// name token expDate
