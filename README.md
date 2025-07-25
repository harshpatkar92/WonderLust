# 🌍 Wanderlust - Travel Listing App

Wanderlust is a full-stack web application where users can create, edit, view, and delete travel listings with images, reviews, and location maps. It's inspired by platforms like Airbnb and integrates LeafletJS for dynamic maps and Cloudinary for image uploads.

---

## 🚀 Features

- ✨ Create, edit, and delete travel listings
- 📷 Image upload via Cloudinary
- 🖼️ Image preview in new/edit forms
- ✍️ Add and delete reviews with rating
- 🔐 Authentication & authorization middleware
- 🗺️ LeafletJS map integration for each listing
- 🌐 Geocoding using OpenStreetMap (Nominatim API)
- 📍 Coordinates stored in MongoDB for future use

---

## 🛠️ Tech Stack

**Frontend:**
- HTML, CSS, Bootstrap
- EJS (Embedded JavaScript Templating)
- Leaflet.js for maps

**Backend:**
- Node.js + Express
- MongoDB (Mongoose ODM)
- Multer for file handling
- Cloudinary for image storage

---

## 📦 NPM Package List

| Package | Purpose |
|---------|---------|
| `express` | Node.js web framework |
| `ejs` | Template engine for rendering HTML |
| `mongoose` | MongoDB ORM |
| `dotenv` | Environment variables |
| `method-override` | HTML form method override for PUT/DELETE |
| `connect-flash` | Flash messages (success/error) |
| `express-session` | Session handling (for authentication) |
| `passport` | Authentication middleware |
| `passport-local` | Local username/password strategy |
| `bcryptjs` | Password hashing |
| `multer` | Handle file uploads |
| `cloudinary` | Upload/store images to Cloudinary |
| `multer-storage-cloudinary` | Connect multer to Cloudinary |
| `joi` | Form/server-side validation |
| `nodemon` (--save-dev) | Auto-restart server during development |

### Installation Commands

```bash
# Install all dependencies
npm install express
npm install ejs
npm install mongoose
npm install dotenv
npm install method-override
npm install connect-flash
npm install express-session
npm install passport
npm install passport-local
npm install bcryptjs
npm install multer
npm install cloudinary
npm install multer-storage-cloudinary
npm install joi


# Install development dependencies
npm install --save-dev nodemon
```

---

## 🗃️ Project Structure

```
wanderlust/
│
├── 📁 controllers/
│   └── listings.js               # All controller functions (CRUD, geocoding, etc.)
│
├── 📁 models/
│   ├── listing.js                # Mongoose schema for listing
│   ├── reviews.js                # Mongoose schema for reviews
│   └── user.js                   # User schema for authentication
│
├── 📁 routes/
│   ├── listings.js               # All listing-related routes
│   └── reviews.js                # Review routes
│
├── 📁 public/
│   ├── 📁 js/
│   │   └── map.js                # Frontend Leaflet map logic
│   └── 📁 css/
│       └── style.css             # Custom styling (Bootstrap + custom)
│
├── 📁 views/
│   ├── 📁 listings/
│   │   ├── index.ejs            # Show all listings
│   │   ├── new.ejs              # Form to create listing
│   │   ├── edit.ejs             # Form to edit listing
│   │   └── show.ejs             # Show single listing with map and reviews
│   ├── 📁 partials/
│   │   ├── header.ejs           # Navbar, links, etc.
│   │   └── footer.ejs           # Footer section
│   └── 📁 layouts/
│       └── boilerplate.ejs      # Main layout template
│
├── 📁 init/
│   ├── data.js                  # Sample seed data for DB
│   └── index.js                 # Script to seed database with listings
│
├── 📁 utils/
│   └── wrapAsync.js             # Utility to wrap async middleware
│
├── 📁 middleware/
│   └── index.js                 # Custom middleware (auth, validation)
│
├── .env                         # Environment variables (e.g., CLOUDINARY_URL, DB_URL)
├── .gitignore                   # Ignore node_modules, .env, etc.
├── app.js                       # Main Express application setup
├── cloudConfig.js               # Cloudinary config with multer-storage
├── package.json                 # Project metadata and dependencies
└── README.md                    # Project overview
```

---

## 📝 Project Summary

**Tech Stack:** Node.js + Express + EJS + MongoDB + Cloudinary + Leaflet

**Project Goal:** A travel/accommodation listing platform (like Airbnb)

### Features Implemented:

- **Listing Management:** Create/edit with image upload (Cloudinary)
- **Image Handling:** Image preview before and after upload
- **CRUD Operations:** All CRUD operations for listings
- **Review System:** Reviews with ratings & delete functionality
- **Flash Messaging:** Success/error notifications
- **Map Integration:** LeafletJS for each listing
- **Geocoding:** Dynamic geocoding using OpenStreetMap API
- **Coordinates Storage:** Saved as `geometry: { type: "Point", coordinates: [lng, lat] }`

### Project Structure Highlights:

- **`controllers/listing.js`:** All listing logic (create, update, delete, map logic, geocoding)
- **`models/listing.js`:** MongoDB schema with Cloudinary image, location, and coordinates
- **`views/listings/`:** EJS templates: index.ejs, new.ejs, edit.ejs, show.ejs
- **`public/js/map.js`:** Custom frontend logic for LeafletJS map display
- **`middleware.js, app.js, routes/listings.js`:** Standard Express setup

🗺️ **Map Integration:** LeafletJS + Nominatim API for geocoding and map marker placement

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_key
   CLOUDINARY_SECRET=your_secret
   MONGODB_URL=your_mongodb_url
   SESSION_SECRET=your_session_secret
   ```

4. **Seed the database** (optional)
   ```bash
   node init/index.js
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.#   f i r s t f u l l s t a c k p r o j e c t  
 #   W o n d e r L u s t  
 