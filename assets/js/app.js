var config = {
  apiKey: "AIzaSyBYXaPL71qCVdjY97xGOCfU-z4NGf1u49E",
  authDomain: "idunnoknow-af8c7.firebaseapp.com",
  databaseURL: "https://idunnoknow-af8c7.firebaseio.com",
  projectId: "idunnoknow-af8c7",
  storageBucket: "idunnoknow-af8c7.appspot.com",
  messagingSenderId: "289868028838"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#Destination").val().trim();
  var firstTrainTime = $("#firstTrainTime").val().trim();
  var Frequency = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    start: firstTrainTime,
    Frequency: Frequency,
  };

  database.ref("/trainInfo").push(newTrain);

  $("#trainName").val("");
  $("#Destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
});

database.ref("/trainInfo").on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().start;
  var Frequency = childSnapshot.val().Frequency

  var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  var tRemainder = diffTime % Frequency;

  var tMinutesTillTrain = Frequency - tRemainder;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(Frequency),
    $("<td>").text(firstTrainTime),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
  );

  $("#trainTable > tbody").append(newRow);
});