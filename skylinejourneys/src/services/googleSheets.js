import googleConfig from '../config/google.json';

export const submitToGoogleSheets = async (data) => {
  if (!googleConfig.useGoogleAppsScript) {
    return { success: true, message: 'Google Apps Script submission is disabled.' };
  }

  const scriptUrl = googleConfig.scriptUrl;
  if (!scriptUrl) {
    console.error('Google Apps Script URL is missing in config/google.json');
    return { success: false, message: 'Configuration error: Script URL is missing.' };
  }

  const userAgent = navigator.userAgent;
  const browser = getBrowserInfo(userAgent);
  const operatingSystem = getOSInfo(userAgent);

  const payload = {
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
      return { success: true, message: result.message };
    } else {
      return { success: false, message: result?.message || 'Unable to submit your request at this time.' };
    }
  } catch (error) {
    console.error('Error submitting to backend:', error);
    return { success: false, message: error.message || 'Unable to submit your request at this time.' };
  }
};

function getBrowserInfo(ua) {
  if (ua.includes('Firefox')) return 'Mozilla Firefox';
  if (ua.includes('SamsungBrowser')) return 'Samsung Internet';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  if (ua.includes('Trident')) return 'Microsoft Internet Explorer';
  if (ua.includes('Edg')) return 'Microsoft Edge';
  if (ua.includes('Chrome')) return 'Google Chrome';
  if (ua.includes('Safari')) return 'Apple Safari';
  return 'Unknown Browser';
}

function getOSInfo(ua) {
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iPod')) return 'iOS';
  return 'Unknown OS';
}
