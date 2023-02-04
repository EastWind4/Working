enum FieldError { Empty, Invalid, Incorrect }

extension FieldErrorDesc on FieldError {
  static const Map<FieldError, String> _map = {
    FieldError.Empty: "field is empty",
    FieldError.Invalid: "field is invalid",
    FieldError.Incorrect: "field is incorrect",
  };

  String get desc =>
      _map[this] ??
      "unkown error type"; // for use in print statements for testing

  String msg(String fieldName) {
    // for use in UI
    return _map[this] == null
        ? throw Exception("function called on Invalid FieldError type")
        : _map[this]!.replaceAll("field", fieldName);
  }
}
