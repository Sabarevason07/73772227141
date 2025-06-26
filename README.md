# 🔗 React URL Shortener

A simple React app to shorten URLs using custom codes and expiry time. This is a **frontend-only project** that uses `localStorage` to simulate a backend.

---

## ✨ Features

- Add multiple URL entries dynamically
- Assign custom shortcode (or auto-generate)
- Set expiry time in minutes
- Generates clickable shortened URLs
- Redirect using the shortcode (e.g. `/openai`)
- Data stored in `localStorage`

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/url-shortener-react.git
cd url-shortener-react
```

### 2. Install dependencies

```bash
npm install
```

> Also install Material UI icons:

```bash
npm install @mui/icons-material
```

### 3. Start the app

```bash
npm start
```

---

## 🧠 How It Works

- Enter a long URL, optional shortcode, and expiry.
- Click "Shorten URLs".
- The app generates links like:
  ```
  http://localhost:3000/yourcode
  ```
- Visiting that link will redirect to the original URL (if not expired).

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── URLShortener.jsx      # Main form logic and output
│   └── RedirectHandler.jsx   # Handles redirection
├── middleware/
│   └── LoggerProvider.jsx    # Console logger
├── App.jsx                   # Routes
└── index.js                  # Entry point
```

---

## 📌 Notes

- This is a **mock/demo project**, no backend is connected.
- All data is cleared when you clear your browser storage.

---

## 📃 License

This project is open source and free to use.
## Mobilw View
![image](https://github.com/user-attachments/assets/935ed4a3-adcf-4e6f-9326-2dd0debb99c7)
## Desktop View
![image](https://github.com/user-attachments/assets/b1b5ec69-ddab-4539-a24a-80920808ed1b)



