'use strict';


(function (This, app) {
    This.StudentListView = Backbone.View.extend({
        tagName: 'table',

        className: 'students_list',

        template: templates.studentListViewTpl,

        events: {
            'click [name="studName"]': 'showStudent',
            'click th': 'tableSort'
        },

        initialize: function () {

        },

       tableSort: function (e) {
            var $grid = document.querySelector('.students_list');

            sortGrid(e.target.cellIndex, e.target, e.target.id);

            function sortGrid (colNum, element, idName) {
                var tbody = $('tbody')[0],
                    rowsArray = [].slice.call(tbody.rows), //make an Array
                    compare; //comparing function

                if (colNum === 0) {
                    if (idName==='sortUp') {
                        element.setAttribute( 'id','sortDown');
                        
                        compare = function (rowA, rowB) {   
                        return rowB.cells[colNum].innerHTML > rowA.cells[colNum].innerHTML ? 1 : -1;
                        }
    
                    } else if (idName==='sortDown') {
                        element.setAttribute('id','sortUp');
                        
                        compare = function (rowA, rowB) {   
                        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
                        }
                    
                    } else {
                        element.setAttribute('id','sortUp');
                            
                        compare = function (rowA, rowB) {   
                        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
                        }
                    }
                }
    
                if (colNum === 2) {
                    addClassRange(rowsArray);

                    if (idName==='sortUp') {
                        element.setAttribute( 'id','sortDown');
                        
                        compare = function (rowA, rowB) {   
                        return rowA.cells[colNum].className > rowB.cells[colNum].className ? 1 : -1;
                        }
    
                    } else if (idName==='sortDown') {
                        element.setAttribute('id','sortUp');
                        
                        compare = function (rowA, rowB) {   
                        return rowB.cells[colNum].className > rowA.cells[colNum].className ? 1 : -1;
                        }
                    
                    } else {
                        element.setAttribute('id','sortUp');
        
                        compare = function (rowA, rowB) {   
                        return rowB.cells[colNum].className > rowA.cells[colNum].className ? 1 : -1;
                        }
                    }

                }
                
            function addClassRange (rowsArray) {
                rowsArray.forEach(function(row) {
                    var value = row.cells[colNum].innerHTML,
                        valueClass = row.cells[colNum].classList,
                        classNumbers;

                    classNumbers = {
                        'Elementary':'0',
                        'Pre-intermediate low':'1',
                        'Pre-intermediate':'2',
                        'Pre-intermediate strong':'3',
                        'Intermediate low':'4',
                        'Intermediate':'5',
                        'Intermediate strong':'6',
                        'Upper-intermediate low':'7',
                        'Upper-intermediate':'8',
                        'Upper-intermediate strong':'9',
                        'Advanced':'a',
                        }

                    valueClass.add(classNumbers[value]);
                });
            }

            rowsArray.sort(compare); 

            $grid.removeChild(tbody);

            for (var i = 0; i < rowsArray.length; i++) {
                tbody.appendChild(rowsArray[i]);
            }

            $grid.appendChild(tbody);
            }

        },

        showStudent: function () {
            // this.showStudent = new This.StudentView({model: this.model});
            // $('#modal-window').html(this.showStudent.render().el);

            alert('I will be showing a student');
        },

        render: function () {
            this.$el.empty();

            var students = [];

            this.model.forEach(function (student) {
                students.push(student.toJSON());
            });

            this.$el.append(this.template({students}));

            return this;
        }

    });
})(CS.Students, app);


var students = [
    {'name': 'Anastasyia Serheeva',
    'englishLevel': 'Upper-intermediate',
    'incomingScore': 100,
    'entryScore': 2,
    'approvedBy':'D.Petin'},
    {'name': 'Vladyslava Tyshchenko',
    'avatar': 'photo url',
    'englishLevel': 'Intermediate low',
    'incomingScore': 300,
    'entryScore': 3,
    'approvedBy':'D.Petin'},
    {'name':'Anna Hranovska',
    'englishLevel': 'Advanced',
    'incomingScore': 500,
    'entryScore': 2,
    'approvedBy':'D.Petin'},
    {'name':'Denis Poznukhov',
    'avatar': 'photo url',
    'englishLevel': 'Intermediate low',
    'incomingScore': 200,
    'entryScore': 1,
    'approvedBy':'D.Petin'},
    {'name':'Yuryi Tataryntsev',
    'avatar': 'photo url',
    'englishLevel': 'Intermediate low',
    'incomingScore': 200,
    'entryScore': 2,
    'approvedBy':'D.Petin'},
    {'name':'Artem Zhylko',
    'englishLevel': 'Advanced',
    'incomingScore': 100,
    'entryScore': 5,
    'approvedBy':'D.Petin'},
    {'name':'Anastasiia Manilnykova',
    'avatar': 'photo url',
    'englishLevel': 'Upper-intermediate',
    'incomingScore': 500,
    'entryScore': 2,
    'approvedBy':'D.Petin'},
    {'name':'Yana Sharipbaeva',
    'englishLevel': 'Intermediate',
    'incomingScore': 300,
    'entryScore': 2,
    'approvedBy':'D.Petin'}
    ];