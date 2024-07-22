# Museum KHSU

This project is designed to create a digital exhibit of your university's museum. The web application allows users to explore the collections and exhibits of the museum through an interactive interface running on Node.js and Vue.js.

## Tech stack

- **Backend:** Node.js
- **Frontend:** Vue.js
- **Process Management:** PM2
- **Database:** MySQL (*-or MariaDB*)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure Node.js, npm, and PM2 are installed on your computer. You can also use nvm to manage Node.js versions.

```
# Install Node.js and npm
sudo apt update
sudo apt install nodejs npm

# Install PM2 globally
npm install pm2@latest -g

# Optional: Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
# Follow the instructions to update your shell environment
nvm install node # Install latest node
```

## Installation

### Clone the repository:

```
git clone https://github.com/arielen/museum.git
cd museum
```

### Install dependencies:

```
npm install
```

## Database Setup

1. **Create a MySQL database:**
    
    You can manually create a database named museum or run the provided script:

    ```
    node create_db.js
    ```
    Ensure the database connection parameters in your config file or environment variables match the following:

    - Host name/address: `127.0.0.1`
    - Port: `3306`
    - Maintenance database: `museum`
    - Username: `user`

2. **Migrate and Seed the Database:**

    Run the migration and seeding script to populate the database:

    ```
    node populate_db.js
    ```

## Running the Project

### Start the server using PM2:

```
pm2 start dist/server.js --name museum-server
pm2 save
```

### Access the application:

Open a web browser and navigate to:

```
http://127.0.0.1:3000/
```
