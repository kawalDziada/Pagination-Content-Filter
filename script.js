var studentsToHide = document.getElementsByClassName('student-item');
var message = document.createElement('div');
message.innerHTML = '<div class="message"><p>No Students Found!</p></div>';
message.style.textAlign = "center";


function showPage(x, z) {
  var members;
  members = z;
  var chosen = [];
  chosen.push(x);
  if (chosen !== 0) {
    chosen = chosen * 10;
  }
  $('.student-item').hide();
  for (i = chosen; i < chosen + 10; i ++) {
    members[i].style.display = 'block';
  }
}

function appandPageLink(y) {
  var students = [];
  for (var k = 0; k < y.length; k++) {
    students.push(y[k]);
  }
  var value;
  var initial = [];
  var numberOfStudents = students.length;
  var numberOfPages = Math.ceil(numberOfStudents / 10);
    $('ul').append('<ol class="pagination"></ol>');
    for (var i = 1; i <= numberOfPages; i ++ ) {
        $('ol').append('<li class="pagination"><a class="pagination">' + i + '</a></il>');
    }
    $('.student-item').hide();
    initial = students.slice(0, 10);
    for (var m = 0; m < initial.length; m++) {
      initial[m].style.display = 'block';
    }
    $('.pagination li a').click(function() {
      value  = $(".pagination li a").index(this);
      showPage(value, students);
    });
}

function removePagination() {
  $('ol').remove();

}

function appendMessage() {
  $('.page').append(message);
  $('.message').show();
}

function removeMessage() {
  $('.message').hide();
}

function searchList() {
  var studentElement = '';
  var found = [];
  var filter = document.getElementsByTagName('input')[0];
  var search = filter.value.toUpperCase();
  for (i = 0; i < studentsToHide.length; i ++) {
    studentsToHide[i].style.display = 'none';
    studentElement = studentsToHide[i];
    var sName = '';
    sName = studentElement.getElementsByTagName('h3')[0];
    var sNameFinder = '';
    sNameFinder = sName.innerHTML.toUpperCase();
    var sMail = '';
    sMail = studentElement.getElementsByClassName('email')[0];
    var sMailFinder = '';
    sMailFinder = sMail.innerHTML.toUpperCase();
    if (search == '' || search == undefined || search == null) {
      removePagination();
      removeMessage();
      appandPageLink(studentsToHide);
    } else if (sNameFinder.indexOf(search) !== -1 && sMailFinder.indexOf(search) !== -1) {
      studentsToHide[i].style.display = 'block';
      found.push(studentsToHide[i]);
      removeMessage();
      removePagination();
    } else {
      removePagination();
    }
  }
    if (found.length < 1 && search !== '' && search !== undefined && search !== null) {
      appendMessage();
    } else if (found.length > 10) {
      appandPageLink(found);
    }
}

$('button').on('click', searchList);

appandPageLink(studentsToHide);
