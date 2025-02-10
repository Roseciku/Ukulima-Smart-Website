# Ukulima Smart

## Overview
Ukulima Smart is a web platform designed to connect farmers directly with consumers, eliminating middlemen and reducing post-harvest losses, hence improving farmers' livelihood through increased income. The platform allows farmers to list their produce, and consumers can directly contact farmers for purchasing. Additionally, transport providers can offer their services to facilitate the delivery of goods. Ukulima Smart also enforces comprehensive policies to guide and protect farmers, consumers, and transport providers from fraudulent activities, ensuring a secure and trustworthy marketplace.

## Features
- Farmers can list their produce with details such as quantity, price, and description.
- Consumers can browse available produce and contact farmers directly.
- Transport providers can offer their services to help with the delivery of goods.
- Review system for consumers to rate and review farmers.
- Market price integration to ensure fair pricing and avoid undercutting.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Roseciku/Ukulima-Smart-Website.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Ukulima Smart
    ```
3. Initialize your backend:
    ```bash
    npm init -y
    ```
4. Install dependencies that are in the package.json:
    ```bash
    npm install
    ```
5. Set up the environment variables:
    Create a `.env` file in the root directory and add your database configuration:
    ```plaintext
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    PORT= 4000
    ```
6. Install nodemon:
    ```bash
    npm install -g nodemon 
    ```
7. Start the server:
    ```bash
    nodemon server.js
    ```

## Usage
Once the server is running, you can access the website at `http://localhost:4000`.

### Features in Progress
- **Farmer's Dashboard**: Allowing farmers to see all their listed produce on their dashboard and making the page responsive and appealing. This    feature is still under development.
- **Transport Provider Dashboard**: Creating a dedicated dashboard for transport providers to manage their services.
- **Market Price Integration**: Ensuring farmers cannot list prices below the market value by integrating market price data into the website.
--**Review System**: Ensuring customers can rate and review farmers and transport providers hence promoting honesty.

## Contributing
Contributions are welcome! If you have suggestions for improving the project, please fork the repository and create a pull request. You can also open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b newFeatures`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin newFeatures`)
5. Open a Pull Request


## Contact
Github profile:  [https://github.com/Roseciku] 

Email: [rosecikumary@gmail.com]

Project Link: [https://github.com/Roseciku/Ukulima-Smart-Website.git]
