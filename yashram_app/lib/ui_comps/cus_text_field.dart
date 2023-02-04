import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '/utils/color_palette.dart';

import '../models/errors.dart';
import 'shake_animation_curve.dart';

class CusTextField extends StatefulWidget {
  final String label;
  final IconData icon;
  final TextEditingController controller;
  final bool isPassword;
  final FieldError? err;

  CusTextField({
    required this.label,
    required this.icon,
    required this.controller,
    isPassword,
    this.err,
  }) : isPassword = isPassword ?? false;

  @override
  _CusTextFieldState createState() => _CusTextFieldState();
}

class _CusTextFieldState extends State<CusTextField>
    with SingleTickerProviderStateMixin {
  bool obscure = false;
  bool animate = true;
  late final AnimationController _controller;
  late final Animation<double> _shakeAnimation;

  @override
  void initState() {
    super.initState();
    obscure = widget.isPassword ? true : false;

    _controller = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 400));
    _shakeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: SineCurve(),
    ));
    _controller.addStatusListener(_updateStatus);
  }

  @override
  Widget build(BuildContext context) {
    Color respColor = widget.err == null ? Colors.blueGrey : Colors.redAccent;
    if (widget.err != null && animate) {
      shake();
    }

    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
//      height: 50,
          child: Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 18.0),
              child: TextField(
                controller: widget.controller,
                obscureText: obscure,
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide(
                        width: 3,
                        color: widget.err == null
                            ? Colors.blueGrey
                            : Colors.redAccent,
                      )),
                  labelText: widget.label,
                  labelStyle: TextStyle(
                      // color: Colors.blueGrey,
                      ),
                  prefixIcon: Builder(builder: (context) {
                    if (!widget.isPassword) {
                      return shakeAnimation(Icon(
                        widget.icon,
                        color: respColor,
                      ));
                    }

                    return shakeAnimation(IconButton(
                      icon: obscure
                          ? Icon(
                              Icons.visibility,
                              color: respColor,
                            )
                          : Icon(Icons.visibility_off, color: respColor),
                      onPressed: () {
                        setState(() {
                          obscure = !obscure;
                        });
                      },
                    ));
                  }),
                ),
                style: const TextStyle(height: 1.75),
              ),
            ),
          ),
        ),
        if (widget.err != null) ...[
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Text(
              widget.err!.msg(widget.label),
              style: TextStyle(color: respColor),
            ),
          )
        ],
      ],
    );
  }

  void _updateStatus(AnimationStatus status) {
    if (status == AnimationStatus.completed) {
      _controller.reset();
    }
  }

  void shake() {
    _controller.forward();
  }

  Widget shakeAnimation(Widget child) {
    return AnimatedBuilder(
      animation: _controller,
      child: child,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(_shakeAnimation.value * 5, 0),
          child: child,
        );
      },
    );
  }
}
