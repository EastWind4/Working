import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '/models/events.dart';
import '/screens/timer.dart';
import '../models/user.dart';
import '../services/events.dart';

class VolEventsScreen extends StatefulWidget {
  final User user;
  const VolEventsScreen({required this.user});

  @override
  State<VolEventsScreen> createState() => _VolEventsScreenState();
}

class _VolEventsScreenState extends State<VolEventsScreen> {
  VolEvents evs = VolEvents();

  void goToTimer(User usr, Events ev) {
    Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => StopWatchTimerPage(user: usr, event: ev)));
    // Navigator.of(context)
    //     .push(MaterialPageRoute(builder: (context) => StopWatchTimerPage()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:
          // Center(
          //     child: OutlinedButton(
          //       child: Text("Start Timer"),
          //       onPressed: goToTimer,
          //   )
          // )
          FutureBuilder(
        future: evs.getAllEvents(widget.user.email),
        builder: (context, snapshot) {
          print(snapshot.data);
          if (snapshot.hasData) {
            List<Events> evs = snapshot.data!;

            return ListView.builder(
                itemCount: evs.length,
                itemBuilder: (context, i) {
                  print(i);

                  return Card(
                    elevation: 5,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.all(Radius.circular(20))),
                    clipBehavior: Clip.antiAliasWithSaveLayer,
                    child: Container(
                      width: MediaQuery.of(context).size.width - 20,
                      height: 250,
                      decoration: BoxDecoration(
                          image: DecorationImage(
                        image: NetworkImage(evs[i].eventImage),
                        fit: BoxFit.cover,
                      )),
                      child: Container(
                        width: MediaQuery.of(context).size.width - 20,
                        height: 250,
                        color: Colors.black.withOpacity(0.3),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Padding(
                              padding: const EdgeInsets.fromLTRB(
                                  16.0, 8.0, 8.0, 8.0),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    evs[i].title,
                                    style: TextStyle(
                                        fontSize: 24,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white),
                                    textAlign: TextAlign.left,
                                  ),
                                ],
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.fromLTRB(
                                  16.0, 8.0, 8.0, 8.0),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    evs[i].description,
                                    style: TextStyle(
                                        fontSize: 18, color: Colors.white),
                                  ),
                                ],
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: [
                                  FilledButton.icon(
                                      onPressed: () {
                                        goToTimer(widget.user, evs[i]);
                                      },
                                      icon: Icon(Icons.alarm),
                                      label: Text("Start Timer")),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                });
            //   ListTile(
            //     title: Text(evs[i].title),
            //     trailing: FilledButton.icon(
            //         onPressed: () {
            //           goToTimer(widget.user, evs[i]);
            //         },
            //         icon: Icon(Icons.alarm),
            //         label: Text("Start Timer")),
            //   );
            // });
          } else {
            return Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }
}
