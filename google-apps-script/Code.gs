/**
 * Google Apps Script Backend Code for Car Rental Application
 * Handles main hero booking form, car details form & floating chat inquiry form submissions.
 * Supports multiple recipient notification emails with GmailApp fallback.
 */

// Configuration
var SPREADSHEET_ID = ""; // Leave blank if attached to spreadsheet directly
var SHEET_NAME = "Bookings";
// Add multiple recipient emails here as an array
var NOTIFICATION_EMAILS = [
  "support@carrentaldesk.net",
  "abhishekchawala793@gmail.com"
];

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
        "Vehicle Type / Car",
        "Driver Name",
        "Phone",
        "Email",
        "Pickup Location",
        "Pickup Date & Time",
        "Drop-off Location",
        "Drop-off Date & Time",
        "Return Type",
        "Driver Age",
        "Subject",
        "Booking Number",
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
    } else {
      // Auto-upgrade logic for existing sheets with old headers
      var currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      var contactIdx = currentHeaders.indexOf("Contact (Phone / Email)");
      if (contactIdx !== -1) {
        // Replace "Contact (Phone / Email)" with "Phone"
        sheet.getRange(1, contactIdx + 1).setValue("Phone");
        // Insert a new column for "Email"
        sheet.insertColumnAfter(contactIdx + 1);
        sheet.getRange(1, contactIdx + 2).setValue("Email");
        // Style the new header
        sheet.getRange(1, contactIdx + 2)
          .setFontWeight("bold")
          .setBackground("#0F172A")
          .setFontColor("#FFFFFF");
      }
    }

    var timestamp = data.timestamp || new Date().toISOString();
    var submissionType = data.type || "Booking Lead";
    var vehicleType = data.vehicleType || "N/A";
    
    var customerName = data.customerName || ((data.firstName || "") + " " + (data.lastName || "")).trim();
    if (!customerName || customerName === "") customerName = "N/A";

    var phone = data.phone || "N/A";
    var email = data.email || "N/A";
    
    // Fallback if data is sent in old contactInfo format
    if (phone === "N/A" && email === "N/A" && data.contactInfo) {
      if (data.contactInfo.indexOf(" / ") !== -1) {
        var parts = data.contactInfo.split(" / ");
        phone = parts[0] || "N/A";
        email = parts[1] || "N/A";
      } else if (data.contactInfo.indexOf("@") !== -1) {
        email = data.contactInfo;
      } else {
        phone = data.contactInfo;
      }
    }

    var pickupLoc = data.pickupLocation || "N/A";
    var pickupDateTime = (data.pickupDate || "N/A") + (data.pickupTime ? (" " + data.pickupTime) : "");
    var dropoffLoc = data.dropoffLocation || (data.returnType === "Same Location" ? pickupLoc : "N/A");
    var dropoffDateTime = (data.returnDate || "N/A") + (data.returnTime ? (" " + data.returnTime) : "");
    
    var returnType = data.returnType || "N/A";
    var driverAge = data.driverAge || "N/A";
    var subject = data.subject || "N/A";
    var bookingNumber = data.bookingNumber || "N/A";
    var browser = data.browser || "Unknown";
    var operatingSystem = data.operatingSystem || "Unknown";
    var userAgent = data.userAgent || "";

    var newRow = [
      timestamp,
      submissionType,
      vehicleType,
      customerName,
      phone,
      email,
      pickupLoc,
      pickupDateTime,
      dropoffLoc,
      dropoffDateTime,
      returnType,
      driverAge,
      subject,
      bookingNumber,
      browser,
      operatingSystem,
      userAgent
    ];

    // Store in sheet
    sheet.appendRow(newRow);

    // Send instant email notification to all configured emails
    if (NOTIFICATION_EMAILS && NOTIFICATION_EMAILS.length > 0) {
      for (var i = 0; i < NOTIFICATION_EMAILS.length; i++) {
        var recipientEmail = NOTIFICATION_EMAILS[i].trim();
        if (recipientEmail !== "") {
          try {
            sendEmailNotification({
              recipient: recipientEmail,
              type: submissionType,
              timestamp: timestamp,
              vehicleType: vehicleType,
              customerName: customerName,
              phone: phone,
              email: email,
              pickupLoc: pickupLoc,
              pickupDateTime: pickupDateTime,
              dropoffLoc: dropoffLoc,
              dropoffDateTime: dropoffDateTime,
              returnType: returnType,
              driverAge: driverAge,
              subject: subject,
              bookingNumber: bookingNumber,
              browser: browser,
              os: operatingSystem
            });
          } catch (emailErr) {
            Logger.log("Email notification error for " + recipientEmail + ": " + emailErr.toString());
          }
        }
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
  var mailSubject = "🚨 New " + d.type + " Lead: " + d.vehicleType + " - " + d.customerName;
  var htmlBody = ""
    + "<div style='font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;'>"
    + "<h2 style='color: #0F172A; border-bottom: 2px solid #2563EB; padding-bottom: 10px;'>New " + d.type + " Lead Received</h2>"
    + "<p><strong>Received At:</strong> " + d.timestamp + "</p>"
    + "<table style='width: 100%; border-collapse: collapse; margin-top: 15px;'>"
    + "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Car / Vehicle Type</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #2563EB;'>" + d.vehicleType + "</td></tr>"
    + "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Driver Name</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;'>" + d.customerName + "</td></tr>"
    + (d.phone !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Phone Number</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #059669;'>" + d.phone + "</td></tr>" : "")
    + (d.email !== "N/A" ? "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Email Address</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #2563EB;'>" + d.email + "</td></tr>" : "")
    + "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Pick-up</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.pickupLoc + " (" + d.pickupDateTime + ")</td></tr>"
    + "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Drop-off</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.dropoffLoc + " (" + d.dropoffDateTime + ")</td></tr>"
    + (d.driverAge !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Driver Age</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.driverAge + "</td></tr>" : "")
    + (d.subject !== "N/A" ? "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Subject</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.subject + "</td></tr>" : "")
    + (d.bookingNumber !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Booking Number</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.bookingNumber + "</td></tr>" : "")
    + "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Browser / OS</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.browser + " on " + d.os + "</td></tr>"
    + "</table>"
    + "<p style='margin-top: 20px; font-size: 12px; color: #64748b;'>CarRentalDesk Lead Tracking System</p>"
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
    me = NOTIFICATION_EMAILS[0];
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
