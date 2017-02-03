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

    var VideoCollection = Backbone.Collection.extend(
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
    var RecipeCollection = Backbone.Collection.extend(
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
    var UserView = Backbone.View.extend(
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
    var otherView = UserView.extend(
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
    var VideosView = Backbone.View.extend(
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
            var videos = new VideoCollection();

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
                    videos.each(function (x) {
                        var items = x.get('items');
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var values = _step.value;

                                $('#videos').html('<iframe src=' + 'http://www.youtube.com/embed/' + values.id['videoId'] + ' + class="video"></iframe>');
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
    var RecipesView = Backbone.View.extend(
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
            var recipes = new RecipeCollection();

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
                    recipes.each(function (x) {
                        var results = x.get('results');
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = results[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var values = _step2.value;

                                //console.log(values.title);
                                $('#recipes').html("<div class='recipe'><ul>" + "<span class='bold'>Titel</span>" + "<li>" + values.title + "</li>" + "<li><a href=" + values.href + ">Link to recipe</a></li>" + "<span class='bold'>Ingredients</span>" + "<li>" + values.ingredients + "</li>" + "<li><img src=" + values.thumbnail + "></li>" + "</ul></div>");
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
    new UserView({ model: user });

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
    new VideosView();

    /**
     *  Instance of RecipesView
     */
    new RecipesView();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInVzZXJNb2RlbCIsIkJhY2tib25lIiwiTW9kZWwiLCJleHRlbmQiLCJkZWZhdWx0IiwidGl0bGUiLCJvdGhlck1vZGVsIiwiVmlkZW9Db2xsZWN0aW9uIiwiQ29sbGVjdGlvbiIsInVybCIsIlJlY2lwZUNvbGxlY3Rpb24iLCJVc2VyVmlldyIsIlZpZXciLCJlbCIsIiQiLCJldmVudHMiLCJyZW5kZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJuYW1lVXNlciIsInZhbCIsImh0bWwiLCJvdGhlclZpZXciLCJuYW1lT3RoZXIiLCJWaWRlb3NWaWV3IiwidmlkZW9zIiwiaW5ncmVkaWVudDEiLCJpbmdyZWRpZW50MiIsImluZ3JlZGllbnQzIiwiaW5ncmVkaWVudDQiLCJhbGxJbmdyZWRpZW50cyIsInJlY2lwZSIsImZldGNoIiwiZGF0YSIsInBhcnQiLCJxIiwibWF4UmVzdWx0cyIsImtleSIsInN1Y2Nlc3MiLCJlYWNoIiwieCIsIml0ZW1zIiwiZ2V0IiwidmFsdWVzIiwiaWQiLCJlcnJvciIsImFsZXJ0IiwiUmVjaXBlc1ZpZXciLCJyZWNpcGVzIiwiZGF0YVR5cGUiLCJqc29ucENhbGxiYWNrIiwiaSIsInBhZ2UiLCJyZXN1bHRzIiwiaHJlZiIsImluZ3JlZGllbnRzIiwidGh1bWJuYWlsIiwidXNlciIsIm1vZGVsIiwib3RoZXIiXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBQyxZQUFZOztBQUVULFFBQUlBLFlBQVlDLFNBQVNDLEtBQVQsQ0FBZUMsTUFBZjtBQUNaO0FBQ0E7QUFDSTs7Ozs7Ozs7QUFRQUMsaUJBQVMsb0JBQU07QUFDWCxtQkFBTztBQUNIQyx1QkFBTztBQURKLGFBQVA7QUFHSDtBQWJMLEtBRlksQ0FBaEI7O0FBa0JBLFFBQUlDLGFBQWFMLFNBQVNDLEtBQVQsQ0FBZUMsTUFBZjtBQUNiO0FBQ0E7QUFDSTs7Ozs7Ozs7QUFRQUMsaUJBQVMsb0JBQU07QUFDWCxtQkFBTztBQUNIQyx1QkFB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clxuICAgIGxldCB1c2VyTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoXHJcbiAgICAgICAgLyoqIEBsZW5kcyB1c2VyTW9kZWwucHJvdG90eXBlICovXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQGNsYXNzIE1vZGVsIGZvciB1c2Vyc1xyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAYXVnbWVudHMgQmFja2JvbmUuTW9kZWxcclxuICAgICAgICAgICAgICogQGNvbnN0cnVjdHNcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogJ2RlZmF1bHQnIHJldHVybiBlYWNoIHRpbWUgYSBpbnN0YW5jZSBvZiB0aGUgVXNlciBtb2RlbCBpcyBjcmVhdGVkXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlVzZXIgbmFtZVwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IG90aGVyTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoXHJcbiAgICAgICAgLyoqIEBsZW5kcyBvdGhlck1vZGVsLnByb3RvdHlwZSAqL1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBjbGFzcyBNb2RlbCB3aGVuIGFub3RoZXIgb25lIHdpbGwgY29vayBmb3IgeW91XHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBhdWdtZW50cyBCYWNrYm9uZS5Nb2RlbFxyXG4gICAgICAgICAgICAgKiBAY29uc3RydWN0c1xyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiAnZGVmYXVsdCcgcmV0dXJuIGVhY2ggdGltZSBhIGluc3RhbmNlIG9mIHRoZSBVc2VyIG1vZGVsIGlzIGNyZWF0ZWRcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTmFtZSBvZiBvdGhlciBjb29raW5nIHBlcnNvblwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IFZpZGVvQ29sbGVjdGlvbiA9IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKFxyXG4gICAgICAgIC8qKiBAbGVuZHMgVmlkZW9Db2xsZWN0aW9uLnByb3RvdHlwZSAqL1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBjbGFzcyBDb2xsZWN0aW9uIG9mIHZpZGVvc1xyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAYXVnbWVudHMgQmFja2JvbmUuTW9kZWxcclxuICAgICAgICAgICAgICogQGNvbnN0cnVjdHNcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogTWFpbiB1cmwgd2l0aG91dCBwYXJhbXNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvc2VhcmNoJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIENyZWF0ZSBjb2xsZWN0aW9uIG1vZGVsIHRvIHJlY2VpdmUgYWxsIHJlY2lwZXNcclxuICAgICAqL1xyXG4gICAgbGV0IFJlY2lwZUNvbGxlY3Rpb24gPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZChcclxuICAgICAgICAvKiogQGxlbmRzIFJlY2lwZUNvbGxlY3Rpb24ucHJvdG90eXBlICovXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQGNsYXNzIENvbGxlY3Rpb24gb2YgcmVjaXBlc1xyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAYXVnbWVudHMgQmFja2JvbmUuTW9kZWxcclxuICAgICAgICAgICAgICogQGNvbnN0cnVjdHNcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogTWFpbiB1cmwgd2l0aG91dCBwYXJhbXNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly93d3cucmVjaXBlcHVwcHkuY29tL2FwaS8nXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgQ3JlYXRlIHZpZXcgY2xhc3NcclxuICAgICAqL1xyXG4gICAgbGV0IFVzZXJWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoXHJcbiAgICAgICAgLyoqIEBsZW5kcyBVc2VyVmlldy5wcm90b3R5cGUgKi9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsOiAkKCcjc2VhcmNoRm9ybScpLFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBtZW1iZXIge3t9fSAtIFdoZW4gY2xpY2sgc3VibWl0IHJlbmRlciB3aWxsIHdvcmtcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICAgICAgXCJzdWJtaXRcIjogXCJyZW5kZXJcIlxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBtZW1iZXIge3t9fSAtIFJlbmRlciB0ZXh0IG1lc3NhZ2UgdG8gdXNlclxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVuZGVyOiAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogIEdldCBuYW1lIHVzZXJcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVVc2VyID0gJCgnI25hbWUxJykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZVVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY29va05hbWUnKS5odG1sKCc8aDI+JyArICdHcmVhdCAnICsgbmFtZVVzZXIgKyAnIScgKyAnIFNvIHlvdSB3YW50IHRvIGNvb2sgZm9yIHlvdXJzZWxmIDopICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnVGFrZSBhIGxvb2sgYXQgdGhlc2UgcmVjaXBlcycgKyAnPC9oMj4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEluaGVyaXRhbmNlIG9mIFVzZXJ2aWV3XHJcbiAgICAgKi9cclxuICAgIGxldCBvdGhlclZpZXcgPSBVc2VyVmlldy5leHRlbmQoXHJcbiAgICAgICAgLyoqIEBsZW5kcyBvdGhlclZpZXcucHJvdG90eXBlICovXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQG1lbWJlciB7e319IC0gUmVuZGVyIHRleHQgbWVzc2FnZSB0aGUgJ2NoZWYnIG9mIHRoZSB1c2VyXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICByZW5kZXI6IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IG5hbWUgdXNlclxyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVPdGhlciA9ICQoJyNuYW1lMicpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWVPdGhlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNjb29rTmFtZScpLmh0bWwoJzxoMj4nICsgJ1Nob3cgdGhpcyB0byAnICsgbmFtZU90aGVyICsgJyBhbmQgbWF5YmUgaGUvc2hlIHdhbnQgdG8gY29vayBmb3IgeW91IDopJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArICc8L2gyPicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgQ3JlYXRlIHZpZGVvc1ZpZXdcclxuICAgICAqL1xyXG4gICAgbGV0IFZpZGVvc1ZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZChcclxuICAgICAgICAvKiogQGxlbmRzIFZpZGVvc1ZpZXcucHJvdG90eXBlICovXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbDogJCgnI3NlYXJjaEZvcm0nKSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHt7fX0gLSBXaGVuIGNsaWNrIHN1Ym1pdCByZW5kZXIgd2lsbCB3b3JrXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgICAgIFwic3VibWl0XCI6IFwicmVuZGVyXCJcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHt7fX0gLSBSZW5kZXIgYWxsIHZpZGVvc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVuZGVyOiAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiAgSW5zdGFuY2Ugb2YgY29sbGVjdGlvbiBtb2RlbCB2aWRlb0NvbGxlY3Rpb25cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgbGV0IHZpZGVvcyA9IG5ldyBWaWRlb0NvbGxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdG9yZSBpbmdyZWRpZW50cyBpbiB2YXJpYWJsZVxyXG4gICAgICAgICAgICAgICAgbGV0IGluZ3JlZGllbnQxID0gJCgnI2luZ3JlZGllbnQxJykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5ncmVkaWVudDIgPSAkKCcjaW5ncmVkaWVudDInKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmdyZWRpZW50MyA9ICQoJyNpbmdyZWRpZW50MycpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZ3JlZGllbnQ0ID0gJCgnI2luZ3JlZGllbnQ0JykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWxsSW5ncmVkaWVudHMgPSBpbmdyZWRpZW50MSArICcsJyArIGluZ3JlZGllbnQyICsgJywnICsgaW5ncmVkaWVudDMgKyAnLCcgKyBpbmdyZWRpZW50NDtcclxuICAgICAgICAgICAgICAgIGxldCByZWNpcGUgPSAncmVjaXBlJztcclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqICBGZXRjaCBhbGwgdmlkZW9zXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHZpZGVvcy5mZXRjaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBwYXJ0OiAnc25pcHBldCcsIHE6IGFsbEluZ3JlZGllbnRzK3JlY2lwZSwgbWF4UmVzdWx0czogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnQUl6YVN5RG5zNkhpdWpiUWJiZVFzY1lOTVBhb2llOTV5TzZvTXFRJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHZpZGVvcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb3MuZWFjaChmdW5jdGlvbih4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSB4LmdldCgnaXRlbXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdmFsdWVzIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3ZpZGVvcycpLmh0bWwoJzxpZnJhbWUgc3JjPScgKyAnaHR0cDovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgdmFsdWVzLmlkWyd2aWRlb0lkJ10gKyAnICsgY2xhc3M9XCJ2aWRlb1wiPjwvaWZyYW1lPicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICogIEVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdDYW5ub3QgZmluZCB2aWRlb3MhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBDcmVhdGUgcmVjaXBlc1ZpZXdcclxuICAgICAqL1xyXG4gICAgbGV0IFJlY2lwZXNWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoXHJcbiAgICAgICAgLyoqIEBsZW5kcyBSZWNpcGVzVmlldy5wcm90b3R5cGUgKi9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsOiAkKCcjc2VhcmNoRm9ybScpLFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBtZW1iZXIge3t9fSAtIFdoZW4gY2xpY2sgc3VibWl0IHJlbmRlciB3aWxsIHdvcmtcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICAgICAgXCJzdWJtaXRcIjogXCJyZW5kZXJcIlxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBtZW1iZXIge3t9fSAtIFJlbmRlciBhbGwgcmVjaXBlc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVuZGVyOiAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gSW5zdGFuY2Ugb2YgY29sbGVjdGlvbiBtb2RlbCByZWNpcGVDb2xsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjaXBlcyA9IG5ldyBSZWNpcGVDb2xsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBTdG9yZSBhbGwgaW5ncmVkaWVudCBpbiB2YXJpYWJsZVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5ncmVkaWVudDEgPSAkKCcjaW5ncmVkaWVudDEnKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmdyZWRpZW50MiA9ICQoJyNpbmdyZWRpZW50MicpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZ3JlZGllbnQzID0gJCgnI2luZ3JlZGllbnQzJykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5ncmVkaWVudDQgPSAkKCcjaW5ncmVkaWVudDQnKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCBhbGxJbmdyZWRpZW50cyA9IGluZ3JlZGllbnQxICsgJywnICsgaW5ncmVkaWVudDIgKyAnLCcgKyBpbmdyZWRpZW50MyArICcsJyArIGluZ3JlZGllbnQ0O1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogRmV0Y2ggYWxsIHJlY2lwZXNcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgcmVjaXBlcy5mZXRjaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXHJcbiAgICAgICAgICAgICAgICAgICAganNvbnBDYWxsYmFjazogJ2pzb25wQ2FsbGJhY2snLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgaTogYWxsSW5ncmVkaWVudHMsIHBhZ2U6IDF9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZWNpcGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwZXMuZWFjaChmdW5jdGlvbih4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IHguZ2V0KCdyZXN1bHRzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdmFsdWVzIG9mIHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHZhbHVlcy50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3JlY2lwZXMnKS5odG1sKFwiPGRpdiBjbGFzcz0ncmVjaXBlJz48dWw+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdib2xkJz5UaXRlbDwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGxpPlwiICsgdmFsdWVzLnRpdGxlICsgXCI8L2xpPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8bGk+PGEgaHJlZj1cIiArIHZhbHVlcy5ocmVmICsgXCI+TGluayB0byByZWNpcGU8L2E+PC9saT5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JvbGQnPkluZ3JlZGllbnRzPC9zcGFuPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8bGk+XCIgKyB2YWx1ZXMuaW5ncmVkaWVudHMgKyBcIjwvbGk+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxsaT48aW1nIHNyYz1cIiArIHZhbHVlcy50aHVtYm5haWwgKyBcIj48L2xpPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8L3VsPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgKiBFcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnQ2Fubm90IGZpbmQgcmVjaXBlcyEnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmUgaW5zdGFuY2Ugb2YgVXNlciBtb2RlbCBpbiB1c2VyIHZhcmlhYmxlXHJcbiAgICAgKi9cclxuICAgIGxldCB1c2VyID0gbmV3IHVzZXJNb2RlbCh7fSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgSW5zdGFuY2Ugb2YgVXNlcnZpZXdcclxuICAgICAqL1xyXG4gICAgbmV3IFVzZXJWaWV3KHttb2RlbDogdXNlcn0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEluc3RhbmNlIG9mIE90aGVybW9kZWxcclxuICAgICAqL1xyXG4gICAgbGV0IG90aGVyID0gbmV3IG90aGVyTW9kZWwoe30pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEluc3RhbmNlIG9mIG90aGVyVmlld1xyXG4gICAgICovXHJcbiAgICBuZXcgb3RoZXJWaWV3KHttb2RlbDogb3RoZXJ9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBJbnN0YW5jZSBvZiBWaWRlb3NWaWV3XHJcbiAgICAgKi9cclxuICAgIG5ldyBWaWRlb3NWaWV3KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgSW5zdGFuY2Ugb2YgUmVjaXBlc1ZpZXdcclxuICAgICAqL1xyXG4gICAgbmV3IFJlY2lwZXNWaWV3KCk7XHJcblxyXG59KSgpO1xyXG4iXX0=
