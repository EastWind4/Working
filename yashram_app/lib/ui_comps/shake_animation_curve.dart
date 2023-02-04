import 'package:flutter/material.dart';
import 'dart:math';

class SineCurve extends Curve {
  SineCurve({this.count = 3});
  final double count;

  // 2. override transformInternal() method
  @override
  double transformInternal(double t) {
    return sin(count * 2 * pi * t);
  }
}
