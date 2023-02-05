import 'dart:convert';

import 'package:yashram_app/helpers/api.dart';
import 'package:http/http.dart' as http;
import '../models/events.dart';

class VolEvents {
  Future<List<Events>?> getAllEvents(String email) async {
    try {
      var url = Uri.parse(API.BASEURL + API.regEvents);
      var params = {
        "email": email,
      };
      var resp = await http.post(url, body: params);
      String data = resp.body;
      int statusCode = resp.statusCode;

      if (statusCode != 200) throw Exception("Request unsecessful");

      print("success");
      print(data);

      var d = await json.decode(data);

      print("jhdakjsh");
      print("h ${d['events'].length}");

      List<Events> evs = [];

      for (var i = 0; i < d['events'].length; i++) {
        print(Events.fromJSON(d['events'][i]));
      }

      d["events"].forEach((e) {
        // print(Events.fromJSON(e));
        evs.add(Events.fromJSON(e));
      });

      print("dnskjdf");
      print(evs);

      return evs;
    } catch (e) {
      print("error");
      return null;
    }
  }
}
