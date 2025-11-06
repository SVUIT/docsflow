function RenameFile(e) {
  // Log the entire event object for debugging
  Logger.log(JSON.stringify(e));

  // Check if the event contains form responses
  if (!e || !e.namedValues) {
    Logger.log('Event does not contain form response values.');
    return;
  }

  // Log all namedValues for debugging
  Logger.log('Named Values: ' + JSON.stringify(e.namedValues));

  // Assume the last question contains the Google Drive file URL
  var namedValues = e.namedValues;
  var lastQuestionKey = Object.keys(namedValues).pop(); // Get the last question key
  var fileUrl = namedValues[lastQuestionKey][0]; // Get the URL value

  // Log the file URL
  Logger.log('File URL: ' + fileUrl);

  // Validate the file URL
  if (!fileUrl) {
    Logger.log('Invalid file URL.');
    return;
  }

  // Extract the file ID from the URL
  var fileId = fileUrl.match(/[-\w]{25,}/);
  if (!fileId) {
    Logger.log('Invalid file ID.');
    return;
  }

  // Log the file ID
  Logger.log('File ID: ' + fileId[0]);

  var file = DriveApp.getFileById(fileId[0]);
  var fileName = file.getName();

  // Log the original file name
  Logger.log('Original File Name: ' + fileName);

  // Reverse the file name string
  var reversedFileName = fileName.split('').reverse().join('');

  // Find the position of the first "-" in the reversed string
  var dashIndex = reversedFileName.indexOf('-');

  // Log the dash position
  Logger.log('Dash Index: ' + dashIndex);

  // If a dash is found, trim everything before it
  if (dashIndex !== -1) {
    var newReversedFileName = reversedFileName.substring(dashIndex + 1);
    // Reverse again to get the new file name
    var newFileName = newReversedFileName.split('').reverse().join('').trim();

    // Log the new file name
    Logger.log('New File Name: ' + newFileName);

    // Rename the file
    file.setName(newFileName);
  } else {
    Logger.log('No dash ("-") found in file name.');
  }
}
