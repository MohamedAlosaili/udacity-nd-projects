# Front End Nanodegree Program

## Capstone Travel App

## Description

This project aims to put all of the skills that I have learned from ND program into one project.

- HTML / CSS
- JavaScript (DOM Manipulations & Accessing, Events & listeners, Fetch APIs, Asynchronous javascript).
- Webpack (configure for production & development environment).
- Service Workers
- Unit Testing (e.g. Jest framework)

## Test Project Locally

You can clone the project and test it on your local machine
Follow these steps to setup the app.

1. Make sure you have nodejs install by typing on your terminal

   ```
   node -v
   ```

   if you haven't, you can install it from here [nodejs](https://nodejs.org/en/)
   **Make sure to use version @12.13.1** wich I used. to run it without errors

2. Clone the project using this command

   ```
   git clone https://github.com/MohamedAlosaili/udacity-nd-projects.git
   ```

3. Download the dependencies

   ```
   npm install
   ```

4. Before running the app you need to create _.env_ file in the root directory 'capstone-travel-app/.env'.
   Create those variables

   ```
   WEATHER='key' from https://www.weatherbit.io/
   GEONAME='username' from https://www.geonames.org/
   PIXABAY='key' from https://pixabay.com/service/about/api/
   ```

5. Run the server in separate terminal window

   ```
   npm run server
   ```

6. Last step is to run the app in developemnt mode useing this command
   ```
   npm run build-dev
   ```
