# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### About the app

This is a clone of Netflix movies streaming site. This app was created by using ReactJS, Redux, Firebase for authentication and Stripe integration for payment

### Hot to run this app?
> run npm install to download packages required by the app

1. Create a firebase project and copy the firebase config code to the firebaseconfig.js
2. Create a Stripe account and integrate with firebase using Stripe Payments plugin
3. Enable Firebase email authentication
4. Place the stripe api scecret key to Plans.jsx file
5. npm run dev to start the application


### Additional Features

1. Banner Slideshow - banner will change to different movie like Carousel
2. Stripe Payments
3. Firebase Authentication
4. Hover-on movie name and rating display
