# Start the Project

1. Sanity
  * create sanity project
  * clone project from https://github.com/IzzySato/serviceTemp_Sanity
  * open sanity project and sanity.json, update projectId
  * open Next project, .env.local update NEXT_PUBLIC_SANITY_PROJECT_ID
  * Sanity Studio create a token (under API) SANITY_STYLE_TOKEN
  * CLI: sanity install
  * CLI: sanity start
  * add business infomation

2. NEXT app
  * npm i
  * npm run dev
  * 

2. Google login
  * create a business
  * OAuth --> remember to add test user!
  * https://console.cloud.google.com
  * API & Services -> Credentials -> Create API key
  * Create ClientID and get Client ID and secret
  
3. Google Nodemailer
  * update env file
  * Create a new credential
  * https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/

4. Google RECAPTCHA
  * create project
  * https://www.google.com/recaptcha/admin/create
  * localhost

5. Deploy
  * remove git from the project
  * create a project in heroku
  * add config vars
  * follow the steps

  ## environment variables

  NEXT_PUBLIC_SANITY_DATASET=production
  NEXT_PUBLIC_SANITY_PROJECT_ID=[YOUR_SANITY_PROJECT_ID]
  SANITY_STYLE_TOKEN=[SANITY_TOKEN]

  NEXT_PUBLIC_RECAPTCHA_SITE_KEY=[YOUR_RECAPTCHA_SITE_KEY]
  RECAPTCHA_SECRET_KEY=[YOUR_RECAPTCHA_SECRET_KEY]

  GOOGLE_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID]
  GOOGLE_CLIENT_SECRET=[YOUR_GOOGLE_CLIENT_SECRET_KEY]

  MAIL_USERNAME=[YOUR_EMAIL_ADDRESS]
  MAIL_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID]
  MAIL_CLIENT_SECRET=[YOUR_GOOGLE_CLIENT_SECRET]
  MAIL_REFRESH_TOKEN=[YOUR_GOOGLE_REFRESH_TOKEN]
  TO_EMAIL=[YOUR_EMAIL_ADDRESS]
  FROM_EMAIL=[YOUR_EMAIL_ADDRESS]

