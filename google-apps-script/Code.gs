/**
 * Google Apps Script Backend Code for Car Rental Application
 * Handles both main booking form & floating chat inquiry form submissions.
 * 
 * Instructions:
 * 1. Open Google Sheets (or create a new sheet).
 * 2. Click Extensions > Apps Script.
 * 3. Replace all existing code in Code.gs with this script.
 * 4. Update SPREADSHEET_ID and SHEET_NAME if needed (or leave empty to target active sheet).
 * 5. Click Deploy > New deployment.
 * 6. Select type: "Web app".
 * 7. Set "Execute as": "Me".
 * 8. Set "Who has access": "Anyone".
 * 9. Click Deploy and copy the Web App URL.
 * 10. Paste the Web App URL into `src/config/google.json` under `"scriptUrl"`.
 */

var SPREADSHEET_ID = ""; // Leave blank if attached to the spreadsheet directly
var SHEET_NAME = "Bookings";

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }

    var ss;
    if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } else {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Automatically create headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Submission Type",
        "First Name",
        "Last Name",
        "Email",
        "Subject",
        "Booking Number",
        "Pickup Location",
        "Pickup Date",
        "Return Date",
        "Return Type",
        "Driver Age",
        "Vehicle Type",
        "Browser",
        "Operating System",
        "User Agent"
      ];
      sheet.appendRow(headers);
      
      // Style headers
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0F172A");
      headerRange.setFontColor("#FFFFFF");
    }

    var timestamp = data.timestamp || new Date().toISOString();
    var submissionType = data.type || "Booking";
    var firstName = data.firstName || "N/A";
    var lastName = data.lastName || "N/A";
    var email = data.email || "N/A";
    var subject = data.subject || "N/A";
    var bookingNumber = data.bookingNumber || "N/A";
    var pickupLocation = data.pickupLocation || "N/A";
    var pickupDate = data.pickupDate || "N/A";
    var returnDate = data.returnDate || "N/A";
    var returnType = data.returnType || "N/A";
    var driverAge = data.driverAge || "N/A";
    var vehicleType = data.vehicleType || "N/A";
    var browser = data.browser || "Unknown";
    var operatingSystem = data.operatingSystem || "Unknown";
    var userAgent = data.userAgent || "";

    var newRow = [
      timestamp,
      submissionType,
      firstName,
      lastName,
      email,
      subject,
      bookingNumber,
      pickupLocation,
      pickupDate,
      returnDate,
      returnType,
      driverAge,
      vehicleType,
      browser,
      operatingSystem,
      userAgent
    ];

    sheet.appendRow(newRow);

    return createJsonResponse({
      status: "success",
      message: "Thank you! Your request has been received. Our team will contact you shortly to confirm your booking."
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

function doGet(e) {
  return createJsonResponse({
    status: "success",
    message: "Car Rental Apps Script Web App is active!"
  });
}

function createJsonResponse(responseObject) {
  return ContentService.createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON);
}
