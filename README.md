FAQ Application
### A simple FAQ application built using Node.js, Express, MongoDB, and AdminJS. The app allows users to add, view, and translate FAQs. It also includes an admin interface for managing the FAQ content.

### Table of Contents

### 1.Installation Steps
### 2.API Usage Examples
### 3.Accessing the Admin Panel
### 4.Running Tests
### 5.Contribution Guidelines

### Installation Steps
### Follow these steps to set up the project locally:

### Prerequisites
### Ensure you have the following installed:
### Node.js (Recommended version: v16.x or v18.x)
### MongoDB (Local or Cloud instance)
### Redis (Optional - for caching translations)

### 1. Clone the Repository
### Clone the project from GitHub: git clone https://github.com/Tiru2167/faq-translator

### 3. Install Dependencies
### Navigate to the project folder and install the required dependencies: npm install

### 3. Configure Environment
### Before running the app, make sure to configure the following settings: MongoDB URI: Update your MongoDB connection string in the app.js file.
### Redis Settings: If using Redis, make sure the connection settings in app.js are correct (optional for caching translations).

### 5. Start the Application
### Run the app using the following command: npm start
### The application will be accessible at http://localhost:3000.

### API Usage Examples
### Base URL: http://localhost:3000

### 1. Add a New FAQ
### Endpoint: POST /add-faq
### Request Body:

### {
    "question": "What is your name?",
    "answer": "My name is Tirumala."
}
### Response: Success message (e.g., FAQ added successfully).

### 2. Get All FAQs
### Endpoint: GET /
### Response:

### [
###    {
        "_id": "60d5f484f1a2c8b1f8e4e1a1",
        "question": "What is your name?",
        "answer": "My name is Tirumala."
    }
### ]

### 3. Translate an FAQ
### Endpoint: GET /translate/:faqId/:lang
### Parameters:
### faqId: The ID of the FAQ to translate.
### lang: The target language code (e.g., hi for Hindi, es for Spanish).

### Example: curl http://localhost:3000/translate/60d5f484f1a2c8b1f8e4e1a1/hi
### Response:

### {
    "question": "आपका नाम क्या है?",
    "answer": "मेरा नाम तिरुमला है।"
}

### Accessing the Admin Panel
### The Admin Panel, powered by AdminJS, can be accessed at the following URL:

### http://localhost:3000/admin

### In the Admin Panel, you can:

### View all FAQs.
### Add FAQs.

### Running Tests
### You can run the application's tests using the following command: npm test

### Contribution Guidelines

### git init
### git status
### git checkout -b develop
### git add .
### git commit -m "feat: Add FAQ translation functionality"
### git remote add origin https://github.com/Tiru2167/faq-translator.git
### git push --set-upstream origin develop
