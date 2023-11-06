# Image Gallery Server using Express and MongoDB

This repository contains an image gallery server built using Express.js and MongoDB, allowing functionalities such as uploading, updating, and deleting images. The server is deployed on Vercel at [https://image-gallery-server.vercel.app/](https://image-gallery-server.vercel.app/).

Below is an overview of the server's functionalities and how to run it locally.

## Prerequisites

To run this server, ensure you have Node.js and MongoDB installed.

## Setup

```plaintext
1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a `.env` file with the following environment variables:

   PORT=5000
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password

4. Start the server using `npm start`.
```

## Functionalities

### Uploading Image

- Endpoint: `/upload-image`
- Method: `POST`
- Description: Uploads an image to the database.

### Getting Gallery Images

- Endpoint: `/get-gallery-images`
- Method: `GET`
- Description: Retrieves all images from the database.

### Updating Selected Image

- Endpoint: `/update-selected-image/:id`
- Method: `PATCH`
- Description: Updates a selected image's status based on the provided ID.

### Unselecting All Images

- Endpoint: `/unselect-all-images`
- Method: `PATCH`
- Description: Changes the status of all selected images to unselected.

### Deleting Selected Images

- Endpoint: `/delete-selected-images`
- Method: `DELETE`
- Description: Deletes all images marked as selected.

## Sample Run

1. Ensure the server is running by checking the `GET /` endpoint.
2. Test the endpoints using tools like Postman or cURL.
