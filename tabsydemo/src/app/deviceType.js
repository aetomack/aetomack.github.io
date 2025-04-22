function getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(userAgent)) {
      return "mobile";
    } else if (/Tablet|iPad/i.test(userAgent)) {
        return "tablet";
    } else {
      return "desktop";
    }
  }
  
  const deviceType = getDeviceType();