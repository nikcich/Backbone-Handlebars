let Song = Backbone.Model.extend();

let Songs = Backbone.Collection.extend({        // Songs Plural, list of Song objects
    model: Song
});

let SongView = Backbone.View.extend({           // default tag is a div when rendered
    tagName: "div",                      
    className: "list-item",                     // Class name
    template: Handlebars.compile($("#search_template").html()), // Handlebar template

    events:{                                    // events to listen for
        "click": "onClick",
        "mouseover": "onHover",
        "mouseleave": "onLeave",
    },

    initialize: function() {

    },

    onClick: function(){                        // event handler
        console.log(this.model.get("title"));
    },
    onHover: function(){                        // event handler
        this.$el.addClass("hover-class");       // Add class to element
    },
    onLeave: function(){                        // event handler
        this.$el.removeClass("hover-class");    // remove class from element
    },

    render: function(){                         // render
        this.$el.html(this.model.get("title")); // adding text to the default element
        this.$el.append(this.template(this.model.toJSON()));         // Appending the handlebar template

        // this.model.toJSON() only works here for whatever reason
        // It replaces template variable {{title}} etc woth the title variable
        // from the model

        return this;
    }
});

let SongsView = Backbone.View.extend({
    render: function(){                        // 
        const self = this;                     // THIS will be different inside the .each
        this.model.each(function(song){         
            let songView = new SongView({ model: song });   // Create a SongView
            self.$el.append(songView.render().$el);         // Append the songViews element to the SOngsView list element
        });
    }
});

let listofsong = new Songs([ // Pass regular array to the Songs collection constructor.
    new Song({title: "The Conference of the Birds"}),   // Define structure
    new Song({title: "Plains of the Purple Buffalo"}),
    new Song({title: "Sea of the Dying Dhow"}),
    new Song({title: "Wingsfortheirsmiles"}),
]);

let songlist = new SongsView({ el: "#container", model: listofsong }); // Create a songlist element for given model and element id that exists in html already
songlist.render(); // Render the original list element






