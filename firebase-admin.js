/*!
 * Admin CRUD for Firebase
 * Version 1.0.0
 *
 * 2012, Volodymyr Sergeyev
 * VULCAN labs
 */

(function(){
    var FirebaseAdmin = {
        list: function (model, el, row_template) {
            /* Renders list of Model items.

            model - firebase model, ex. Chat
            el - selector of wrapper for items, ex. "#items" table
            row_template - jQuery template selector, ex. "#tmplChatRow"
             */
            model.all({},
                function(items) {
                    $(el).html("");
                    $.each(items, function (k, v) {
                        $(el).append($(row_template).tmpl(v));
                    })
                }
            );
        },

        on_add: function (model, btn, form) {
            /* Set handler for Add button click

            model - firebase model
            btn - selector of "Add item" button element, ex. ".add-item"
            form - selector of bootstrap modal form, ex. "#item_form"
             */
            $(document).on("click", btn, function (e) {
                e.preventDefault();

                $(form).find("h3").html("Add item");
                $(form).find(".modal-body").html(model.form.render());
                $(form).modal();
            });
        },

        on_edit: function (model, btn, form) {
            /* Set handler for Edit button click

            model - firebase model
            btn - selector of "Edit item" button element, ex. ".edit-item"
            form - selector of bootstrap modal form, ex. "#item_form"

            Note: button should have `data-id` attr with value of item `id`
             */
            $(document).on("click", btn, function (e) {
                var id = $(this).data("id");

                e.preventDefault();

                model.get(id, function (item) {
                    $(form).find("h3").html("Edit item");
                    $(form).find(".modal-body").html(model.form.render(item));
                    $(form).modal(); 
                });
            });
        },

        on_save: function (model, form, callback, callback_error) {
            /* Set handler for submit of form

            model - firebase model
            form - selector of bootstrap modal form, ex. "#item_form"
            callback - callback function for success (optional)
            callback_error - callback function for error (optional)
             */
            
            function serializeObject(obj) {
                /* Helper function */
                var o = {};
                var a = obj.serializeArray();
                $.each(a, function() {
                   if (o[this.name]) {
                       if (!o[this.name].push) {
                           o[this.name] = [o[this.name]];
                       }
                       o[this.name].push(this.value || '');
                   } else {
                       o[this.name] = this.value || '';
                   }
                });
                return o;
            };

            $(form).on('submit', 'form', function(e) {
                e.preventDefault();

                //console.log(serializeObject($(this)));

                model.put(serializeObject($(this)),
                    function(id) { // Success
                        $(form).modal("hide");

                        if (callback) callback();
                    },
                    function() { // Error
                        if (callback_error) callback_error();
                    }
                );
            });
        },

        on_remove: function (model, btn, el, callback, callback_error) {
            /* Set handler for Remove button click
            
            model - firebase model
            btn - selector of "Edit item" button element, ex. ".remove-item"
            el - selector of item row prefix, ex. "tr.item-row-"
            callback - callback function for success (optional)
            callback_error - callback function for error (optional)

            Note #1: button should have `data-id` attr with value of item `id`
            Note #2: item row selector expected to be `el + id` string
             */
            $(document).on("click", ".remove-item", function (e) {
                var id = $(this).data("id");

                e.preventDefault();

                model.remove(id, function (success) {
                    if (success) { // Success
                        $(el+id).remove();

                        if (callback) callback();
                    } else { // Error
                        if (callback_error) callback_error();
                    }
                })
            });
        }
    };

    this.FirebaseAdmin = FirebaseAdmin;
}).call(this);