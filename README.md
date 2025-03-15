## Getting Started

First, run the development server: make sure to run `yarn install` first.

```bash
npm run dev
# or
yarn dev
```

## Change variables in constants.ts based on your needs.

Change appName, title, features, and youtubeVideoId.


## Add your google service account credentials to the .env file.

1. Create a new service account in the Google Cloud Console.
2. Create a new JSON key for the service account.
3. Add the JSON key to the .env file.
4. Create a new google sheet and add the service account to the sheet with an editor role.
5. Add the sheet id to the .env file.

the env file should look something like this:

```
GOOGLE_CLIENT_EMAIL=<your-service-account-email>
GOOGLE_PRIVATE_KEY=<your-private-key>
GOOGLE_SHEET_ID=<your-sheet-id>
```


