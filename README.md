# Package Management System for College

## Overview
This project is a **Package Management System** designed for colleges, built using **React** for the front end and **Node.js with MySQL** for the backend. The system enables students to track packages received in their name and allows administrators to manage package records efficiently.

The database is managed using **XAMPP**, which runs MySQL locally.

## Features
- **Admin Panel:** The admin can access the entire database, manage packages, and oversee user details.
- **Student Dashboard:** Students can view their packages by logging in with their credentials.
- **Package Management:** Receptionists can add, filter, and search packages based on student names and phone numbers.
- **User Authentication:** Secure login system for students and receptionists.
- **Search & Filtering:** Allows filtering packages based on student details for easy retrieval.
- **Unknown Packages Handling:** Packages without recipient details are stored separately until identified.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MySQL (Managed using XAMPP)
- **Authentication:** JWT (JSON Web Tokens)

## Installation & Setup
### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [XAMPP](https://www.apachefriends.org/) (for MySQL database)
- MySQL Workbench (Optional for database management)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/package-management-system.git
   cd package-management-system/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure the database:
   - Start MySQL in XAMPP
   - Import the provided SQL file (`database.sql`) into MySQL
   - Update `.env` file with your database credentials:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=
     DB_NAME=package_management
     JWT_SECRET=your_secret_key
     ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React application:
   ```sh
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- **Admin Login:** Admins can log in to view and manage all packages and users.
- **Receptionist Access:** Receptionists can add and search packages.
- **Student Access:** Students can log in to check their packages.

## Contributing
Feel free to fork this repository and submit pull requests with improvements.

## License
This project is licensed under the MIT License.

 

