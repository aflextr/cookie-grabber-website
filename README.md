# 🍪 Cookie Grabber Website API

Cookie Grabber Website API is a lightweight and efficient service designed to extract cookies from a specified website. This API is particularly useful for developers who need to analyze cookies for security, debugging, or automation purposes.

## 📌 Features

- Fetch cookies from any specified website using a `POST` request.
- Uses a `token` for authentication to prevent unauthorized access.
- Returns cookies in a structured JSON format.
- Supports both HTTP and HTTPS requests.
- Built with security and efficiency in mind.

## 📜 API Documentation


### **Request Headers:**
| Header       | Type   | Required | Description                      |
|-------------|--------|----------|----------------------------------|
| `Content-Type` | String | ✅ Yes   | Must be `application/json`.  |


### **Request Body:**
| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `url`     | String | ✅ Yes   | The target website URL from which cookies will be fetched. |
| `token`   | String | ✅ Yes   | API token for authentication. (no token verification yet, just type “free”) |

### **Example Request (cURL)**

```bash
curl -X POST "https://api.example.com/api/v1/getcookie \
     -H "Content-Type: application/json" \
     -d '{
           "url": "https://targetsite.com",
           "token": "YOUR_SECRET_TOKEN"
         }'
