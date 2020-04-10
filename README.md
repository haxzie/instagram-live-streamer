# Instagram Live Streamer [UnOfficial]

> Stream to Instagram live from PC using OBS Studio or any streaming software.

![](./public/cover.png)

## Download
**Currently, Binaries are only available for Linux (Debian), (Mac and Windows coming soon)**
[Goto Releases](https://github.com/haxzie/instagram-live-streamer/releases) and download the `.deb` file. To install in Ubuntu run the following command.
```bash
sudo dpkg -i instagram-live-streamer_0.1.0_amd64.deb
```

## Usage
- Open the application and sign in using your Instagram username and password.
> Please note, we are not storing any of your credentials in any servers, this is completely a client-side application
- Click on Start Streaming and wait for the Stream URL and Stream Key to be populated
- Open any of your favorite streaming software, If you are using [OBS Studio](https://obsproject.com/) click on settings -> stream -> choose custom and copy paste the stream url and key from the app.
- Click on start streaming in OBS Studio
- In the application when you are ready, hit the `Go Live Button`

## Project Setup
This application uses Electron and React with [Instagram Private APIs](https://github.com/dilame/instagram-private-api/) thanks to [@dilame](https://github.com/dilame)

### Clone the project to your local machine
```bash
git clone https://github.com/haxzie/instagram-live-streamer.git
```

### Install dependencies
```bash
cd instagram-live-streamer
npm install
```

### Run the app in development mode
```bash
npm run electron-dev
```

## TODO
- [ ] Persist user session
- [ ] Live preview of the stream
- [ ] Ability to stream with out third party softwares
- [ ] Ability to see comments and live viewer count

## Disclaimer
This app or the creator is not associated or affliated to Instagram. This is an unofficial application and stands no liability or warranty of usage. Use at your own risk.