/*!
 * Forms for Models for Firebase
 * Version 1.0.0
 *
 * 2012, Volodymyr Sergeyev
 * VULCAN labs
 */

(function(){
    var FirebaseForms = {};

    /* ---- FIELDS --------------------------------------------------------- */

    /* Base Field */
    FirebaseForms.Field = {
        // params
        label: "",
        field: "",
        required: "",
        initial: "",

        render: function () {
            // Renders html form input
        }
    };

    FirebaseForms.TextField = function (params) {
        /* Html text input */
        var f = {};

        $.extend(f, FirebaseForms.Field, params, {
            render: function () {
                return '<label>'+this.label+'</label><input type="text" name="'+this.field+'" id="id_'+this.field+'" placeholder="'+this.label+'" '+this.required+' value="'+this.initial+'" />';
            }
        });

        return f;
    };

    FirebaseForms.DateField = function (params) {
        /* Html 5 date input */
        // params is {} with any of `label, field, required, initial`
        var f = {};

        $.extend(f, FirebaseForms.Field, params, {
            render: function () {
                return '<label>'+this.label+'</label><input type="date" name="'+this.field+'" id="id_'+this.field+'" '+this.required+' value="'+this.initial+'" />';
            }
        });

        return f;
    };

    FirebaseForms.BigTextField = function (params) {
        /* Html textarea */
        var f = {};

        $.extend(f, FirebaseForms.Field, params, {
            render: function () {
                return '<label>'+this.label+'</label><textarea name="'+this.field+'" id="id_'+this.field+'" placeholder="'+this.label+'" '+this.required+'>'+this.initial+'</textarea>';
            }
        });

        return f;
    };

    FirebaseForms.CheckboxField = function (params) {
        /* Html checkbox */
        var f = {};

        $.extend(f, FirebaseForms.Field, params, {
            render: function () {
                var is_checked = this.initial ? "checked" : "";
                return '<label class="checkbox"><input type="checkbox" name="'+this.field+'" id="id_'+this.field+'" '+is_checked+' '+this.required+' />'+this.label+'</label>';
            }
        });

        return f;
    };

    FirebaseForms.CheckboxListField = function (params) {
        /* Html group of checkboxes with same `name` */
        // `query` expected to be in params, query is object {key: value, ...}
        // every item of query will become checkbox input
        // `initial` may be empty or array
        var f = {
            query: {}
        };

        $.extend(f, FirebaseForms.Field, params, {
            render: function () {
                var that = this,
                    res = '<h3>' + this.label + '</h3>';

                $.each(this.query, function (k, v) {
                    // `initial` expected to be an array
                    var is_checked = ($.inArray(k, that.initial) > -1) ? "checked" : "";

                    res += '<label class="checkbox"><input type="checkbox" name="'+that.field+'" value="'+k+'" '+is_checked+' '+that.required+' /> '+v+'</label>';
                })

                return res;
            }
        });

        return f;
    };

    FirebaseForms.ChoiceField = function (params) {
        /* Html select */
        // `query` expected to be in params, query is object {key: value, ...}
        // every item of query will become option in dropdown list
        var f = {
            query: {}
        };

        $.extend(f, FirebaseForms.Field, params, {
            render: function () {
                var that = this,
                    res = '<label>' + this.label + '</label><select name="'+this.field+'" id="id_'+this.field+'"><option value="">-- '+this.label+' --</option>';

                $.each(this.query, function (k, v) {
                    var is_checked = (k === that.initial) ? 'selected="selected"' : '';

                    res += '<option value="'+k+'" '+is_checked+'>'+v+'</option>';
                })

                return res + '</select>';
            }
        });

        return f;
    };

    FirebaseForms.FileField = function (params) {
        /* Html text file */
        var f = {
            accept: "", //say "image/*" to accept images only
            capture: "" //say "camera" to allow use camera on smartphone/tablet as source  of image
        };

        // TODO: Find better way then appending oneliner to every file control
        // We use FileReader object to load file content locally
        var file_change = "var $this = $(this), reader = new FileReader(); reader.onload=function(e) {$this.data('payload', e.target.result)}; reader.readAsDataURL($this[0].files[0]);";
        /* Source: */
        // var $this = $(this),
        //     reader = new FileReader();

        // reader.onload = function(e) {
        //     $this.data('payload', e.target.result)
        // };
        // reader.readAsDataURL($this[0].files[0]);

        $.extend(f, FirebaseForms.Field, params, {
            render: function () {
                return '<label>'+this.label+'</label>'
                    + '<input type="file" accept="' + this.accept
                    + '" capture="' + this.capture + '" name="' + this.field
                    + '" id="id_' + this.field + '" placeholder="' + this.label
                    + '" '+this.required+' onchange="' + file_change + '" />';
            }
        });

        return f;
    };

    /* ---- FORMS ---------------------------------------------------------- */

    FirebaseForms.Form = function (params) {
        // params is {fields: {}, onSave: function}
        var f = {};

        $.extend(f, params, {
            render: function (item) {
                var res = '<form action="" method="post" enctype="multipart/form-data">';

                // in case we edit item
                if (item) {
                    res += '<input type="hidden" name="id" id="id_id" value="' + item.id + '" />';
                }

                $.each(this.fields, function (k, v) {
                    // If we edit item - assign initial value for field
                    v.initial = "";
                    if (item && item.hasOwnProperty(v.field))
                        v.initial = item[v.field];
                    // Render field as a piece of html
                    res += "<p>" + v.render() + "</p>";
                });

                res += '<input type="submit" class="btn btn-primary" value="Submit" />';
                res += '</form>';
                return res;
            }
        });

        return f;
    };

    this.FirebaseForms = FirebaseForms;
}).call(this);