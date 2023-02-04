import '/models/errors.dart';

class LoginState {
  final bool isBusy;
  final FieldError? emailError;
  final FieldError? usernameError;
  final FieldError? passwordError;
  final bool success;

  LoginState({
    this.isBusy: false,
    this.emailError,
    this.usernameError,
    this.passwordError,
    this.success: false,
  });
}
