# Google Sheets & Apps Script Setup Guide

Follow this step-by-step guide to connect your Car Rental application form data (Booking Form + Support Chat Drawer) to Google Sheets.

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Name the spreadsheet: **`Car Rental Bookings`** (or any name you prefer).

---

## Step 2: Open Apps Script Editor

1. Inside your Google Sheet, click **Extensions** in the top menu bar.
2. Select **Apps Script**.
3. A new script editor tab will open.

---

## Step 3: Add the Backend Script (`Code.gs`)

1. Delete any default code in the `Code.gs` editor.
2. Open the [`google-apps-script/Code.gs`](file:///d:/projects/carrental/google-apps-script/Code.gs) file from this project and copy its entire contents:

```javascript
var SPREADSHEET_ID = ""; // Leave blank if attached directly to the target spreadsheet
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

    // Automatically create headers if sheet is empty
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
      message: "Submitted successfully to Google Sheets!"
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
```

3. Click the **Save** icon (💾) or press `Ctrl + S`.

---

## Step 4: Deploy as Web App

1. In the top-right corner of Apps Script, click **Deploy** > **New deployment**.
2. Click the gear icon next to **Select type** and choose **Web app**.
3. Fill in deployment settings:
   - **Description**: `Car Rental Backend API`
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone** *(Crucial for CORS-free public submissions)*
4. Click **Deploy**.
5. Grant permissions if prompted by Google (*Click "Advanced" > "Go to Untitled project (unsafe)"*).
6. Copy the generated **Web App URL** (e.g. `https://script.google.com/macros/s/AKfycbx.../exec`).

---

## Step 5: Configure Application

1. Open [`src/config/google.json`](file:///d:/projects/carrental/src/config/google.json) in your project workspace.
2. Paste your Web App URL into `"scriptUrl"`:

```json
{
  "spreadsheetId": "YOUR_OPTIONAL_SPREADSHEET_ID",
  "sheetName": "Bookings",
  "serviceAccountEmail": "",
  "privateKey": "",
  "scriptUrl": "https://script.google.com/macros/s/YOUR_APPS_SCRIPT_DEPLOYMENT_ID/exec",
  "useGoogleAppsScript": true
}
```

---

## Step 6: Test Form Submissions

1. Run the local application with `npm run dev`.
2. Submit the **Booking Form** on the home hero section.
3. Open the **Floating Chat Drawer** at the bottom-right and submit an inquiry message.
4. Check your Google Sheet  rows will automatically populate with header styling and timestamps.
