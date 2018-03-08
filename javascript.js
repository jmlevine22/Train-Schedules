 var config = {
    apiKey: "AIzaSyDdP_lfQKF3USEueXZG7JWwjT6HvnoCUU8",
    authDomain: "train-schedule-d5fb6.firebaseapp.com",
    databaseURL: "https://train-schedule-d5fb6.firebaseio.com",
    projectId: "train-schedule-d5fb6",
    storageBucket: "",
    messagingSenderId: "853091591033"
  };

  firebase.initializeApp(config);


  var database = firebase.database();


  var trainName = "";
	var destination = "";
  var frequency = 0;
  var firstTrain = 0;


  

$("#submit").on("click", function(event) {

  event.preventDefault()


  


	    trainName = $("#train-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      firstTrain = $("#first-input").val().trim();
   
      database.ref().push({
        fTrainName : trainName,
        fDestination : destination,
        fFrequency : frequency,
        firstTrain : firstTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

     });

 });

     

    

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot, prevChildKey) {

  var sp = snapshot.val();

  console.log(sp.fTrainName);
  console.log(sp.fDestination);
  console.log(sp.fFrequency);
  console.log(sp.firstTrain);



   var firstTrainCalc = moment(firstTrain, "HH:mm").subtract(1, "years");
       console.log(firstTrainCalc);

       var currentTime = moment();
       console.log("current time: " + moment(currentTime).format("HH:mm"));

       var diffTime = moment().diff(moment(firstTrainCalc), "minutes");
       console.log ("Difference in time: " + diffTime);

       var tRemainder = diffTime % fFrequency;
       console.log(tRemainder)

       var tMinutesAway = fFrequency - tRemainder;
       console.log("Minutes til train: " + tMinutesAway);

       var nextTrain = moment().add(tMinutesAway, "minutes");
       console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));

 $("#train-schedule > tbody").append("<tr><td>" + sp.fTrainName + "</td><td>" +sp.fDestination + "</td><td>" +
 sp.fFrequency + "</td><td>" + (moment(nextTrain).format("hh:mm"))+ "</td><td>" + tMinutesAway  + "</td></tr>");



}, function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

$("#train-schedule").text(sp.trainName);


