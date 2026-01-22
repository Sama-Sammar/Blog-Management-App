📝 Blog Management Application
A simple blog management system built with React, allowing users to view, add, edit, and delete blogs with form validation, pagination, and state management.

🚀 Features
- View blogs with pagination (6 blogs per page)
- Add new blog with full form validation
- Edit existing blogs
- Delete blogs
- Dynamic page title based on route
- Loader handling using Redux
- Blogs stored in Local Storage
- Supports i18n and RTL layout using PostCSS

🛠️ Technologies Used
React,React Router DOM,React Hook Form,Redux Toolkit,Local Storage,i18n,PostCSS RTL

📄 Pages
🏠 Home Page
Displays list of blogs
Pagination (Next / Previous)
Edit & Delete actions for each blog
Dynamic title: Home

➕ Add New Blog Page
Form with Title & Description
Validation using React Hook Form
Button disabled until form is valid
Dynamic title: Add New Blog

✏️ Edit Blog Mode
Same page as Add Blog
Pre-filled form data
Button label changes to Edit Blog
Dynamic title: Edit Blog

✅ Form Validation Rules
- Title:
English characters only
Max length: 50
First letter must be capitalized
No special characters (except spaces)
- Description:
English characters only
Max length: 1000
No special characters (except spaces)
- And same for Arabic

🔄 Blog Flow
Add Blog
User fills valid data
Clicks Add Blog
Redirected to Home Page
New blog appears at the top (first page)
Edit Blog
Click edit icon on blog card
Form opens with existing data
User edits and submits
Blog updated and redirected to Home Page
Delete Blog
Removes blog from list and local storage

⏳ Loader Management
Redux slice used to manage loading state
Loader shown during async operations
Loader hidden on success or failure

💾 Local Storage
Blogs are persisted using Local Storage
Data remains after page refresh

📦 Installation & Run
npm install
npm start

📌 Notes
React Router Loaders used for fetching blogs
Clean and modular code structure
User-friendly UI with smooth navigation