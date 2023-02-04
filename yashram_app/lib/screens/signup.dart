import 'package:flutter/material.dart';
import 'package:yashram_app/services/signup.dart';
import '/models/errors.dart';
import '/ui_comps/cus_text_field.dart';

class SignUpScreen extends StatelessWidget {
  const SignUpScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    TextEditingController emailController = TextEditingController();
    TextEditingController passController = TextEditingController();
    SignUp signupServ = SignUp();

    return Scaffold(
      body: Center(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: CusTextField(
                label: "Email",
                icon: Icons.email,
                controller: emailController,
                isPassword: false,
                // err: FieldError(isError: false, msg: ""),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: CusTextField(
                label: "Password",
                icon: Icons.email,
                controller: passController,
                isPassword: true,
                err: FieldError.Incorrect,
              ),
            ),
            FloatingActionButton.extended(
                onPressed: () {
                  signupServ.signUp("username", passController.text, "name",
                      emailController.text);
                },
                label: Text("SignUp"))
          ],
        ),
      ),
    );
  }
}
