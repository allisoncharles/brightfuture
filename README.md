## Intro

This school web application is built with React.js, Next.js, GraphQL and MongoDB.Seamlessly integrates a range of essential features for efficient school management. 

Administrators can effortlessly upload CSV files containing user information and student results. The app also boast an  image gallery feature. Additionally, school events and news can be promptly shared through the application. Also students can access their results by entering their registration no. and passcode.


## Getting Started

First create a .env.local file at the root of the app, and include the following.
SECRET_KEY - A jwt token.
MONGODB_URI - MongoDB connection URI
BASE_URL - The baseURL of the running application. In development : http://localhost:3000

In case you want to insert details for the app test demo; add this to the env file. You'll have t create a user and upload a result to be able to fill in the details.
NEXT_PUBLIC_TEST_LOGIN_PASSCODE
NEXT_PUBLIC_TEST_LOGIN_REG

NEXT_PUBLIC_TESTREG
NEXT_PUBLIC_TESTPASSCODE
NEXT_PUBLIC_TESTTERM
NEXT_PUBLIC_TESTSESSION


Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
