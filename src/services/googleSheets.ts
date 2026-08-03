import googleConfig from '../config/google.json';

export interface BookingData {
  type?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  bookingNumber?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  returnDate?: string;
  returnType?: string;
  driverAge?: string;
  vehicleType?: string;
}

export const submitBookingToGoogleSheets = async (data: BookingData): Promise<{ success: boolean; message?: string }> => {
  if (!googleConfig.useGoogleAppsScript) {
    throw new Error('Google Apps Script submission is not enabled in config/google.json.');
  }

  const scriptUrl = googleConfig.scriptUrl;
  if (!scriptUrl) {
    throw new Error('Google Apps Script Web App URL is missing in config/google.json.');
  }

  // Gather client info
  const userAgent = navigator.userAgent;
  const browser = getBrowserInfo(userAgent);
  const operatingSystem = getOSInfo(userAgent);

  const payload = {
    type: data.type || 'Booking',
    ...data,
    userAgent,
    browser,
    operatingSystem,
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result && result.status === 'success') {
      return { 
        success: true, 
        message: 'Thank you! Your request has been received. Our team will contact you shortly to confirm your booking.' 
      };
    } else {
      return { success: false, message: result?.message || 'Unable to submit your request at this time. Please try again or call our support line.' };
    }
  } catch (error: any) {
    console.error('Error submitting to backend:', error);
    throw new Error(error.message || 'Unable to submit your request at this time. Please try again or call our support line.');
  }
};

function getBrowserInfo(ua: string): string {
  if (ua.includes('Firefox')) return 'Mozilla Firefox';
  if (ua.includes('SamsungBrowser')) return 'Samsung Internet';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  if (ua.includes('Trident')) return 'Microsoft Internet Explorer';
  if (ua.includes('Edg')) return 'Microsoft Edge';
  if (ua.includes('Chrome')) return 'Google Chrome';
  if (ua.includes('Safari')) return 'Apple Safari';
  return 'Unknown Browser';
}

function getOSInfo(ua: string): string {
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iPod')) return 'iOS';
  return 'Unknown OS';
}
