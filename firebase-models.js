/*!
 * Models for Firebase
 * Version 1.1
 *
 * 2014, Volodymyr Sergeyev & Samuel Beek
 * VULCAN labs
 */

(function(){
	var FirebaseModels = {};

	console.log("firebase model");

	FirebaseModels.new_id = function() {
		/* GUIDs generator. Guaranteed to be unique */
    	return 'xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
    };

	/* Base model */
	FirebaseModels.Model = {
		/* `type` is kinda `table`, `collection` in firebase dataref */
		type: "Model",

		/* `firebase` is dataref.
			One dataref may be used for all models in app;
			or several refs as well.
			This is like DB in Django.
		*/
		firebase: "", // new Firebase("https://blabla.firebaseio-demo.com/");

		/* Declarations of model fields */
		form: {
			render: function () {
				return "Not Implemented";
			}
		},

		/* Creates/Updates item in Model's collection */
		put: function (obj, onSuccess, onError) {
			console.log(obj);

			// Assign ID to object if not present
			if (!obj.hasOwnProperty("id"))
				obj.id = FirebaseModels.new_id();

			// Push to firebase
			this.firebase.child(obj.id).transaction(function(old_obj) {
			    console.log(old_obj);

				//merge the old object with the new object to preserve child objects/arrays
				if (old_obj != null) {
					$.extend( true, old_obj , obj );
					return old_obj;

				} else {
					return obj;
				}

			    console.log(old_obj);

			}, function(error, committed, snapshot) {
				if (!error && onSuccess) onSuccess(obj.id);

				if (error && onError) onError();
			});
		},

		/* Obtains 1 object. Returns `null` if it not exists */
		get: function (id, callback) {
			this.firebase.child(id).once('value', function(data) {
				console.log(data.val());
				callback(data.val());
			});

		},

		/* Check if object exists */
		exists: function (id, callback) {
			this.firebase.child(id).once('value', function(data) {
				callback(data.val() !== null);
			});
		},

		/* Get all objects */
		all: function (params, callback) {
			this.firebase.once('value', function(data) {
				callback(data.val() || []);
			});
		},

		/* Remove object */
		remove: function (id, callback) {
			this.firebase.child(id).remove(callback);
		}
	};

 	this.FirebaseModels = FirebaseModels;
}).call(this);
