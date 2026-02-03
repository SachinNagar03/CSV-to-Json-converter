# CSV-to-JSON Transformer – Frontend

This is the frontend part of the “CSV-to-JSON Live Transformer” application.
It is built using **Next.js (JavaScript)** with normal CSS and is optimized for
mobile-first usage.

---

## Overall Architecture & Assumptions

- The frontend is responsible for:
  - Allowing users to upload a CSV file
  - Sending the file to the backend via an API request
  - Receiving structured JSON from the backend
  - Rendering the JSON as a collapsible / expandable tree view
- The backend exposes a single API endpoint for CSV upload and JSON response
- The frontend assumes the backend returns valid structured JSON

---

## JSON Rendering Approach

- The JSON response is rendered using a **recursive React component**
- This approach allows rendering JSON of **any depth**
- Each object or array key can be expanded or collapsed
- Designed to be readable and usable on small (mobile) screens

---

## UI & UX Considerations

- Mobile-first layout
- Click/tap-based expand and collapse
- Simple styling using normal CSS
- Clear visual hierarchy for nested JSON keys

---

## Setup & Run Instructions

### Prerequisites
- Node.js (v18 or above recommended)
- npm or yarn

### Steps to Run Locally

1. Install dependencies :
   ```bash
   npm install
2. Install dependencies :
   ```bash
   npm run dev
3.Open the application in the browser :
   ```bash
   http://localhost:3000

Note: Ensure the backend server is running and accessible before uploading a CSV file.

