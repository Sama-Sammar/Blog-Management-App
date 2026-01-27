📝 Blog Management Application
A simple blog management system built with React, allowing users to view, add, edit, and delete blogs with form validation, pagination, internationalization, and API-based data handling.

🚀 Features
View blogs with pagination (6 blogs per page)
Add new blog with full form validation (Yup + React Hook Form)
Edit existing blogs
Delete blogs
Dynamic page title based on route
Global loader handling using Redux
Blogs fetched from JSON Server (Mock REST API)
Supports i18n (English / Arabic)
Full RTL/LTR support using PostCSS RTL

🛠️ Technologies Used
React
React Router DOM (Loaders & Actions)
React Hook Form + Yup
Redux Toolkit
JSON Server
i18next (i18n)
PostCSS RTL
Vite

📄 Pages
🏠 Home Page
Displays list of blogs fetched from API
Pagination (Next / Previous)
Edit & Delete actions for each blog
Dynamic page title: Home

➕ Add New Blog Page
Form with Title & Description
Validation using Yup
Submit button disabled until form is valid
Dynamic page title: Add New Blog

✏️ Edit Blog Page
Same page as Add Blog
Pre-filled form data loaded from API
Button label changes to Edit
Dynamic page title: Edit Blog

✅ Form Validation Rules
Title
English characters only (or Arabic when language is AR)
Max length: 50 characters
First letter must be capitalized (English)
No special characters (except spaces)

Description
English characters only (or Arabic when language is AR)
Max length: 1000 characters
No special characters (except spaces)
Validation is handled using Yup schema integrated with React Hook Form.

🔄 Blog Flow
Add Blog
User fills valid data
Clicks Add
Data sent to JSON Server
Redirected to Home Page
New blog appears on the first page

Edit Blog
User clicks Edit icon
Blog data loaded from API
User updates and submits
Blog updated and redirected back to Home Page

Delete Blog
User clicks Delete icon
Blog removed from JSON Server
Redirected back to the current page

⏳ Loader Management
Redux slice used to manage global loading state
Loader shown during async operations (fetch, add, edit, delete)
Loader hidden automatically after completion

🌍 Internationalization (i18n)
Supports English and Arabic
Dynamic language switch
Automatic RTL / LTR layout handling using PostCSS RTL

💾 Data Source
Blogs are served from JSON Server
Data stored in db.json
Acts as a mock REST API

📦 Installation & Run
Install dependencies
npm install

Run JSON Server
npm run server

Run the app
npm run dev

Make sure both servers are running simultaneously.

📌 Notes
React Router Loaders & Actions are used for data fetching and mutations
Clean and modular folder structure
No localStorage is used (API-based data handling)
Designed for learning modern React architecture