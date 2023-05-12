<?php
// Check if the picture was uploaded successfully
if ($_FILES["picture"]["error"] == UPLOAD_ERR_OK) {
  // Get the file name and extension
  $file_name = basename($_FILES["picture"]["name"]);
  $file_extension = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

  // Generate a unique file name
  $unique_file_name = uniqid() . "." . $file_extension;

  // Save the uploaded file to the server
  move_uploaded_file($_FILES["picture"]["tmp_name"], "uploads/" . $unique_file_name);

  // Return a success response
  echo "Picture uploaded successfully!";
} else {
  // Return an error response
  echo "Picture upload failed!";
}
