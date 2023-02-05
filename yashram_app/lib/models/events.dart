import 'package:flutter/material.dart';

class Events {
  late String id;
  late String title;
  late String description;
  late String eventImage;

  Events(
      {required this.id,
      required this.title,
      required this.description,
      required this.eventImage});

  Events.fromJSON(Map<String, dynamic> obj) {
    this.id = obj["_id"];
    this.title = obj["title"];
    this.description = obj["description"];
    this.eventImage = obj["eventImage"];
  }
}

// [{"_id":"63de50e1c83158bad8e81153","creatorEmail":"abcd@gmail.com","title":"yayyy","description":"wdlkvbf","date":"today","eventImage":"https://res.cloudinary.com/dqpspujbg/image/upload/v1675508335/test/events/yayyy.jpg","location":"newrifber","registeredVolunteers":["yashbrahmbhatt26@gmail.com"],"__v":1}]}
