document.addEventListener('DOMContentLoaded', function() {
    var form1 = document.getElementById('form1');
    var form2 = document.getElementById('form2');
    var courseTable1 = document.getElementById('courseTable1').getElementsByTagName('tbody')[0];
    var courseTable2 = document.getElementById('courseTable2').getElementsByTagName('tbody')[0];
    var errorMessage = document.getElementById('errorMessage');
  
    var courses1 = [];
    var courses2 = [];
  
    document.getElementById('addCourse1').addEventListener('click', function() {
      addCourse(form1, courses1, courseTable1);
    });
  
    document.getElementById('addCourse2').addEventListener('click', function() {
      addCourse(form2, courses2, courseTable2);
    });
  
    function addCourse(form, courses, courseTable) {
      var subject = form.querySelector('input[type="text"]').value;
      var creditUnits = form.querySelector('input[type="number"]').value;
      var score = form.querySelectorAll('input[type="number"]')[1].value;
  
      if (subject === '' || creditUnits === '' || score === '') {
        errorMessage.textContent = 'Please fill in all the fields.';
        return;
      }
  
      errorMessage.textContent = '';
  
      var qualityPoints = calculateQualityPoints(score, creditUnits);
      courses.push({
        subject: subject,
        creditUnits: creditUnits,
        score: score,
        qualityPoints: qualityPoints
      });
  
      var row = courseTable.insertRow();
      row.insertCell().textContent = subject;
      row.insertCell().textContent = creditUnits;
      row.insertCell().textContent = score;
      row.insertCell().textContent = qualityPoints.toFixed(2);
  
      updateResults();
      form.reset();
    }
  
    function calculateQualityPoints(score, creditUnits) {
      var qualityPoints = parseFloat(score) * parseFloat(creditUnits);
      return qualityPoints;
    }
  
    function updateResults() {
      var totalQualityPoints = 0;
      var totalCredits = 0;
  
      for (var i = 0; i < courses1.length; i++) {
        totalQualityPoints += courses1[i].qualityPoints;
        totalCredits += parseFloat(courses1[i].creditUnits);
      }
  
      for (var j = 0; j < courses2.length; j++) {
        totalQualityPoints += courses2[j].qualityPoints;
        totalCredits += parseFloat(courses2[j].creditUnits);
      }
  
      var gpa = totalQualityPoints / totalCredits;
      var cgpa = (gpa * totalCredits) / (totalCredits + totalCredits);
  
      document.getElementById('gpaValue').textContent = gpa.toFixed(2);
      document.getElementById('cgpaValue').textContent = cgpa.toFixed(2);
    }
  });
  