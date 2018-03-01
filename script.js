var studentsToHide = document.getElementsByClassName('student-item');
//Message "No Student is found" is generated
var message = document.createElement('div');
message.innerHTML = '<div class="message"><p>No Students Found!</p></div>';
message.style.textAlign = "center";
//Search bar is generated
$('.page-header').append('<div class="page-header student-search"><button class="page-header student-search" type="button" name="button">Search</button><input class="page-header student-search" type="text" name="" value=""></div>');


//accepts parameters from appendPageLinks function. First value is indicate clicked page, second is stands for list of the students
function showPage(pageNumber, studentsToPrint) {
  var members;
  members = studentsToPrint;
  var chosen = [];
  //pushing number into an array and chcecking if clicked Page wasn't 1
  chosen.push(pageNumber);
  if (chosen !== 0) {
    //Multiply chosen variable by 10
    chosen = chosen * 10;
  }
  //Hideing all of the students on the list
  $('.student-item').hide();
  //Printing students from proper page
  for (i = chosen; i < chosen + 10; i ++) {
    members[i].style.display = 'block';
  }
}
//function accepts one parameter which is list of the students who needs to be printed on the page
function appandPageLink(studentsList) {
  var students = [];
  //pushes list of students into the array
  for (var k = 0; k < studentsList.length; k++) {
    students.push(studentsList[k]);
  }
  var value;
  var initial = [];
  //declare how long is the list of students
  var numberOfStudents = students.length;
  //printing paggination on bottom of web page
  var numberOfPages = Math.ceil(numberOfStudents / 10);
    $('ul').append('<ol class="pagination"></ol>');
    for (var i = 1; i <= numberOfPages; i ++ ) {
        $('ol').append('<li class="pagination"><a class="pagination">' + i + '</a></il>');
    }
    //hideing all students
    $('.student-item').hide();
    //printing first 10 people on the list
    initial = students.slice(0, 10);
    for (var m = 0; m < initial.length; m++) {
      initial[m].style.display = 'block';
    }
    //if certain page is clicked show Page is called with 2 arguments first which page was clicked and second how many students are to print
    $('.pagination li a').click(function() {
      value  = $(".pagination li a").index(this);
      showPage(value, students);
    });
}
//function removes paggination from web page
function removePagination() {
  $('ol').remove();
}
//function appends message that there is no student found and shows this message if it is hidden
function appendMessage() {
  $('.page').append(message);
  $('.message').show();
}
// function hides the message that there is no students found
function removeMessage() {
  $('.message').hide();
}

function searchList() {
  var studentElement = '';
  var found = [];
  //colect input from input field
  var filter = document.getElementsByTagName('input')[0];
  var search = filter.value.toUpperCase();
  for (i = 0; i < studentsToHide.length; i ++) {
    //hideing all students
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
    //chcecking if input field is empty
    if (search == '' || search == undefined || search == null) {
      // if is empty start functions...
      removePagination();
      removeMessage();
      appandPageLink(studentsToHide);
      //if we finde name or email from list of students
    } else if (sNameFinder.indexOf(search) !== -1 && sMailFinder.indexOf(search) !== -1) {
      //display results
      studentsToHide[i].style.display = 'block';
      //push results into found array
      found.push(studentsToHide[i]);
      //start functions
      removeMessage();
      removePagination();
    } else {
      //if there are on students and emails found start function
      removePagination();
    }
  }
  //if no student was found and input wasn't empty
    if (found.length < 1 && search !== '' && search !== undefined && search !== null) {
      //start function
      appendMessage();
      //If found array is longer than 10 display results useing appandPageLink function
    } else if (found.length > 10) {
      appandPageLink(found);
    }
}
//start search function when button is clicked
$('button').on('click', searchList);
//start appandPageLink function
appandPageLink(studentsToHide);
