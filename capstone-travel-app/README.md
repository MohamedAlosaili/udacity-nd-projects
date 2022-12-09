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

2. Create account in [MeaningCloud](https://www.meaningcloud.com/developer/login) and get the License Key

3. Clone the project using this command

   ```
   git clone https://github.com/MohamedAlosaili/udacity-nd-projects.git
   ```

4. Download the dependencies

   ```
   npm install
   ```

5. Before running the app you need to create .env file in the root directory 'news-article-with-NLP/.env'.
   Create a API_KEY variable and assigned the license Key from [MeaningCloud](https://www.meaningcloud.com/developer/login) to it.

6. Last step is to run the app in developemnt mode useing this command
   ```
   npm run dev
   ```
