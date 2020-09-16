<div align="center">
  <img alt="vueje" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" width="200">
  <h1>Lemon 🍋</h1>

  <p>Web application made with VueJS.</p>
</div>

## Resources 📝

* [VueJs](https://vuejs.org/)

I'd highly recommend reading through some of the VueJs documentation.

## Project 🚧

This web application is part of a bigger project named *Goyave*. *Govaye* intends to generates journeys based on the user's likings. The journey are generated according multiple parameters: Localisation 📍, Time 🕑, Budget 💰 and Activity category 📁.

## Web Actions ⚙️

With this mobile application, users can:
* SignIn
* SignUp
* Reset password
* Pay the subscription
* Add activities
* See their activity current state

## Requirements 📄

To use this web application you will need VueJs.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v10.14.2

    $ npm --version
    6.4.1

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### VueJs

To install VueJs, just run:
```
npm install vue
```

---

## Install 📥

    $ git clone https://github.com/b0rdjack/lemon.git
    $ cd lemon
    $ npm install

## Configure app 🔧

Open `config.js` then edit it with your settings. You will need:
- API_URL: URL of the [API](https://github.com/b0rdjack/api-mango.git)

## Running the project 🚀

    $ npm run serve
