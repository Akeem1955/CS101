const newsForm = document.getElementById("newsForm");
const submitButton = document.getElementById("submitBtn");
const loadingOverlay = document.getElementById("loadingOverlay");
const successMessage = document.getElementById("successMessage");
const failMessage = document.getElementById("failMessage");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");



 // Load the Google API Client Library
 function loadClient() {
  gapi.load('client:auth2', initClient);
}

// Initialize the Google Drive API client
function initClient() {
  var serviceAccountCredentials = {
    client_email: 'cs101-759@cs101-388211.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwV10pSq0f8TIE\nqoumpYu2kGxw2+9t8xtcaoQ0T33UEVKGG25I8XKKIpwvnMecoj9Fugv0FGUJRx3w\nB8HJViPocFpxrLCkGI/BNRTtfU5js9DfSHF7Ao4f6BfXhpXDjpeYVXYyFM1ilvXF\nc8Ysx1WTv6TH8oJPy3cilxEiUEF2f/qk2nnOsiYR0ZzxPd8W4ThdmHICg1QXsJVu\ntzZ0nlDZbf2pWLFHrMu4ziwYWWBFwixvExI1HKla9hOrZxmWLzkdIRmvYO0gCD/i\n0Fdf9DD4Y3t2PSSPHnN4zfByXdQ/8Z1mlaZe94sGr7i9OfA20oQ5UIhFPLjG3NUl\nf/g6/+LHAgMBAAECggEAIT/HxBJdhElRGgoiHMDYEAs5NypxAbU18n3vAYH/gq3l\ndn3TlJNZ+mu+MUgJZyI8deQ3fsUdq9sp7Ok5g8HnMVuF4isifz5WVKKymHjo/+mW\nt5MMOppnu+JiJHQu5tmLAeETUSwU8cLvAlTrB+Rp4VrgMgcqxOrjQrVjOKoTPclg\nkK0QX021Nl0s7dTvOCA/IJKLp46e0hw/17SR1vsmCJC4m7Ey9quB6gzQIUwbG98G\ngvXJHWwMHX//r6yzWhGyLdO1HEl9BfY6oArcQ26QQ4LiLMiA//03iPeXPZVJnu+B\nB+9trfXt8xo6P7xRiZSDWpElotyzhLTrFDLOqFOHQQKBgQD5FWsI5UoB3hu5Q3f+\nEAwkbYJHZkgV8/JP1qGZyxFSyrlHLaY+IJKDLwsLLz7dZYkQO5Vt0E13+x2KpA2I\nskB0Rz2goDGtqHaWS9fCECR4tZkNMWbhi0g2WmfMQW+RUH2W1H/y+3nR3d+oyBSO\nZm6z5hWgt7Hc+EitiFUuR27oYQKBgQC1PN1yhSKFh2t9ETz1k6LayItrg7euk40s\nbIIN3ouKu1iEwPqNV3ziWa8HglzxNxDj+bnC59dNhHicl6LCM5v6hexcnW+RWh/5\n4hn+Ufg1BGNZdIi+RVw5t6PaX3M9W502Ne0P3HyLVS9VIedZh4GlypyfVU86Khjv\nOEcXXjv8JwKBgBFJDzh60Pv4MexVZkpXSsBsaRITYwVC/JnVxzkpAnbAYsMxw8uj\n7wbziMyp5q7ukOhzehc40Wd2IcKxR88or5hiKUCwXUIz4qbjdIGfJSjLUWe8+erF\nA6nh9DoUgG2RLGX/MTHnibiqsQ7Bc8u+CAir+uxAUzOGd2SzhVXE10mBAoGAPJq0\nxmXErHgjNng8NTaAP77N+E7cblFC5PcH6lFfwi1xpTrOzdLSnPI2eEFciQDL8iAA\nwS87rN0+Y8bFE0Gkx/peln3C4A0OIkY8QPHyGPB1tGUmkNGqzFYfQZendn4bLRSN\nSD+HmiQLJuGmdia88M623wTs8FtBaUUdaLAHSQMCgYEAscIWaW68D/ipnmJCLDZ4\nz+WAArs+nCyHP2QoQ5dv25PQwXWwdpxtZK3eoA09vNfL+sfWUAoCOgHAu5/c5MPk\nMBGzlDBZdzVPeX7Mi/zKCqzdxmDICqhN++sce4oaHAwO1NYAYl/bwSOblfiXK4EI\ngEFAopt0fdz2n/lOgsrAwS0=\n-----END PRIVATE KEY-----\n'
  };
  gapi.client.init({
    apiKey: 'AIzaSyA-0fIFellGjr9c9x6cSS-7pynltLIL89w',
    serviceAccountAuth: true,
    serviceAccountEmail: serviceAccountCredentials.client_email,
    serviceAccountPrivateKey: serviceAccountCredentials.private_key,
    clientId: '429698905625-nil8ub7blc8cmpf65n46hdrm99218q00.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scope: 'https://www.googleapis.com/auth/drive'
  }).then(function() {
    // API is initialized and ready to use
    console.log('API initialized ok');
  }).catch(function(error) {
    console.error('Error initializing API:', error);
  });
}

// Load the API client and initialize the Google Drive API
function handleClientLoad() {
  gapi.load('client:auth2', loadClient);
}

                                                                         //Upload news 
function uploadDocument(file) {
  const formData = new FormData();
  formData.append('news',file,'data.json')

  gapi.client.drive.files.create({
    resource:{
      name:"data.json"
    },
    media: {
      mimeType: file.type,
      body: formData
    }
  }).then(response => {
     // Reset form inputs
    titleInput.value = "";
    contentInput.value = "";
     // Hide loading overlay and show success message
     loadingOverlay.style.display = "none";
     successMessage.style.display = "block"; 
     setTimeout(function() {
      successMessage.style.display = "none";
      submitButton.disabled = false;
    }, 2000);
    console.log('Document uploaded:', response.result);
  }).catch(error => {
    loadingOverlay.style.display = "none";
    failMessage.style.display = "block"; 
    setTimeout(function() {
      failMessage.style.display = "none";
      submitButton.disabled = false;
    }, 2000);
    console.error('Error uploading document:', error);
  });
}

// Handle form submission
newsForm.addEventListener("submit", function(event) {
  event.preventDefault();


  const title = titleInput.value;
  const content = contentInput.value;

  if (title && content) {
    // Show loading overlay and disable submit button
    loadingOverlay.style.display = "flex";
    submitButton.disabled = true;

    // Simulate API request delay
    let json = {
      title:"",
      content:""
    }
    json.title=title;
    json.content=content
    console.log(json.title)
    let blob = new Blob([JSON.stringify(json)], { type:"appliction/json" });
    
    uploadDocument(blob)
  }
});
