<a href="https://arctictype.vercel.app/">
    <h1>Arctictype</h1>
</a>

<p >
  Arctictype is typing simulator on which you can practise to increase your typing speed and compete with your freinds in realtime.
</p>

<ul>
<li><a href="#description"><strong>Description</strong></a></li>
<li><a href="#features"><strong>Features</strong></a></li>
<li><a href="#key-functionality"><strong>Key functionality</strong></a></li>
<li><a href="#running-locally"><strong>Running locally</strong></a></li>
<!-- <li></li> -->
</p>
</ul>

## Description

The project is implemented in a [TypeScript](https://www.typescriptlang.org/) environment. Frontend is hosted on [Vercel](https://vercel.com). Backend is hosted on [Render](https://render.com/) ( will switch to [Glitch](https://glitch.com/) to support wss connections ).

**Link:** [https://arctictype.vercel.app/](https://arctictype.vercel.app/)

<!-- <img width="1392" alt="clumsy-keys website base image" src="https://github.com/korebhaumik/Clumsykeys/assets/106856064/529757ae-e126-45c7-94de-0d79b854f3e6"> -->

## Features

- [Nextjs 13](https://nextjs.org/) (App Router)
- [Typescript](https://www.typescriptlang.org/) for reliable and fast development
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) for State Management
- [Mongodb](https://www.mongodb.com/) to store all test and user the data.
- [Supabase Database](https://supabase.com/docs/guides/database/overview) Realtime Postgresql database to maintain statefullness in the realtime channels.
- [Supabase Realtime](https://supabase.com/docs/guides/realtime) for the realtime features.
  - Will be switching to custom written [Socket.io](https://socket.io/) server to increase functionality and flexibility. )
  - This is due to the fact that in supabase realtime services i dont have a backend. The states are maintained on the client side. Only data can be emitted and consumed by clients. This causes a HUGE problem of concurrency (realtime database is also used to tackle this issue to some extent) and data processing. I mean supabases realtime services were not meant to be used in this way.
- [Recharts](https://recharts.org/en-US/) for the visualizations.
- [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) for auth.
- User Interface and Experience
  - Design is built from scratch using [Figma](https://www.figma.com/file/jUopU0nUrYEcxZtcCTdqxg/typing?type=design&node-id=0%3A1&mode=design&t=qXZ2ZFJC1K4fpvhz-1)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Icons from [everywhere](https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif)

### Future scope😊

- [Github OAuth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps), [Google OAuth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) for authentication and authorizing users.
- [Socket.io](https://socket.io/) for wss server.
- zen mode
- <strong>Ui improvements</strong>

## Key Functionality

- Robust calculation of Typing speed (wpm) and accuracy of a test.
- Get different formats of practice text ( with punctuations, special characters and numbers ).
- Chart to visualize your typing speed, accuracy and errors over time.
- Store your test results and flex your speed the leaderboard.

Support for the following languages are currently available:

1. English_1K
2. English_5K
3. Web Dev (😁)
4. Code Python

## Running locally

You will need to have the necessary environment variables setup in your `.env` files.

```bash
# ./server/.env
MODE =
PORT =
PRIVATE_KEY =
PRIVATE_REFRESH_KEY =
SALTROUNDS =
DBURI = # mongodb Data uri
```

```bash
# ./client/.env.local
NEXT_PUBLIC_SERVER_URL = # 2local backend api link. eg: if your ./server/.env has PORT = 3001 then (http/https)://(ipAddress/domain):3001 
NEXT_PUBLIC_SUPABASE_PROJECT_ID =
NEXT_PUBLIC_SUPABASE_PROJECT_URL =
NEXT_PUBLIC_SUPABASE_PROJECT_API_KEY =
```

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your authentication provider accounts.

1. Install run: `pnpm i` in `./client` and `./server`
2. Make repective `.env` file and poopulate.
3. Populate the `.env` file with the necessary environment variables.
4. run `pnpm run dev` in `./client` and `./server`



Website should now be running on [localhost:3000](http://localhost:3000/).

<!-- ## Running the docker

```bash
docker login
docker pull korebhaumik/clumsy-keys.
docker run -env-file .env -p 3000:3000 korebhaumik/clumsy-keys
```
-->

<!-- > Note: If the docker image is not available (repo is privated), you can build it locally by running `docker build -t clumsy-keys.` in the root directory of the project. -->
