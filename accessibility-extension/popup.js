document.addEventListener('DOMContentLoaded', () => {
  const loadProfile = async () => {
    const result = await chrome.storage.local.get(['uapsProfile']);
    if (result.uapsProfile) {
      const profile = JSON.parse(result.uapsProfile);
      // Update popup UI
      document.getElementById('fontSize').value = profile.settings.textSize || 'Medium';
      document.getElementById('darkMode').checked = profile.settings.toggles?.darkMode || false;
    }
  };

  loadProfile();
});
