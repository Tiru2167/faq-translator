# FAQ Application

A simple FAQ application built with Node.js, Express, MongoDB, and AdminJS for managing FAQs. This application allows users to add, view, and translate FAQs, and provides an admin interface for managing the content.

## Table of Contents

- [Installation Steps](#installation-steps)
- [API Usage Examples](#api-usage-examples)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

## Installation Steps

Follow these steps to set up the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or v18.x recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Redis](https://redis.io/) (optional, for caching translations)

### npm install

## Run app
## npm start

## API Usage Examples

## url:http://localhost:3000

## Add a New FAQ
Endpoint: POST /add-faq
req body:
{
    "question": "What is your name?",
    "answer": "My name is ChatGPT."
}

## Get All FAQs
Endpoint: GET /

Response:
[
    {
        "_id": "60d5f484f1a2c8b1f8e4e1a1",
        "question": "What is your name?",
        "answer": "My name is ChatGPT."
    }
]

## Translate an FAQ
Endpoint: GET /translate/:faqId/:lang

Parameters:

faqId: The ID of the FAQ to translate.
lang: The target language code (e.g., hi for Hindi).

Response:
{
    "question": "आपका नाम क्या है?",
    "answer": "मेरा नाम चैटजीपीटी है।"
}

## Access the Admin Panel
## http://localhost:3000/admin

## Run tests
  npm test


### Clone the Repository

```bash
git clone https://github.com/yourusername/faq-app.git
cd faq-app