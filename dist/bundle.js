"use strict";

(function () {

    var userModel = Backbone.Model.extend(
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
        default: function _default() {
            return {
                title: "User name"
            };
        }
    });

    var otherModel = Backbone.Model.extend(
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
        default: function _default() {
            return {
                title: "Name of other cooking person"
            };
        }
    });

    /**
     *  Create collection model to receive all videos
     */
    var videoCollection = Backbone.Collection.extend(
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
    var recipeCollection = Backbone.Collection.extend(
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
    var userView = Backbone.View.extend(
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
        render: function render(e) {
            e.preventDefault();

            /**
             *  Get name user
             */
            var nameUser = $('#name1').val();
            if (nameUser) {
                $('#cookName').html('<h2>' + 'Great ' + nameUser + '!' + ' So you want to cook for yourself :) ' + 'Take a look at these recipes' + '</h2>');
            }
        }
    });

    /**
     *  Inheritance of Userview
     */
    var otherView = userView.extend(
    /** @lends otherView.prototype */
    {
        /**
         * @member {{}} - Render text message the 'chef' of the user
         */
        render: function render(e) {
            e.preventDefault();

            // Get name user
            var nameOther = $('#name2').val();
            if (nameOther) {
                $('#cookName').html('<h2>' + 'Show this to ' + nameOther + ' and maybe he/she want to cook for you :)' + '</h2>');
            }
        }
    });

    /**
     *  Create videosView
     */
    var videosView = Backbone.View.extend(
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
        render: function render(e) {
            e.preventDefault();
            /**
             *  Instance of collection model videoCollection
             */
            var videos = new videoCollection();

            // Store ingredients in variable
            var ingredient1 = $('#ingredient1').val();
            var ingredient2 = $('#ingredient2').val();
            var ingredient3 = $('#ingredient3').val();
            var ingredient4 = $('#ingredient4').val();
            var allIngredients = ingredient1 + ',' + ingredient2 + ',' + ingredient3 + ',' + ingredient4;
            var recipe = 'recipe';

            /**
             *  Fetch all videos
             */
            videos.fetch({
                data: { part: 'snippet', q: allIngredients + recipe, maxResults: 4,
                    key: 'AIzaSyDns6HiujbQbbeQscYNMPaoie95yO6oMqQ' },
                success: function success(videos) {
                    $('#videos').empty();
                    videos.each(function (x) {
                        var items = x.get('items');
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var values = _step.value;

                                $('#videos').append('<iframe src=' + 'http://www.youtube.com/embed/' + values.id['videoId'] + ' + class="video"></iframe>');
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    });
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
    var recipesView = Backbone.View.extend(
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
        render: function render(e) {
            e.preventDefault();
            // Instance of collection model recipeCollection
            var recipes = new recipeCollection();

            /**
             * Store all ingredient in variable
             */
            var ingredient1 = $('#ingredient1').val();
            var ingredient2 = $('#ingredient2').val();
            var ingredient3 = $('#ingredient3').val();
            var ingredient4 = $('#ingredient4').val();
            var allIngredients = ingredient1 + ',' + ingredient2 + ',' + ingredient3 + ',' + ingredient4;

            /**
             * Fetch all recipes
             */
            recipes.fetch({
                dataType: 'jsonp',
                jsonpCallback: 'jsonpCallback',
                data: { i: allIngredients, page: 1 },
                success: function success(recipes) {
                    $('#recipes').empty();
                    recipes.each(function (x) {
                        var results = x.get('results');
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = results[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var values = _step2.value;

                                $('#recipes').append("<div class='recipe'><ul>" + "<span class='bold'>Title</span>" + "<li>" + values.title + "</li>" + "<li><a href=" + values.href + ">Link to recipe</a></li>" + "<span class='bold'>Ingredients</span>" + "<li>" + values.ingredients + "</li>" + "<li><img src=" + values.thumbnail + "></li>" + "</ul></div>");
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    });
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
    var user = new userModel({});

    /**
     *  Instance of Userview
     */
    new userView({ model: user });

    /**
     *  Instance of Othermodel
     */
    var other = new otherModel({});

    /**
     *  Instance of otherView
     */
    new otherView({ model: other });

    /**
     *  Instance of VideosView
     */
    new videosView();

    /**
     *  Instance of RecipesView
     */
    new recipesView();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInVzZXJNb2RlbCIsIkJhY2tib25lIiwiTW9kZWwiLCJleHRlbmQiLCJkZWZhdWx0IiwidGl0bGUiLCJvdGhlck1vZGVsIiwidmlkZW9Db2xsZWN0aW9uIiwiQ29sbGVjdGlvbiIsInVybCIsInJlY2lwZUNvbGxlY3Rpb24iLCJ1c2VyVmlldyIsIlZpZXciLCJlbCIsIiQiLCJldmVudHMiLCJyZW5kZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJuYW1lVXNlciIsInZhbCIsImh0bWwiLCJvdGhlclZpZXciLCJuYW1lT3RoZXIiLCJ2aWRlb3NWaWV3IiwidmlkZW9zIiwiaW5ncmVkaWVudDEiLCJpbmdyZWRpZW50MiIsImluZ3JlZGllbnQzIiwiaW5ncmVkaWVudDQiLCJhbGxJbmdyZWRpZW50cyIsInJlY2lwZSIsImZldGNoIiwiZGF0YSIsInBhcnQiLCJxIiwibWF4UmVzdWx0cyIsImtleSIsInN1Y2Nlc3MiLCJlbXB0eSIsImVhY2giLCJ4IiwiaXRlbXMiLCJnZXQiLCJ2YWx1ZXMiLCJhcHBlbmQiLCJpZCIsImVycm9yIiwiYWxlcnQiLCJyZWNpcGVzVmlldyIsInJlY2lwZXMiLCJkYXRhVHlwZSIsImpzb25wQ2FsbGJhY2siLCJpIiwicGFnZSIsInJlc3VsdHMiLCJocmVmIiwiaW5ncmVkaWVudHMiLCJ0aHVtYm5haWwiLCJ1c2VyIiwibW9kZWwiLCJvdGhlciJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFlBQVk7O0FBRVQsUUFBSUEsWUFBWUMsU0FBU0MsS0FBVCxDQUFlQyxNQUFmO0FBQ1o7QUFDQTtBQUNJOzs7Ozs7OztBQVFBQyxpQkFBUyxvQkFBTTtBQUNYLG1CQUFPO0FBQ0hDLHVCQUFPO0FBREosYUFBUDtBQUdIO0FBYkwsS0FGWSxDQUFoQjs7QUFrQkEsUUFBSUMsYUFBYUwsU0FBU0MsS0FBVCxDQUFlQyxNQUFmO0FBQ2I7QUFDQTtBQUNJOzs7Ozs7OztBQVFBQyxpQkFBUyxvQkFBTTtBQUNYLG1CQUFPO0FBQ0hDLHVCQUFPO0FBREosYUFBUDtBQUdIO0FBYkwsS0FGYSxDQUFqQjs7QUFrQkE7OztBQUdBLFFBQUlFLGtCQUFrQk4sU0FBU08sVUFBVCxDQUFvQkwsTUFBcEI7QUFDbEI7QUFDQTtBQUNJOzs7Ozs7OztBQVFBTSxhQUFLO0FBVFQsS0FGa0IsQ0FBdEI7O0FBY0E7OztBQUdBLFFBQUlDLG1CQUFtQlQsU0FBU08sVUFBVCxDQUFvQkwsTUFBcEI7QUFDbkI7QUFDQTtBQUNJOzs7Ozs7OztBQVFBTSxhQUFLO0FBVFQsS0FGbUIsQ0FBdkI7O0FBY0E7OztBQUdBLFFBQUlFLFdBQVdWLFNBQVNXLElBQVQsQ0FBY1QsTUFBZDtBQUNYO0FBQ0E7QUFDSVUsWUFBSUMsRUFBRSxhQUFGLENBRFI7O0FBR0k7OztBQUdBQyxnQkFBUTtBQUNKLHNCQUFVO0FBRE4sU0FOWjs7QUFVSTs7O0FBR0FDLGdCQUFRLGdCQUFDQyxDQUFELEVBQU87QUFDWEEsY0FBRUMsY0FBRjs7QUFFQTs7O0FBR0EsZ0JBQUlDLFdBQVdMLEVBQUUsUUFBRixFQUFZTSxHQUFaLEVBQWY7QUFDQSxnQkFBSUQsUUFBSixFQUFjO0FBQ1ZMLGtCQUFFLFdBQUYsRUFBZU8sSUFBZixDQUFvQixTQUFTLFFBQVQsR0FBb0JGLFFBQXBCLEdBQStCLEdBQS9CLEdBQXFDLHVDQUFyQyxHQUNoQiw4QkFEZ0IsR0FDaUIsT0FEckM7QUFFSDtBQUNKO0FBeEJMLEtBRlcsQ0FBZjs7QUE2QkE7OztBQUdBLFFBQUlHLFlBQVlYLFNBQVNSLE1BQVQ7QUFDWjtBQUNBO0FBQ0k7OztBQUdBYSxnQkFBUSxnQkFBQ0MsQ0FBRCxFQUFPO0FBQ1hBLGNBQUVDLGNBQUY7O0FBRUE7QUFDQSxnQkFBSUssWUFBWVQsRUFBRSxRQUFGLEVBQVlNLEdBQVosRUFBaEI7QUFDQSxnQkFBSUcsU0FBSixFQUFlO0FBQ1hULGtCQUFFLFdBQUYsRUFBZU8sSUFBZixDQUFvQixTQUFTLGVBQVQsR0FBMkJFLFNBQTNCLEdBQXVDLDJDQUF2QyxHQUNkLE9BRE47QUFFSDtBQUNKO0FBYkwsS0FGWSxDQUFoQjs7QUFrQkE7OztBQUdBLFFBQUlDLGFBQWF2QixTQUFTVyxJQUFULENBQWNULE1BQWQ7QUFDYjtBQUNBO0FBQ0lVLFlBQUlDLEVBQUUsYUFBRixDQURSOztBQUdJOzs7QUFHQUMsZ0JBQVE7QUFDSixzQkFBVTtBQUROLFNBTlo7O0FBVUk7OztBQUdBQyxnQkFBUSxnQkFBQ0MsQ0FBRCxFQUFPO0FBQ1hBLGNBQUVDLGNBQUY7QUFDQTs7O0FBR0EsZ0JBQUlPLFNBQVMsSUFBSWxCLGVBQUosRUFBYjs7QUFFQTtBQUNBLGdCQUFJbUIsY0FBY1osRUFBRSxjQUFGLEVBQWtCTSxHQUFsQixFQUFsQjtBQUNBLGdCQUFJTyxjQUFjYixFQUFFLGNBQUYsRUFBa0JNLEdBQWxCLEVBQWxCO0FBQ0EsZ0JBQUlRLGNBQWNkLEVBQUUsY0FBRixFQUFrQk0sR0FBbEIsRUFBbEI7QUFDQSxnQkFBSVMsY0FBY2YsRUFBRSxjQUFGLEVBQWtCTSxHQUFsQixFQUFsQjtBQUNBLGdCQUFJVSxpQkFBaUJKLGNBQWMsR0FBZCxHQUFvQkMsV0FBcEIsR0FBa0MsR0FBbEMsR0FBd0NDLFdBQXhDLEdBQXNELEdBQXRELEdBQTREQyxXQUFqRjtBQUNBLGdCQUFJRSxTQUFTLFFBQWI7O0FBRUE7OztBQUdBTixtQkFBT08sS0FBUCxDQUFhO0FBQ1RDLHNCQUFNLEVBQUVDLE1BQU0sU0FBUixFQUFtQkMsR0FBR0wsaUJBQWVDLE1BQXJDLEVBQTZDSyxZQUFZLENBQXpEO0FBQ0ZDLHlCQUFLLHlDQURILEVBREc7QUFHVEMseUJBQVMsaUJBQVViLE1BQVYsRUFBa0I7QUFDdkJYLHNCQUFFLFNBQUYsRUFBYXlCLEtBQWI7QUFDQWQsMkJBQU9lLElBQVAsQ0FBWSxVQUFTQyxDQUFULEVBQVk7QUFDcEIsNEJBQUlDLFFBQVFELEVBQUVFLEdBQUYsQ0FBTSxPQUFOLENBQVo7QUFEb0I7QUFBQTtBQUFBOztBQUFBO0FBRXBCLGlEQUFrQkQsS0FBbEIsOEhBQXlCO0FBQUEsb0NBQWpCRSxNQUFpQjs7QUFDckI5QixrQ0FBRSxTQUFGLEVBQWErQixNQUFiLENBQW9CLGlCQUFpQiwrQkFBakIsR0FBbURELE9BQU9FLEVBQVAsQ0FBVSxTQUFWLENBQW5ELEdBQTBFLDRCQUE5RjtBQUNIO0FBSm1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLdkIscUJBTEQ7QUFNSCxpQkFYUTtBQVlUOzs7QUFHQUMsdUJBQU8sU0FBU0EsS0FBVCxHQUFpQjtBQUNwQkMsMEJBQU0scUJBQU47QUFDSDtBQWpCUSxhQUFiO0FBbUJIO0FBbERMLEtBRmEsQ0FBakI7O0FBdURBOzs7QUFHQSxRQUFJQyxjQUFjaEQsU0FBU1csSUFBVCxDQUFjVCxNQUFkO0FBQ2Q7QUFDQTtBQUNJVSxZQUFJQyxFQUFFLGFBQUYsQ0FEUjs7QUFHSTs7O0FBR0FDLGdCQUFRO0FBQ0osc0JBQVU7QUFETixTQU5aOztBQVVJOzs7QUFHQUMsZ0JBQVEsZ0JBQUNDLENBQUQsRUFBTztBQUNYQSxjQUFFQyxjQUFGO0FBQ0E7QUFDQSxnQkFBSWdDLFVBQVUsSUFBSXhDLGdCQUFKLEVBQWQ7O0FBRUE7OztBQUdBLGdCQUFJZ0IsY0FBY1osRUFBRSxjQUFGLEVBQWtCTSxHQUFsQixFQUFsQjtBQUNBLGdCQUFJTyxjQUFjYixFQUFFLGNBQUYsRUFBa0JNLEdBQWxCLEVBQWxCO0FBQ0EsZ0JBQUlRLGNBQWNkLEVBQUUsY0FBRixFQUFrQk0sR0FBbEIsRUFBbEI7QUFDQSxnQkFBSVMsY0FBY2YsRUFBRSxjQUFGLEVBQWtCTSxHQUFsQixFQUFsQjtBQUNBLGdCQUFJVSxpQkFBaUJKLGNBQWMsR0FBZCxHQUFvQkMsV0FBcEIsR0FBa0MsR0FBbEMsR0FBd0NDLFdBQXhDLEdBQXNELEdBQXRELEdBQTREQyxXQUFqRjs7QUFFQTs7O0FBR0FxQixvQkFBUWxCLEtBQVIsQ0FBYztBQUNWbUIsMEJBQVUsT0FEQTtBQUVWQywrQkFBZSxlQUZMO0FBR1ZuQixzQkFBTSxFQUFFb0IsR0FBR3ZCLGNBQUwsRUFBcUJ3QixNQUFNLENBQTNCLEVBSEk7QUFJVmhCLHlCQUFTLGlCQUFVWSxPQUFWLEVBQW1CO0FBQ3hCcEMsc0JBQUUsVUFBRixFQUFjeUIsS0FBZDtBQUNBVyw0QkFBUVYsSUFBUixDQUFhLFVBQVNDLENBQVQsRUFBWTtBQUNyQiw0QkFBSWMsVUFBVWQsRUFBRUUsR0FBRixDQUFNLFNBQU4sQ0FBZDtBQURxQjtBQUFBO0FBQUE7O0FBQUE7QUFFckIsa0RBQWtCWSxPQUFsQixtSUFBMkI7QUFBQSxvQ0FBbkJYLE1BQW1COztBQUN2QjlCLGtDQUFFLFVBQUYsRUFBYytCLE1BQWQsQ0FBcUIsNkJBQ2pCLGlDQURpQixHQUVqQixNQUZpQixHQUVSRCxPQUFPdkMsS0FGQyxHQUVPLE9BRlAsR0FHakIsY0FIaUIsR0FHQXVDLE9BQU9ZLElBSFAsR0FHYywwQkFIZCxHQUlqQix1Q0FKaUIsR0FLakIsTUFMaUIsR0FLUlosT0FBT2EsV0FMQyxHQUthLE9BTGIsR0FNakIsZUFOaUIsR0FNQ2IsT0FBT2MsU0FOUixHQU1vQixRQU5wQixHQU9qQixhQVBKO0FBUUg7QUFYb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVl4QixxQkFaRDtBQWFILGlCQW5CUzs7QUFxQlY7OztBQUdBWCx1QkFBTyxTQUFTQSxLQUFULEdBQWlCO0FBQ3BCQywwQkFBTSxzQkFBTjtBQUNIO0FBMUJTLGFBQWQ7QUE0Qkg7QUExREwsS0FGYyxDQUFsQjs7QUErREE7OztBQUdBLFFBQUlXLE9BQU8sSUFBSTNELFNBQUosQ0FBYyxFQUFkLENBQVg7O0FBRUE7OztBQUdBLFFBQUlXLFFBQUosQ0FBYSxFQUFDaUQsT0FBT0QsSUFBUixFQUFiOztBQUVBOzs7QUFHQSxRQUFJRSxRQUFRLElBQUl2RCxVQUFKLENBQWUsRUFBZixDQUFaOztBQUVBOzs7QUFHQSxRQUFJZ0IsU0FBSixDQUFjLEVBQUNzQyxPQUFPQyxLQUFSLEVBQWQ7O0FBRUE7OztBQUdBLFFBQUlyQyxVQUFKOztBQUVBOzs7QUFHQSxRQUFJeUIsV0FBSjtBQUVILENBdlJEIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGxldCB1c2VyTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoXHJcbiAgICAgICAgLyoqIEBsZW5kcyB1c2VyTW9kZWwucHJvdG90eXBlICovXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQGNsYXNzIE1vZGVsIGZvciB1c2Vyc1xyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAYXVnbWVudHMgQmFja2JvbmUuTW9kZWxcclxuICAgICAgICAgICAgICogQGNvbnN0cnVjdHNcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogJ2RlZmF1bHQnIHJldHVybiBlYWNoIHRpbWUgYSBpbnN0YW5jZSBvZiB0aGUgVXNlciBtb2RlbCBpcyBjcmVhdGVkXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlVzZXIgbmFtZVwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IG90aGVyTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoXHJcbiAgICAgICAgLyoqIEBsZW5kcyBvdGhlck1vZGVsLnByb3RvdHlwZSAqL1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBjbGFzcyBNb2RlbCB3aGVuIGFub3RoZXIgb25lIHdpbGwgY29vayBmb3IgeW91XHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBhdWdtZW50cyBCYWNrYm9uZS5Nb2RlbFxyXG4gICAgICAgICAgICAgKiBAY29uc3RydWN0c1xyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiAnZGVmYXVsdCcgcmV0dXJuIGVhY2ggdGltZSBhIGluc3RhbmNlIG9mIHRoZSBVc2VyIG1vZGVsIGlzIGNyZWF0ZWRcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTmFtZSBvZiBvdGhlciBjb29raW5nIHBlcnNvblwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgQ3JlYXRlIGNvbGxlY3Rpb24gbW9kZWwgdG8gcmVjZWl2ZSBhbGwgdmlkZW9zXHJcbiAgICAgKi9cclxuICAgIGxldCB2aWRlb0NvbGxlY3Rpb24gPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZChcclxuICAgICAgICAvKiogQGxlbmRzIFZpZGVvQ29sbGVjdGlvbi5wcm90b3R5cGUgKi9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAY2xhc3MgQ29sbGVjdGlvbiBvZiB2aWRlb3NcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQGF1Z21lbnRzIEJhY2tib25lLk1vZGVsXHJcbiAgICAgICAgICAgICAqIEBjb25zdHJ1Y3RzXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIE1haW4gdXJsIHdpdGhvdXQgcGFyYW1zXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBDcmVhdGUgY29sbGVjdGlvbiBtb2RlbCB0byByZWNlaXZlIGFsbCByZWNpcGVzXHJcbiAgICAgKi9cclxuICAgIGxldCByZWNpcGVDb2xsZWN0aW9uID0gQmFja2JvbmUuQ29sbGVjdGlvbi5leHRlbmQoXHJcbiAgICAgICAgLyoqIEBsZW5kcyBSZWNpcGVDb2xsZWN0aW9uLnByb3RvdHlwZSAqL1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBjbGFzcyBDb2xsZWN0aW9uIG9mIHJlY2lwZXNcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQGF1Z21lbnRzIEJhY2tib25lLk1vZGVsXHJcbiAgICAgICAgICAgICAqIEBjb25zdHJ1Y3RzXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIE1haW4gdXJsIHdpdGhvdXQgcGFyYW1zXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vd3d3LnJlY2lwZXB1cHB5LmNvbS9hcGkvJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIENyZWF0ZSB2aWV3IGNsYXNzXHJcbiAgICAgKi9cclxuICAgIGxldCB1c2VyVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKFxyXG4gICAgICAgIC8qKiBAbGVuZHMgVXNlclZpZXcucHJvdG90eXBlICovXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbDogJCgnI3NlYXJjaEZvcm0nKSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHt7fX0gLSBXaGVuIGNsaWNrIHN1Ym1pdCByZW5kZXIgd2lsbCB3b3JrXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgICAgIFwic3VibWl0XCI6IFwicmVuZGVyXCJcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHt7fX0gLSBSZW5kZXIgdGV4dCBtZXNzYWdlIHRvIHVzZXJcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlbmRlcjogKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqICBHZXQgbmFtZSB1c2VyXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGxldCBuYW1lVXNlciA9ICQoJyNuYW1lMScpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWVVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2Nvb2tOYW1lJykuaHRtbCgnPGgyPicgKyAnR3JlYXQgJyArIG5hbWVVc2VyICsgJyEnICsgJyBTbyB5b3Ugd2FudCB0byBjb29rIGZvciB5b3Vyc2VsZiA6KSAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1Rha2UgYSBsb29rIGF0IHRoZXNlIHJlY2lwZXMnICsgJzwvaDI+Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBJbmhlcml0YW5jZSBvZiBVc2Vydmlld1xyXG4gICAgICovXHJcbiAgICBsZXQgb3RoZXJWaWV3ID0gdXNlclZpZXcuZXh0ZW5kKFxyXG4gICAgICAgIC8qKiBAbGVuZHMgb3RoZXJWaWV3LnByb3RvdHlwZSAqL1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBtZW1iZXIge3t9fSAtIFJlbmRlciB0ZXh0IG1lc3NhZ2UgdGhlICdjaGVmJyBvZiB0aGUgdXNlclxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVuZGVyOiAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdldCBuYW1lIHVzZXJcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lT3RoZXIgPSAkKCcjbmFtZTInKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lT3RoZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY29va05hbWUnKS5odG1sKCc8aDI+JyArICdTaG93IHRoaXMgdG8gJyArIG5hbWVPdGhlciArICcgYW5kIG1heWJlIGhlL3NoZSB3YW50IHRvIGNvb2sgZm9yIHlvdSA6KSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnPC9oMj4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIENyZWF0ZSB2aWRlb3NWaWV3XHJcbiAgICAgKi9cclxuICAgIGxldCB2aWRlb3NWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoXHJcbiAgICAgICAgLyoqIEBsZW5kcyBWaWRlb3NWaWV3LnByb3RvdHlwZSAqL1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWw6ICQoJyNzZWFyY2hGb3JtJyksXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQG1lbWJlciB7e319IC0gV2hlbiBjbGljayBzdWJtaXQgcmVuZGVyIHdpbGwgd29ya1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZXZlbnRzOiB7XHJcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcInJlbmRlclwiXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQG1lbWJlciB7e319IC0gUmVuZGVyIGFsbCB2aWRlb3NcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlbmRlcjogKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogIEluc3RhbmNlIG9mIGNvbGxlY3Rpb24gbW9kZWwgdmlkZW9Db2xsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGxldCB2aWRlb3MgPSBuZXcgdmlkZW9Db2xsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3RvcmUgaW5ncmVkaWVudHMgaW4gdmFyaWFibGVcclxuICAgICAgICAgICAgICAgIGxldCBpbmdyZWRpZW50MSA9ICQoJyNpbmdyZWRpZW50MScpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZ3JlZGllbnQyID0gJCgnI2luZ3JlZGllbnQyJykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5ncmVkaWVudDMgPSAkKCcjaW5ncmVkaWVudDMnKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmdyZWRpZW50NCA9ICQoJyNpbmdyZWRpZW50NCcpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFsbEluZ3JlZGllbnRzID0gaW5ncmVkaWVudDEgKyAnLCcgKyBpbmdyZWRpZW50MiArICcsJyArIGluZ3JlZGllbnQzICsgJywnICsgaW5ncmVkaWVudDQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjaXBlID0gJ3JlY2lwZSc7XHJcblxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiAgRmV0Y2ggYWxsIHZpZGVvc1xyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2aWRlb3MuZmV0Y2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgcGFydDogJ3NuaXBwZXQnLCBxOiBhbGxJbmdyZWRpZW50cytyZWNpcGUsIG1heFJlc3VsdHM6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ0FJemFTeURuczZIaXVqYlFiYmVRc2NZTk1QYW9pZTk1eU82b01xUSd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICh2aWRlb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3ZpZGVvcycpLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvcy5lYWNoKGZ1bmN0aW9uKHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IHguZ2V0KCdpdGVtcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCB2YWx1ZXMgb2YgaXRlbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjdmlkZW9zJykuYXBwZW5kKCc8aWZyYW1lIHNyYz0nICsgJ2h0dHA6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJyArIHZhbHVlcy5pZFsndmlkZW9JZCddICsgJyArIGNsYXNzPVwidmlkZW9cIj48L2lmcmFtZT4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqICBFcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnQ2Fubm90IGZpbmQgdmlkZW9zIScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgQ3JlYXRlIHJlY2lwZXNWaWV3XHJcbiAgICAgKi9cclxuICAgIGxldCByZWNpcGVzVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKFxyXG4gICAgICAgIC8qKiBAbGVuZHMgUmVjaXBlc1ZpZXcucHJvdG90eXBlICovXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbDogJCgnI3NlYXJjaEZvcm0nKSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHt7fX0gLSBXaGVuIGNsaWNrIHN1Ym1pdCByZW5kZXIgd2lsbCB3b3JrXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgICAgIFwic3VibWl0XCI6IFwicmVuZGVyXCJcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHt7fX0gLSBSZW5kZXIgYWxsIHJlY2lwZXNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlbmRlcjogKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIC8vIEluc3RhbmNlIG9mIGNvbGxlY3Rpb24gbW9kZWwgcmVjaXBlQ29sbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlY2lwZXMgPSBuZXcgcmVjaXBlQ29sbGVjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogU3RvcmUgYWxsIGluZ3JlZGllbnQgaW4gdmFyaWFibGVcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZ3JlZGllbnQxID0gJCgnI2luZ3JlZGllbnQxJykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5ncmVkaWVudDIgPSAkKCcjaW5ncmVkaWVudDInKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmdyZWRpZW50MyA9ICQoJyNpbmdyZWRpZW50MycpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZ3JlZGllbnQ0ID0gJCgnI2luZ3JlZGllbnQ0JykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWxsSW5ncmVkaWVudHMgPSBpbmdyZWRpZW50MSArICcsJyArIGluZ3JlZGllbnQyICsgJywnICsgaW5ncmVkaWVudDMgKyAnLCcgKyBpbmdyZWRpZW50NDtcclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIEZldGNoIGFsbCByZWNpcGVzXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHJlY2lwZXMuZmV0Y2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxyXG4gICAgICAgICAgICAgICAgICAgIGpzb25wQ2FsbGJhY2s6ICdqc29ucENhbGxiYWNrJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IGk6IGFsbEluZ3JlZGllbnRzLCBwYWdlOiAxfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVjaXBlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjcmVjaXBlcycpLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwZXMuZWFjaChmdW5jdGlvbih4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IHguZ2V0KCdyZXN1bHRzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdmFsdWVzIG9mIHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjcmVjaXBlcycpLmFwcGVuZChcIjxkaXYgY2xhc3M9J3JlY2lwZSc+PHVsPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYm9sZCc+VGl0bGU8L3NwYW4+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxsaT5cIiArIHZhbHVlcy50aXRsZSArIFwiPC9saT5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGxpPjxhIGhyZWY9XCIgKyB2YWx1ZXMuaHJlZiArIFwiPkxpbmsgdG8gcmVjaXBlPC9hPjwvbGk+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdib2xkJz5JbmdyZWRpZW50czwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGxpPlwiICsgdmFsdWVzLmluZ3JlZGllbnRzICsgXCI8L2xpPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8bGk+PGltZyBzcmM9XCIgKyB2YWx1ZXMudGh1bWJuYWlsICsgXCI+PC9saT5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPC91bD48L2Rpdj5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICogRXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0Nhbm5vdCBmaW5kIHJlY2lwZXMhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlIGluc3RhbmNlIG9mIFVzZXIgbW9kZWwgaW4gdXNlciB2YXJpYWJsZVxyXG4gICAgICovXHJcbiAgICBsZXQgdXNlciA9IG5ldyB1c2VyTW9kZWwoe30pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEluc3RhbmNlIG9mIFVzZXJ2aWV3XHJcbiAgICAgKi9cclxuICAgIG5ldyB1c2VyVmlldyh7bW9kZWw6IHVzZXJ9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBJbnN0YW5jZSBvZiBPdGhlcm1vZGVsXHJcbiAgICAgKi9cclxuICAgIGxldCBvdGhlciA9IG5ldyBvdGhlck1vZGVsKHt9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBJbnN0YW5jZSBvZiBvdGhlclZpZXdcclxuICAgICAqL1xyXG4gICAgbmV3IG90aGVyVmlldyh7bW9kZWw6IG90aGVyfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgSW5zdGFuY2Ugb2YgVmlkZW9zVmlld1xyXG4gICAgICovXHJcbiAgICBuZXcgdmlkZW9zVmlldygpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEluc3RhbmNlIG9mIFJlY2lwZXNWaWV3XHJcbiAgICAgKi9cclxuICAgIG5ldyByZWNpcGVzVmlldygpO1xyXG5cclxufSkoKTtcclxuIl19
