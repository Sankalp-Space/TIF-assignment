# Tne Internet Folks Assignment for Backend Developer Internship 

[![Built with Love (and copious amounts of caffeine)](https://img.shields.io/badge/built%20with-love%20%26%20%E2%98%B9-ff69b4.svg)](https://github.com/your-github-handle)
[![Powered by Node.js (because JavaScript is everywhere, even in your dreams)](https://img.shields.io/badge/powered%20by-Node.js-green.svg)](https://nodejs.org/)
[![MongoDB Inside (the NoSQL heart)](https://img.shields.io/badge/MongoDB-Goes%20Brrr-orange.svg)](https://www.mongodb.com/)



## What Sorcery Does It Perform? 

This backend, crafted with the mystical arts of Node.js, MongoDB, and a pinch of Snowflake ID generation, handles all the heavy lifting for our community platform. It lets users:

* **Become a User:** Sign up with a name, email, and a password strong enough to ward off digital goblins.
* **Remember Their Spells:** Sign in with their credentials (hopefully they didn't forget!).
* **See the Realm:** View all the existing communities (no secret societies here, mostly).
* **Forge Their Own Realm:** Create new communities, becoming the all-powerful admin (cue dramatic thunder).
* **Know the Inhabitants:** See who's hanging out in each community.
* **Invite New Souls:** Add other users as members (no summoning rituals required, just a POST request).
* **Banish the Unwanted:** Remove members (sometimes you just need to prune the digital garden).

## The Sacred Scrolls (API Endpoints) 📜

Here's a peek into the incantations (API endpoints) you can use:

### Authentication (`/v1/auth`)

* `POST /signup`: For new users to join our magical world.
* `POST /signin`: For existing users to log back in and continue their quest.
* `GET /me`: To see the profile of the currently logged-in hero (you ).

### Community (`/v1/community`)

* `POST /`: To create a brand new digital village.
* `GET /`: To gaze upon all the existing villages.
* `GET /:id/members`: To see who the cool kids are in a specific village.
* `GET /me/owner`: To see the villages you personally rule.
* `GET /me/member`: To see the villages where you're just a friendly face in the crowd.

### Role (`/v1/role`)

* `POST /`: To define new roles within the communities (like "Head Brewer" or "Chief Fire Tender").
* `GET /`: To list all the available roles.

### Member (`/v1/member`)

* `POST /`: To invite someone to join a community.
* `DELETE /:id`: To politely (or not so politely) remove a member.

## The Ancient Artifacts (Models) 🏺

Our digital world is built upon these fundamental structures:

* **User:** Holds the essence of each user (name, email, password, etc.).
* **Community:** Represents a user-created gathering (name, slug, owner).
* **Role:** Defines the permissions within a community (e.g., "Admin", "Member").
* **Member:** Links a user to a community with a specific role.

## How to Unleash the Magic (Running Locally) 

1.  Clone this repository (if you haven't already).
2.  Install the necessary spells (dependencies): `npm install`
3.  Set up your MongoDB realm (make sure MongoDB is running).
4.  Whisper the magic words to start the server: `npm run dev` (or whatever your start script is).

Now you can use your favorite API testing wand (like Postman or `curl`) to interact with the endpoints above.


