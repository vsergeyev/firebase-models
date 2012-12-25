firebase-models
===============

Declarative Models for Firebase

https://www.firebase.com/


Models / Forms / Admin
----------------------

The idea is to use items in Firebase collections in `create-read-update-delete` way.

Say, declare model for chat message like this:

    var Chat = {};
    $.extend(Chat, FirebaseModels.Model, {
        type: "Chat",
        firebase: new Firebase("https://blabla.firebaseio-demo.com/Chat/"),
        form: FirebaseForms.Form({
            fields: {
                username: FirebaseForms.TextField({label: "Username", field: "username", required: "required"}),
                created_at: FirebaseForms.DateField({label: "Created at", field: "created_at", required: "required"}),
                text: FirebaseForms.BigTextField({label: "Text", field: "text", required: "required"})
            }
        })
    });

Then use it to get list of items:

    Chat.all({},
        function(items) {
            // do some real action with items - process, render, etc
        }
    );

Or, using Forms and Admin UI routines:

    // "#items" is jQuery selector for HTML table, where to render items
    // "#tmplChatRow" is selector of jQuery template chunk
    FirebaseAdmin.list(Chat, "#items", "#tmplChatRow");

Create new item:

    Chat.put({
        "username": "test user",
        "text": "Hi there!",
        "created_at": Date.now()
    });

Or, using Forms and Admin UI routines:

    // Setting handler for `Add item` button in your UI
    FirebaseAdmin.on_add(Chat, ".add-item", "#item_form");

Get item:

    // "1" is item ID
    Chat.get("1",
        function(item) {
            // do something with item
        }
    );

Edit item:

    // Setting handler for `Edit` button in your UI
    FirebaseAdmin.on_edit(Chat, ".edit-item", "#item_form");

Remove item:

    // Remove it yourself
    Chat.remove("1",
        function() {
            // do something after item was removed
        }
    );

    // Or let user do it in UI: handler for `Remove` button
    FirebaseAdmin.on_remove(Chat, ".remove-item", "tr.item-row-");


Forms Fields
------------

 * TextField - renders to one line text input
 * BigTextField - renders to textarea
 * DateField - renders to html 5 date picker
 * CheckboxField - renders to checkbox
 * CheckboxListField - a list of checkboxes with same 'name' attr
 * ChoiceField - selectbox with a list of options


Dependencies
------------

 * JQuery
 * JQuery templates
 * Bootstrap
