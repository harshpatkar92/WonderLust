const Listing = require("../models/listing");

// 🌐 For geocoding using node-fetch (ESM compatible)
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// INDEX
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// SHOW
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// NEW FORM
module.exports.renderNewform = (req, res) => {
  res.render("listings/new.ejs");
};

// CREATE
module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  // 📍 Get coordinates via geocoding
  const fullLocation = `${req.body.listing.location}, ${req.body.listing.country}`;
  try {
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullLocation)}`
    );
    const geoData = await geoRes.json();
    if (geoData[0]) {
      newListing.geometry = {
        type: "Point",
        coordinates: [parseFloat(geoData[0].lon), parseFloat(geoData[0].lat)],
      };
    } else {
      // Fallback coordinates (Delhi)
      newListing.geometry = {
        type: "Point",
        coordinates: [77.2090, 28.6139],
      };
    }
  } catch (err) {
    console.error("Geocoding failed:", err.message);
    newListing.geometry = {
      type: "Point",
      coordinates: [77.2090, 28.6139],
    };
  }

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // 🖼️ For previewing image in edit form
  if (listing.image && listing.image.url) {
    listing.image.transformed = listing.image.url.replace(
      "/upload",
      "/upload/h_300,w_250"
    );
  }

  res.render("listings/edit.ejs", { listing });
};

// UPDATE
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
    runValidators: true,
  });

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  // 📍 Update coordinates if location/country changed
  const fullLocation = `${req.body.listing.location}, ${req.body.listing.country}`;
  try {
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullLocation)}`
    );
    const geoData = await geoRes.json();
    if (geoData[0]) {
      listing.geometry = {
        type: "Point",
        coordinates: [parseFloat(geoData[0].lon), parseFloat(geoData[0].lat)],
      };
    }
  } catch (err) {
    console.error("Geocoding update failed:", err.message);
  }

  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// DELETE ✅ FIXED
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
