// content.js — Enhanced for all settings with stronger overrides

const applyProfile = (accessibility) => {
  if (!accessibility) {
    console.warn("UAPS Extension: No accessibility settings provided.");
    return;
  }

  const { textSize = "Medium", toggles = {} } = accessibility;
  console.log("UAPS Extension: Content script loaded on", window.location.href);
  console.log("UAPS Extension: Applying settings:", accessibility);

  // TEXT SIZE: Target all text elements inside #content for broader override
  const sizeMap = {
    Small: "16px",
    Medium: "18px",
    Large: "22px",
    "Extra Large": "26px"
  };
  const content = document.querySelector('#content');
  if (content) {
    // Apply to #content and all child elements (p, h1, etc.) for stronger override
    content.style.setProperty('font-size', sizeMap[textSize], 'important');
    const textElements = content.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, div');
    textElements.forEach(el => {
      el.style.setProperty('font-size', sizeMap[textSize], 'important');
    });
    console.log("UAPS Extension: Text size applied to", textElements.length, "elements.");
  }

  // READABLE FONT: Apply to body and content elements
  if (toggles.readableFont) {
    document.body.style.setProperty('font-family', 'Arial, Verdana, sans-serif', 'important');
    if (content) {
      content.style.setProperty('font-family', 'Arial, Verdana, sans-serif', 'important');
      const textElements = content.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, div');
      textElements.forEach(el => {
        el.style.setProperty('font-family', 'Arial, Verdana, sans-serif', 'important');
      });
    }
    console.log("UAPS Extension: Readable font applied.");
  } else {
    // Reset
    document.body.style.fontFamily = '';
    if (content) {
      content.style.fontFamily = '';
      const textElements = content.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, div');
      textElements.forEach(el => el.style.fontFamily = '');
    }
  }

  // SIMPLE MODE: Apply to content for better readability
  if (toggles.simpleMode) {
    if (content) {
      content.style.setProperty('line-height', '1.8', 'important');
      content.style.setProperty('max-width', '70ch', 'important');
      content.style.setProperty('margin', 'auto', 'important');
      const textElements = content.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, div');
      textElements.forEach(el => {
        el.style.setProperty('line-height', '1.8', 'important');
      });
    }
    console.log("UAPS Extension: Simple mode applied.");
  } else {
    // Reset
    if (content) {
      content.style.lineHeight = '';
      content.style.maxWidth = '';
      content.style.margin = '';
      const textElements = content.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, div');
      textElements.forEach(el => {
        el.style.lineHeight = '';
      });
    }
  }

  // ZOOM: Apply to body
  if (toggles.zoom) {
    document.body.style.setProperty('transform', 'scale(1.15)', 'important');
    document.body.style.setProperty('transform-origin', 'top center', 'important');
    console.log("UAPS Extension: Zoom applied.");
  } else {
    // Reset
    document.body.style.transform = 'none';
    document.body.style.transformOrigin = '';
    document.body.style.removeProperty('transform');
  }

  // VISUAL ALERTS: Style notification elements
  if (toggles.visualAlerts) {
    const notifications = document.querySelectorAll('.mw-notification');
    notifications.forEach(el => {
      el.style.setProperty('background', 'yellow', 'important');
      el.style.setProperty('border', '2px solid red', 'important');
    });
    // Add global style
    const style = document.createElement("style");
    style.textContent = `
      .mw-notification {
        background: yellow !important;
        border: 2px solid red !important;
      }
    `;
    document.head.appendChild(style);
    console.log("UAPS Extension: Visual alerts applied.");
  } else {
    // Reset
    const notifications = document.querySelectorAll('.mw-notification');
    notifications.forEach(el => {
      el.style.background = '';
      el.style.border = '';
    });
  }

  console.log("UAPS Extension: All settings applied successfully.");
};

// Function to load and apply profile from Chrome storage
const loadAndApplyProfile = () => {
  chrome.storage.sync.get("uapsProfile", (data) => {
    console.log("UAPS Extension: Loaded profile from storage:", data);
    const profile = data.uapsProfile;
    if (profile && profile.settings) {
      applyProfile(profile.settings);
    } else {
      console.warn("UAPS Extension: No valid profile found in storage. Using defaults.");
      applyProfile({ textSize: "Medium", toggles: {} });
    }
  });
};

// On Wikipedia: Load and apply profile with delay for better override
if (window.location.hostname.includes('wikipedia.org')) {
  // Delay application to ensure Wikipedia's styles load first
  setTimeout(() => {
    loadAndApplyProfile();
  }, 1000);  // 1-second delay

  // Listen for storage changes and reapply
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.uapsProfile) {
      console.log("UAPS Extension: Profile updated on Wikipedia, reapplying settings.");
      setTimeout(() => {
        loadAndApplyProfile();
      }, 500);  // Shorter delay for updates
    }
  });
}

// On web app (localhost:3000): Listen for settings saves and sync immediately
if (window.location.hostname === 'localhost') {
  window.addEventListener('settings-saved', (event) => {
    const newSettings = event.detail;
    console.log("UAPS Extension: Settings saved on web app, syncing:", newSettings);

    const profileStr = localStorage.getItem("uaps-profile");
    const profile = profileStr ? JSON.parse(profileStr) : {};

    const updatedProfile = {
      settings: newSettings,
      firstName: profile.settings?.firstName || '',
      lastName: profile.settings?.lastName || '',
      number: profile.settings?.number || '',
      address: profile.settings?.address || '',
      appliedApps: profile.appliedApps || []
    };

    chrome.storage.sync.set({ uapsProfile: updatedProfile }, () => {
      console.log("UAPS Extension: Synced updated settings to Chrome storage.");
    });
  });

  // Initial sync
  const previewStr = localStorage.getItem("uaps-preview");
  if (previewStr) {
    const preview = JSON.parse(previewStr);
    chrome.storage.sync.set({ uapsProfile: { settings: preview.settings } }, () => {
      console.log("UAPS Extension: Initial sync from localStorage.");
    });
  }
}