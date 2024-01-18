# File Manager Application

This is a simple file manager application built using Node.js, PostgreSQL, and AWS S3. The application allows users to manage files and folders efficiently, with features such as folder creation, subfolder creation, file uploads to AWS S3, and file management.

## Features

- **User Registration and Login:** Secure user registration and login functionality to access the file manager.

- **Create Folder API:** API endpoint to create a new folder. Each folder has a unique name and is associated with the user who created it.

- **Create Subfolder API:** API endpoint to create a subfolder inside an existing folder. User permissions are verified to create subfolders in the given parent folder.

- **Upload Files API:** API endpoint to handle file uploads to the appropriate folders. Uploaded files are securely stored in an AWS S3 bucket, and metadata is recorded in the PostgreSQL database.

- **Manage Files API:** API endpoints to allow users to manage files within the file manager system, including renaming, moving, and deleting files.

## Getting Started

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/MayankMittal02/propacity.git
    cd propacity
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables:**

    Create a `.env` file in the project root and add the following variables:

    ```env
    PORT=3000
    PG_USER=your_postgres_user
    PG_HOST=your_postgres_host
    PG_DATABASE=your_postgres_database
    PG_PASSWORD=your_postgres_password
    PG_PORT=your_postgres_port
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    AWS_REGION=your_aws_region
    ```

4. **Run the Application:**

    ```bash
    node app.js
    ```

    The application will be running at http://localhost:5000.

## API Endpoints

- **User Registration:**
    - Endpoint: POST /user/register
    - Description: Register a new user.

- **User Login:**
    - Endpoint: POST /user/login
    - Description: Log in to the application.

- **Create Folder:**
    - Endpoint: POST /folders/createFolder
    - Description: Create a new folder.

- **Create Subfolder:**
    - Endpoint: POST /folders/createFolder/:parentFolderId
    - Description: Create a subfolder inside an existing folder.

- **Upload Files:**
    - Endpoint: POST /addfile/:parentFolderId
    - Description: Upload files to the appropriate folders.

- **Manage Files:**
    - Endpoint: PUT /files/:fileId
    - Description: Manage files, including renaming, moving, etc.

    - Endpoint: DELETE /files/:fileId
    - Description: Delete a file.
