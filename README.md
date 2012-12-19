firebase-models
===============

Declarative Models for Firebase

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
    <script src='https://cdn.firebase.com/v0/firebase.js'></script>
    <script src="firebase-models.js"></script>
    <script>
        var Chat = {};
        $.extend(Chat, FirebaseModels.Model, {
            type: "Chat",
            firebase: new Firebase("https://blabla.firebaseio-demo.com/Chat/")
        });

        Chat.put({"text": "Hi there!"}, function(id) {console.log("OK", id);}, function() {console.log("ERROR!!!");});

        Chat.get("19b3ef3e-dc65-74b0-bada-f40085459d29", function(item) {console.log(item)});

        Chat.get("not-existing-item-id", function(item) {console.log(item)});

        Chat.all(function(items) {console.log(items)});
    </script>