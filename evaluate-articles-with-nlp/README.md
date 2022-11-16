# Front End Nanodegree Program

## Evaluate a News Article with NLP

## Description

In the fourth course of this program, we learned about build tools like Webpack, esbuild, etc.

This project utilizes:

- Webpack as a build tool
- bable loader for JavaScript files
- CSS loaders for converting .scss file into .css
- Service workers

At the end of the course, we learn about service workers and how they help us push navigations or run pages offline

## Test Project Locally

You can clone the project and test it on your local machine
Follow these steps to setup the app.

1. Make sure you have nodejs install by typing on your terminal

   ```
   node -v
   ```

   if you haven't you can install it from here [nodejs](https://nodejs.org/en/)
   **Make sure the version is @12.13.1** wich I used. to run it without errors

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
