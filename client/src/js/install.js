const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// added setup for an event handler for the `beforeinstallprompt` event
// discussed in week 19 mini-project
window.addEventListener('beforeinstallprompt', (event) => {
     // store triggered events
     window.deferredPrompt = event;

     // removes hidden class from button
     butInstall.classList.toggle('hidden', false);
});

// this will implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // this will show the prompt
    promptEvent.prompt();

    // this will reset the deferred prompt variable; it can only be used once
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// this adds an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // this will clear prompt
  window.deferredPrompt = null;
});
