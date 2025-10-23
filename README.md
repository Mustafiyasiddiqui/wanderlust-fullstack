Wanderlust ✈️

A travel booking web app inspired by Airbnb. Browse, book, and review unique stays around the world. Built with Node.js, Express, MongoDB, and EJS.

Live Demo:- https://wanderlust-fullstack-3bkt.onrender.com

Features

🔑 User authentication (sign up / login)

🏠 Add, edit, delete listings with categories

⭐ Reviews and ratings for listings

🖼 Image uploads with Cloudinary

📱 Responsive design with Bootstrap

🗂 MVC architecture for modular code

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Frontend: EJS, Bootstrap

File Storage: Cloudinary

Installation
git clone <repo-url>
cd wanderlust
npm install


Create a .env file with:

ATLASDB_URL=<your-mongodb-atlas-connection-string>
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
SESSION_SECRET=<secret>


Run locally:

npm start
