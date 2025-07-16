// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// const Listing = require("../models/listing.js"); 
// const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
// const listingController = require("../controllers/listings.js");

// const multer = require("multer"); 
// const upload = multer({ dest: "uploads/" });


// // ✅ INDEX Route
// router
//   .route("/")
//   .get(wrapAsync(listingController.index))
//   .post(
//     upload.single("listing[image]"),
//     (req, res) => {
//       res.send(req.file); 
//   });


// // ✅ NEW Route (form)
// router.get("/new", isLoggedIn, listingController.renderNewform);

// // ✅ CREATE + LISTING
// // router.route() helps group all actions (like GET, POST, PUT, DELETE) for the same path,
// // which keeps the code clean and well-organized.

// router
//   .route("/")
//   .post(
//     isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createListing)
//   );

// // ✅ SHOW + UPDATE + DELETE (/:id)
// router
//   .route("/:id")
//   .get(wrapAsync(listingController.showListing))              // Show
//   .put(
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing)
//   )                                                           // Update
//   .delete(
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.deleteListing)
//   );                                                          // Delete

// // ✅ EDIT form
// router.get(
//   "/:id/edit",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.renderEditForm)
// );

// module.exports = router;

//===========================================================================================================================================================

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// ✅ Corrected Routes
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

router.get("/new", isLoggedIn, listingController.renderNewform);

router.get("/:id", wrapAsync(listingController.showListing));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
);

router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;
