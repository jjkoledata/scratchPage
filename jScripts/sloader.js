// Script that allows user to load different scripts on the same html page
// without having to edit the source code. Mainly useful developers who
// want to try out different methods/scripts.

// tracks loaded scripts
var loadedScripts =  [];

// Gets the filepath and script names
function pathFiles() {
  var path = prompt('Enter the path to the scripts:');
  var files = prompt('Enter the scripts you want to load:').split(' ');
  var infoArray = [path, files]
  return infoArray
}

// function that checks for duplicate entries
function checkList(item) {
  var checkValue = loadedScripts.indexOf(item);
  return checkValue;
};

// The core function of the script
function fetchScript(path, target) {
  $.getScript(path + target);
};

// Also supports web based scripts 
// ToDo: combine both fetch scripts.
function fetchWebScript() {
  source = prompt("Enter the URL for the script:");
  $.getScript(source);
  console.log(source + ' loaded.')
  if (checkList(source) === -1) {
    loadedScripts.push(source);
    addRow(source);
  }
}

function addRow(newItem) {
  var table = document.getElementById("tableBody");
  var row = table.insertRow(-1);
  var cell = row.insertCell(0);
  cell.innerHTML = newItem;
};

function clearLatest() {
  document.getElementById("tableBody").deleteRow(-1);
  loadedScripts.pop();
}

function cleanTable() {
  $("#tableBody").empty();
  loadedScripts = [];
  console.clear();
}

var loadScript = function() {
 
  fileInfo = pathFiles();
  fileList = fileInfo[1];
  filePath = fileInfo[0];

  for (let jsFile of fileList) {
    if (checkList(jsFile) === -1) {

      fetchScript(filePath, jsFile);
      loadedScripts.push(jsFile);
      addRow(jsFile);
      console.log(jsFile + ' loaded.');

    } else {
      fetchScript(filePath, jsFile);
      console.log(jsFile + ' reloaded.');
    }
  }
}
