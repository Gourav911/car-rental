/**
 * Google Apps Script Backend Code for Car Rental Application
 * Handles both main booking form & floating chat inquiry form submissions.
 * Includes GmailApp fallback for seamless email notifications.
 */

// Configuration
var SPREADSHEET_ID = ""; // Leave blank if attached to spreadsheet directly
var SHEET_NAME = "Bookings";
var NOTIFICATION_EMAIL = "abhishekchawala793@gmail.com"; // Replace with your email address

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

    // Store in sheet
    sheet.appendRow(newRow);

    // Send instant email notification
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.trim() !== "") {
      try {
        sendEmailNotification({
          recipient: NOTIFICATION_EMAIL,
          type: submissionType,
          timestamp: timestamp,
          pickupLocation: pickupLocation,
          pickupDate: pickupDate,
          returnDate: returnDate,
          returnType: returnType,
          driverAge: driverAge,
          vehicleType: vehicleType,
          firstName: firstName,
          lastName: lastName,
          email: email,
          subject: subject,
          bookingNumber: bookingNumber,
          browser: browser,
          os: operatingSystem
        });
      } catch (emailErr) {
        Logger.log("Email notification error: " + emailErr.toString());
      }
    }

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

function sendEmailNotification(d) {
  var mailSubject = "🚨 New " + d.type + " Notification - CarRentalDesk";
  var htmlBody = ""
    + "<div style='font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;'>"
    + "<h2 style='color: #0F172A; border-bottom: 2px solid #2563EB; padding-bottom: 10px;'>New Website " + d.type + " Received</h2>"
    + "<p><strong>Time:</strong> " + d.timestamp + "</p>"
    + "<table style='width: 100%; border-collapse: collapse; margin-top: 15px;'>"
    + (d.pickupLocation !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Pickup Location</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.pickupLocation + "</td></tr>" : "")
    + (d.pickupDate !== "N/A" ? "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Pickup Date</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.pickupDate + "</td></tr>" : "")
    + (d.returnDate !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Return Date</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.returnDate + "</td></tr>" : "")
    + (d.returnType !== "N/A" ? "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Return Type</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.returnType + "</td></tr>" : "")
    + (d.driverAge !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Driver Age</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.driverAge + "</td></tr>" : "")
    + (d.vehicleType !== "N/A" ? "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Vehicle Type</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.vehicleType + "</td></tr>" : "")
    + (d.firstName !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Name</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.firstName + " " + d.lastName + "</td></tr>" : "")
    + (d.email !== "N/A" ? "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Customer Email</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.email + "</td></tr>" : "")
    + (d.subject !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Subject</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.subject + "</td></tr>" : "")
    + (d.bookingNumber !== "N/A" ? "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Booking Number</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.bookingNumber + "</td></tr>" : "")
    + "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Browser / OS</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.browser + " on " + d.os + "</td></tr>"
    + "</table>"
    + "<p style='margin-top: 20px; font-size: 12px; color: #64748b;'>CarRentalDesk Automated System</p>"
    + "</div>";

  try {
    MailApp.sendEmail({
      to: d.recipient,
      subject: mailSubject,
      htmlBody: htmlBody
    });
  } catch (e1) {
    GmailApp.sendEmail(d.recipient, mailSubject, "", { htmlBody: htmlBody });
  }
}

// Dedicated function to trigger one-click Google account authorization
function authorizeEmailPermissions() {
  var me = Session.getActiveUser().getEmail();
  if (!me) {
    me = NOTIFICATION_EMAIL;
  }
  MailApp.sendEmail(me, "Permission Verification - CarRentalDesk", "Email permissions have been successfully granted!");
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
