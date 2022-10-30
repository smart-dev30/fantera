# Fantera React App(Javascript)

This is the NEAR token explorer written by `smart-dev30`.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup
  > yarn install

## Screenshot
![Screenshot](screen.gif)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

In order to test your credit card connect you shoud input valid card number.\
Please use the following card numbers.
```
4111 1111 1111 1111

3700 000000 00002

3600 666633 3344

6011 6011 6011 6611

5066 9911 1111 1118

6250 9460 0000 0016

6062 8288 8866 6688
```

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project structure

```
src
├── components
│   ├── Border            # Ticket Border Component
│   ├── CreditCard        # added Card Component
│   ├── CreditForm        # check modal component
│   └── Ticket            # Ticket Component
│
├── database              # mock data
│
├── utils                 # validation utils
│
├── styles                # styles
│
├── pages                 # contain all web pages
│   ├── main              # tickets page
│   └── checkout          # check page
└── App.js                # main page
```
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
