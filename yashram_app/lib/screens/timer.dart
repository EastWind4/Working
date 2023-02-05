import 'dart:async';
import 'package:flutter/material.dart';
import 'package:yashram_app/helpers/api.dart';

import '../models/events.dart';
import '../models/user.dart';

import 'package:http/http.dart' as http;

class ButtonWidget extends StatelessWidget {
  final String text;
  final Color color;
  final Color backgroundColor;
  final VoidCallback onClicked;

  const ButtonWidget(
      {Key? key,
      required this.text,
      required this.onClicked,
      this.color = Colors.white,
      this.backgroundColor = Colors.black})
      : super(key: key);
  @override
  Widget build(BuildContext context) => ElevatedButton(
      style: ElevatedButton.styleFrom(
          primary: backgroundColor,
          padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16)),
      onPressed: onClicked,
      child: Text(
        text,
        style: TextStyle(fontSize: 20, color: color),
      ));
}

class StopWatchTimerPage extends StatefulWidget {
  final User user;
  final Events event;

  StopWatchTimerPage({required this.user, required this.event});
  @override
  _StopWatchTimerPageState createState() => _StopWatchTimerPageState();
}

class _StopWatchTimerPageState extends State<StopWatchTimerPage> {
  static const countdownDuration = Duration(hours: 0, minutes: 0, seconds: 0);
  Duration duration = Duration();
  Timer? timer;

  bool count = true;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    reset();
  }

  void reset() {
    if (count) {
      setState(() => duration = countdownDuration);
    } else {
      setState(() => duration = Duration());
    }
  }

  void startTimer() {
    timer = Timer.periodic(Duration(seconds: 1), (_) => addTime());
  }

  void addTime() {
    var addSeconds = 1;
    setState(() {
      final seconds = duration.inSeconds + addSeconds;
      duration = Duration(seconds: seconds);
    });
  }

  Future<bool> postProgress() async {
    try {
      int hours = duration.inHours;

      print(hours);

      var params = {
        "eventId": widget.event.id,
        "userEmail": widget.user.email,
        "hours": 3,
      };
      var url = Uri.parse(API.BASEURL + API.postProgress);

      print(url);
      print(params);

      var resp = await http.post(url, body: params);
      print(resp);

      int statusCode = resp.statusCode;

      print(statusCode);

      if (statusCode == 200) //throw Exception("Request unsecessful");
        return true;
      return false;
    } catch (e) {
      print('here');
      return false;
    }
  }

  void stopTimer({bool resets = true}) async {
    if (resets) {
      bool resp = await postProgress();
      print(resp);
      if (resp) {
        reset();
        Navigator.pop(context);
      } else {
        showDialog(
            context: context,
            builder: (context) => Center(
                  child: Card(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.all(Radius.circular(10))),
                    clipBehavior: Clip.antiAliasWithSaveLayer,
                    child: Container(
                      width: MediaQuery.of(context).size.width / 2,
                      height: MediaQuery.of(context).size.height / 2,
                      child: Center(
                          child: Text(
                        "Progress Update Failed, Try Again",
                        style: TextStyle(
                            fontSize: 20, fontWeight: FontWeight.w500),
                      )),
                    ),
                  ),
                ));
      }
      // else //TODO: ShowSnackBar
    }
    setState(() => timer?.cancel());
  }

  GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) => Scaffold(
        key: _scaffoldKey,
        backgroundColor: Colors.orange[50],
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              buildTime(),
              SizedBox(
                height: 80,
              ),
              buildButtons()
            ],
          ),
        ),
      );

  Widget buildTime() {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    final hours = twoDigits(duration.inHours);
    final minutes = twoDigits(duration.inMinutes.remainder(60));
    final seconds = twoDigits(duration.inSeconds.remainder(60));
    return Row(mainAxisAlignment: MainAxisAlignment.center, children: [
      buildTimeCard(time: hours, header: 'HOURS'),
      SizedBox(
        width: 8,
      ),
      buildTimeCard(time: minutes, header: 'MINUTES'),
      SizedBox(
        width: 8,
      ),
      buildTimeCard(time: seconds, header: 'SECONDS'),
    ]);
  }

  Widget buildTimeCard({required String time, required String header}) =>
      Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: EdgeInsets.all(8),
            decoration: BoxDecoration(
                color: Colors.white, borderRadius: BorderRadius.circular(20)),
            child: Text(
              time,
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                  fontSize: 50),
            ),
          ),
          SizedBox(
            height: 24,
          ),
          Text(header, style: TextStyle(color: Colors.black45)),
        ],
      );

  Widget buildButtons() {
    final isRunning = timer == null ? false : timer!.isActive;

    if (isRunning) {
      return Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ButtonWidget(
              text: 'STOP',
              onClicked: () {
                if (isRunning) {
                  stopTimer(resets: false);
                }
              }),
          SizedBox(
            width: 12,
          ),
          ButtonWidget(text: "FINISH", onClicked: stopTimer),
        ],
      );
    } else if (!isRunning && duration.inSeconds == 0) {
      return ButtonWidget(
          text: "Start Timer!",
          color: Colors.black,
          backgroundColor: Colors.white,
          onClicked: () {
            startTimer();
          });
    } else {
      return Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ButtonWidget(
              text: 'START',
              onClicked: () {
                startTimer();
              }),
          SizedBox(
            width: 12,
          ),
          ButtonWidget(text: "FINISH", onClicked: stopTimer),
        ],
      );
    }
    // final isCompleted = duration.inSeconds == 0;
  }
}
