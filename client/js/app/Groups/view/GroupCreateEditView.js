'use strict';

(function (This) {
    var formData;

    This.CreateEditView = Backbone.View.extend({
        tagName: 'section',

        className: 'backdrop',

        template: templates.groupEditCreate,

        events: {
            'click #save': 'save',
            'click #cancel': 'close',
            'change [name="startDate"]': 'setFinishDate',
            'change [name="direction"]': 'setFinishDate',
            'click .budget-option': 'setBudgetOwner',
            'click .calendar': 'showCalendar'
        },

        initialize: function (model) {
            this.model = model || new This.Group();

            Backbone.Validation.bind(this);
        },

        render: function () {
            var model;

            this.teachers = this.model.get('teachers').slice();
            this.experts = this.model.get('experts').slice();

            this.teacherView = new This.TeacherView(this.teachers);
            this.expertView = new This.ExpertView(this.experts);

            model = _.extend({
                directions: i.directions,
                //the same as "locations: i.locations"
                locations: store.locations.getNames(),
                stages: i.stages,
                isCreate: this.model.isNew(),
                defaultLocation: app.user.get('location')
            }, this.model.toJSON());

            this.$el.html(this.template(model));
            this.$el.find('#teachers').html(this.teacherView.render().$el);
            this.$el.find('#experts').html(this.expertView.render().$el);

            this.$el.find('[type=date]').datepicker({
                dateFormat: 'yy-mm-dd'
            });

            $(document).on('keydown', keyEvent.bind(this));
            function keyEvent (event) {

                if (event.which === System.constants.ENTER) {
                    this.save();
                } else if (event.which === System.constants.ESC) {
                    this.close();
                }
            }

            return this;
        },

        setFinishDate: function () {
            var startDate = this.$el.find('[name=startDate]').val();

            if (startDate) {
                var courseDurationWeeks,
                    courseDurationDays,
                    finishDate;

                if (['MQC', 'ISTQB'].indexOf(this.$el.find('[name=direction]').val()) !== -1) {
                    courseDurationWeeks = 9;
                } else {
                    courseDurationWeeks = 12;
                }

                finishDate = new Date(startDate);
                courseDurationDays = courseDurationWeeks * 7;
                finishDate.setDate(finishDate.getDate() + courseDurationDays);
                this.$el.find('[name=finishDate]').val(finishDate.toISOString().split('T')[0]);
            }
        },

        setBudgetOwner: function (event) {
            this.$el.find('.budget-option').removeClass('active');
            $(event.target).addClass('active');
        },

        save: function () {
            var errors = {};

            this.getFormData();

            errors = this.model.preValidate(formData);

            if (!_.isEmpty(errors)) {
                this.createHint(errors);
            } else {
                this.model.save(formData);
                app.mediator.publish('Groups: saved', this.model);
                store.groups.add(this.model);
                this.createFlashMessage();
                this.destroy();
            }
        },

        close: function () {
            this.destroy();
            app.mediator.publish('Groups: dialog-closed');
        },

        destroy: function () {
            $(document).off('keydown');
            this.teacherView.remove();
            this.expertView.remove();
            this.remove();
        },

        getFormData: function () {
            formData = {teachers: this.teachers, experts: this.experts};

            this.$el.find('#name, #startDate, #finishDate').each(function (index, field) {
                formData[field.name] = field.value;
            });
            this.$el.find('#location option:selected, #direction option:selected, #stage option:selected').each(function (index, field) {
                formData[$(field).data('name')] = field.value;
            });
            this.$el.find('.budget-option').each(function (index, button) {
                if ($(button).hasClass('active')) {
                    formData['budgetOwner'] = $(button).data('value');
                }
            });
        },

        createHint: function (errors) {
            var hints = [];

            _.each(errors, function (value, key) {
                hints.push({
                    name: key,
                    text: value
                });
            });

            app.mediator.publish('Message', {
                type: 'hints',
                $el: this.$el,
                hints: hints
            })
        },

        createFlashMessage: function () {
            var infoMessage,
                warning;

            if (this.model.isNew()) {
                infoMessage = 'Group ' + this.model.get('name') + ' was created';
            } else {
                infoMessage = 'Group ' + this.model.get('name') + ' was edited';
            }

            warning = this.createWarningMessage();

            if (warning) {
                app.mediator.publish('Message', {
                    type: 'flash-warning',
                    text: infoMessage + ', but ' + warning + ' are not specified'
                });
            } else {
                app.mediator.publish('Message', {
                    type: 'flash-info',
                    text: infoMessage
                });
            }
        },

        createWarningMessage: function () {
            var warningMessage;

            if (!formData.teachers.length && !formData.experts.length) {
                warningMessage = 'teachers and experts';
            } else if (!formData.teachers.length) {
                warningMessage = 'teachers';
            } else if (!formData.experts.length) {
                warningMessage = 'experts';
            }

            if (warningMessage !== '') {
                return warningMessage;
            }
        },

        showCalendar: function (event) {
            $(event.target).siblings('[type=date]').focus();
        }
    });
})(CS.Groups);