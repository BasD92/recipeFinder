(function () {

    let userModel = Backbone.Model.extend(
        /** @lends userModel.prototype */
        {
            /**
             * @class Model for users
             *
             * @augments Backbone.Model
             * @constructs
             *
             * 'default' return each time a instance of the User model is created
             */
            default: () => {
                return {
                    title: "User name"
                };
            }
        });

    let otherModel = Backbone.Model.extend(
        /** @lends otherModel.prototype */
        {
            /**
             * @class Model when another one will cook for you
             *
             * @augments Backbone.Model
             * @constructs
             *
             * 'default' return each time a instance of the User model is created
             */
            default: () => {
                return {
                    title: "Name of other cooking person"
                };
            }
        });

    /**
     *  Create collection model to receive all videos
     */
    let videoCollection = Backbone.Collection.extend(
        /** @lends VideoCollection.prototype */
        {
            /**
             * @class Collection of videos
             *
             * @augments Backbone.Model
             * @constructs
             *
             * Main url without params
             */
            url: 'https://www.googleapis.com/youtube/v3/search'
        });

    /**
     *  Create collection model to receive all recipes
     */
    let recipeCollection = Backbone.Collection.extend(
        /** @lends RecipeCollection.prototype */
        {
            /**
             * @class Collection of recipes
             *
             * @augments Backbone.Model
             * @constructs
             *
             * Main url without params
             */
            url: 'http://www.recipepuppy.com/api/'
        });

    /**
     *  Create view class
     */
    let userView = Backbone.View.extend(
        /** @lends UserView.prototype */
        {
            el: $('#searchForm'),

            /**
             * @member {{}} - When click submit render will work
             */
            events: {
                "submit": "render"
            },

            /**
             * @member {{}} - Render text message to user
             */
            render: (e) => {
                e.preventDefault();

                /**
                 *  Get name user
                 */
                let nameUser = $('#name1').val();
                if (nameUser) {
                    $('#cookName').html('<h2>' + 'Great ' + nameUser + '!' + ' So you want to cook for yourself :) ' +
                        'Take a look at these recipes' + '</h2>');
                }
            }
        });

    /**
     *  Inheritance of Userview
     */
    let otherView = userView.extend(
        /** @lends otherView.prototype */
        {
            /**
             * @member {{}} - Render text message the 'chef' of the user
             */
            render: (e) => {
                e.preventDefault();

                // Get name user
                let nameOther = $('#name2').val();
                if (nameOther) {
                    $('#cookName').html('<h2>' + 'Show this to ' + nameOther + ' and maybe he/she want to cook for you :)'
                        + '</h2>');
                }
            }
        });

    /**
     *  Create videosView
     */
    let videosView = Backbone.View.extend(
        /** @lends VideosView.prototype */
        {
            el: $('#searchForm'),

            /**
             * @member {{}} - When click submit render will work
             */
            events: {
                "submit": "render"
            },

            /**
             * @member {{}} - Render all videos
             */
            render: (e) => {
                e.preventDefault();
                /**
                 *  Instance of collection model videoCollection
                 */
                let videos = new videoCollection();

                // Store ingredients in variable
                let ingredient1 = $('#ingredient1').val();
                let ingredient2 = $('#ingredient2').val();
                let ingredient3 = $('#ingredient3').val();
                let ingredient4 = $('#ingredient4').val();
                let allIngredients = ingredient1 + ',' + ingredient2 + ',' + ingredient3 + ',' + ingredient4;
                let recipe = 'recipe';

                /**
                 *  Fetch all videos
                 */
                videos.fetch({
                    data: { part: 'snippet', q: allIngredients+recipe, maxResults: 4,
                        key: 'AIzaSyDns6HiujbQbbeQscYNMPaoie95yO6oMqQ'},
                    success: function (videos) {
                        $('#videos').empty();
                        videos.each(function(x) {
                            let items = x.get('items');
                            for(let values of items) {
                                $('#videos').append('<iframe src=' + 'http://www.youtube.com/embed/' + values.id['videoId'] + ' + class="video"></iframe>');
                            }
                        })
                    },
                    /**
                     *  Error message
                     */
                    error: function error() {
                        alert('Cannot find videos!');
                    }
                });
            }
        });

    /**
     *  Create recipesView
     */
    let recipesView = Backbone.View.extend(
        /** @lends RecipesView.prototype */
        {
            el: $('#searchForm'),

            /**
             * @member {{}} - When click submit render will work
             */
            events: {
                "submit": "render"
            },

            /**
             * @member {{}} - Render all recipes
             */
            render: (e) => {
                e.preventDefault();
                // Instance of collection model recipeCollection
                let recipes = new recipeCollection();

                /**
                 * Store all ingredient in variable
                 */
                let ingredient1 = $('#ingredient1').val();
                let ingredient2 = $('#ingredient2').val();
                let ingredient3 = $('#ingredient3').val();
                let ingredient4 = $('#ingredient4').val();
                let allIngredients = ingredient1 + ',' + ingredient2 + ',' + ingredient3 + ',' + ingredient4;

                /**
                 * Fetch all recipes
                 */
                recipes.fetch({
                    dataType: 'jsonp',
                    jsonpCallback: 'jsonpCallback',
                    data: { i: allIngredients, page: 1},
                    success: function (recipes) {
                        $('#recipes').empty();
                        recipes.each(function(x) {
                            let results = x.get('results')
                            for(let values of results) {
                                $('#recipes').append("<div class='recipe'><ul>" +
                                    "<span class='bold'>Title</span>" +
                                    "<li>" + values.title + "</li>" +
                                    "<li><a href=" + values.href + ">Link to recipe</a></li>" +
                                    "<span class='bold'>Ingredients</span>" +
                                    "<li>" + values.ingredients + "</li>" +
                                    "<li><img src=" + values.thumbnail + "></li>" +
                                    "</ul></div>");
                            }
                        })
                    },

                    /**
                     * Error message
                     */
                    error: function error() {
                        alert('Cannot find recipes!');
                    }
                });
            }
        });

    /**
     * Store instance of User model in user variable
     */
    let user = new userModel({});

    /**
     *  Instance of Userview
     */
    new userView({model: user});

    /**
     *  Instance of Othermodel
     */
    let other = new otherModel({});

    /**
     *  Instance of otherView
     */
    new otherView({model: other});

    /**
     *  Instance of VideosView
     */
    new videosView();

    /**
     *  Instance of RecipesView
     */
    new recipesView();

})(); 
