import 'package:flutter/material.dart';
import 'package:yashram_app/models/user.dart';
import 'package:yashram_app/screens/events.dart';
import 'package:yashram_app/services/signup.dart';
import '../models/login_State.dart';
import '/models/errors.dart';
import '/ui_comps/cus_text_field.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  @override
  Widget build(BuildContext context) {
    TextEditingController emailController = TextEditingController();
    TextEditingController passController = TextEditingController();
    Login signupServ = Login();
    FieldError err = FieldError.None;

    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                "Yasham Foundation Volunteers",
                style: TextStyle(
                  fontSize: 42,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: CusTextField(
                label: "Email",
                icon: Icons.email,
                controller: emailController,
                isPassword: false,
                err: err,
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: CusTextField(
                label: "Password",
                icon: Icons.email,
                controller: passController,
                isPassword: true,
                err: err,
              ),
            ),
            FloatingActionButton.extended(
                onPressed: () async {
                  LoginState st = await signupServ.signUp("username",
                      passController.text, "name", emailController.text);
                  if (!st.success) {
                    setState(() {
                      err = FieldError.Incorrect;
                    });
                  } else {
                    User user = User(
                        email: emailController.text,
                        password: passController.text,
                        username: "test");
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => VolEventsScreen(user: user)));
                  }
                },
                label: Text("SignUp"))
          ],
        ),
      ),
    );
  }
}
