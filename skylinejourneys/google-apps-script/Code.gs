/**
 * Google Apps Script Backend Code for Skyline Journeys
 * Handles flight booking reservations & support chat inquiry form submissions.
 * Supports multiple recipient notification emails with GmailApp fallback.
 */

// Configuration
var SPREADSHEET_ID = ""; // Leave blank if attached to spreadsheet directly
var SHEET_NAME = "Skyline Bookings";
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
        "Passenger Name",
        "Email",
        "Phone",
        "Booking Number",
        "Flight Details",
        "Departure Date",
        "Cabin Class",
        "Fare Tier",
        "Total Amount",
        "Subject / Message",
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
    var submissionType = data.type || "Flight Booking";
    var passengerName = data.passengerName || "N/A";
    var email = data.email || "N/A";
    var phone = data.phone || "N/A";
    var bookingNumber = data.bookingNumber || "N/A";
    var flightDetails = data.flightDetails || "N/A";
    var departureDate = data.departureDate || "N/A";
    var cabinClass = data.cabinClass || "N/A";
    var fareTier = data.fareTier || "N/A";
    var totalAmount = data.totalAmount || "N/A";
    var subject = data.subject || "N/A";
    var browser = data.browser || "Unknown";
    var operatingSystem = data.operatingSystem || "Unknown";
    var userAgent = data.userAgent || "";

    var newRow = [
      timestamp,
      submissionType,
      passengerName,
      email,
      phone,
      bookingNumber,
      flightDetails,
      departureDate,
      cabinClass,
      fareTier,
      totalAmount,
      subject,
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
              passengerName: passengerName,
              email: email,
              phone: phone,
              bookingNumber: bookingNumber,
              flightDetails: flightDetails,
              departureDate: departureDate,
              cabinClass: cabinClass,
              fareTier: fareTier,
              totalAmount: totalAmount,
              subject: subject,
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
      message: "Thank you! Your request has been received. Our team will contact you shortly to confirm."
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

function sendEmailNotification(d) {
  var mailSubject = "🚨 New Skyline Journeys " + d.type + ": " + d.bookingNumber + " - " + d.passengerName;
  var htmlBody = ""
    + "<div style='font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;'>"
    + "<h2 style='color: #0F172A; border-bottom: 2px solid #2563EB; padding-bottom: 10px;'>New Skyline Journeys " + d.type + " Received</h2>"
    + "<p><strong>Received At:</strong> " + d.timestamp + "</p>"
    + "<table style='width: 100%; border-collapse: collapse; margin-top: 15px;'>"
    + "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Passenger Name</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;'>" + d.passengerName + "</td></tr>"
    + (d.phone !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Phone Number</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #059669;'>" + d.phone + "</td></tr>" : "")
    + (d.email !== "N/A" ? "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Email Address</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #2563EB;'>" + d.email + "</td></tr>" : "")
    + (d.bookingNumber !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Booking Reference (PNR)</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #b45309;'>" + d.bookingNumber + "</td></tr>" : "")
    + (d.flightDetails !== "N/A" ? "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Flight Details</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.flightDetails + "</td></tr>" : "")
    + (d.departureDate !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Departure Date</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.departureDate + "</td></tr>" : "")
    + (d.cabinClass !== "N/A" ? "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Cabin Class</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.cabinClass + "</td></tr>" : "")
    + (d.fareTier !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Fare Option</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.fareTier + "</td></tr>" : "")
    + (d.totalAmount !== "N/A" ? "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Total Price</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #1e3a8a;'>" + d.totalAmount + "</td></tr>" : "")
    + (d.subject !== "N/A" ? "<tr style='background: #f8fafc;'><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Subject / Message</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.subject + "</td></tr>" : "")
    + "<tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Browser / OS</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>" + d.browser + " on " + d.os + "</td></tr>"
    + "</table>"
    + "<p style='margin-top: 20px; font-size: 12px; color: #64748b;'>Skyline Journeys Lead & Booking Tracking System</p>"
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
  MailApp.sendEmail(me, "Permission Verification - Skyline Journeys", "Email permissions have been successfully granted!");
}

function doGet(e) {
  return createJsonResponse({
    status: "success",
    message: "Skyline Journeys Apps Script Web App is active!"
  });
}

function createJsonResponse(responseObject) {
  return ContentService.createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON);
}
