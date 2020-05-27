const electron = require("electron");
const { crashReporter } = electron;
crashReporter.start({
  companyName: 'Streamon',
  productName: 'Streamon',
  ignoreSystemCrashHandler: true,
  submitURL: 'https://o399065.ingest.sentry.io/api/5255615/minidump/?sentry_key=f02edc62479c4cc1bb6294479f0cddb2'
});

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      sandbox: false
    }
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (true) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
