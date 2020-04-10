# Instagram Live Streamer [UnOfficial]

> Stream to Instagram live from PC using OBS Studio or any streaming software.

![](./public/cover.png)

## Download

> NOTE: Due to privacy concerns and due to Instagram's terms of services we are not able to provide you with any distributables. If you like the project, you can use the code and build it for yourself.

### Building for Linux
Clone the project into your local machine and install the dependencies. Make sure you have latest version of Node, NPM and Python installed.

```bash
git clone https://github.com/haxzie/instagram-live-streamer.git
cd instagram-live-streamer
npm install
```
Run the following command to generate installable packages for linux (Debian/Ubuntu). For building for other Operating Systems and architecture, edit the `package.json` and add necessary details inside the `build` property as specified [here](https://www.electron.build/configuration/configuration)
```bash
npm run pack
```
```bash
npm run dist
```
The above command will generate instabble `.deb` package in the `dist` sub directory of the project. You can cd into the folder and install the package using dpkg.
```bash
cd dist
sudo dpkg -i instagram-live-streamer_0.1.0_amd64.deb
```

## Usage

- Open the application and sign in using your Instagram username and password.
  > Please note, we are not storing any of your credentials in any servers, this is completely a client-side application
- Click on Start Streaming and wait for the Stream URL and Stream Key to be populated
- Open any of your favorite streaming software, If you are using [OBS Studio](https://obsproject.com/) click on settings -> stream -> choose custom and copy paste the stream url and key from the app.
- Click on start streaming in OBS Studio
- In the application when you are ready, hit the `Go Live Button`

> Watch the video to get a better idea on how to setup instagram live streamer with OBS Studio

<center>
<a href="https://youtu.be/7F42Z0mBuok" target="_blank" rel="noopener"><img src="./public/obs-studio-video.png"/></a>
</center>

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
