templates.studentListViewTpl = _.template([
    '<thead>',
        '<tr>',
            '<th class="name">Name</th>',
            '<th>Photo</th>',
            '<th class="range">English level</th>',
        '</tr>',
    '</thead>',
    '<tbody class = "tableBodyStudents">',
        '<% _.each(students, function (student) { %>',
            '<tr>',
            '<td name="studName"><%= student.name %></td>',
            '<% if ("avatar" in student ) { %>',
                '<td><%= student.avatar %></td>',
            '<% } else { %>',
                '<td><img class="photo img-circle" src="/img/default-photo.png"/></td>',
            '<% } %>',
            '<td><%= student.englishLevel %></td>',
            '</tr>',
            '<% }); %>',
    '</tdoby>'
].join(''));

templates.studentListModalViewTpl = _.template([
    '<section class="modal-window modal_editStudentlist">',
        '<section class="form-inline form-wrapper container">',
            '<div class="header-modal-editStudentlist">',
                '<span>Student list</span>',
                '<button class = "fa fa-plus-square-o fa-4x createStudent"></button>',
            '</div>',
            '<table class="students_list">',
            '<thead>',
                '<tr>',
                    '<th>Name</th>',
                    '<th>Photo</th>',
                    '<th>English level</th>',
                    '<th></th>',
                    '<th></th>',
                    '<th></th>',
                '</tr>',
            '</thead>',
            '<tbody class = "tableBodyStudents">',
                '<% _.each(students, function (student) { %>',
                    '<tr>',
                    '<td name="studName"><%= student.name %></td>',
                    '<% if ("avatar" in student ) { %>',
                        '<td><%= student.avatar %></td>',
                    '<% } else { %>',
                        '<td><img class="photo img-circle" src="/img/default-photo.png"/></td>',
                    '<% } %>',
                    '<td><%= student.englishLevel %></td>',
                    '<td><i class="fa fa-download" aria-hidden="true" alt="" title="Download CV"></i></td>',
                    '<td><i class="fa fa-cog fa-2x gear" src="" alt="" title="Edit"></i></td>',
                    '<td><i class="fa fa-trash" aria-hidden="true" src="" alt="" title="Delete"></i></td>',
                    '</tr>',
                    '<% }); %>',
            '</tdoby>',
            '</table>',
            '<button class = "fa fa-times-circle-o fa-3x btn-icon exit"></button>',
        '</section>',
    '</section>'
].join(''));