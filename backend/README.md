
# ViralVideoWhisperer Backend

This is the Flask backend for the ViralVideoWhisperer application. It provides the API for user authentication, video analysis, and admin functionality.

## Setup

1. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

The server will start at http://localhost:5000.

## API Endpoints

### Authentication
- POST `/api/auth/login` - Login with username and password
- POST `/api/auth/register` - Register a new user

### Videos
- GET `/api/videos` - Get videos (filter by user_id as query parameter)
- POST `/api/videos` - Create a new video analysis
- DELETE `/api/videos/<video_id>` - Delete a video

### Admin
- GET `/api/admin/users` - Get all users (admin only)
- DELETE `/api/admin/users/<user_id>` - Delete a user (admin only)
- GET `/api/admin/videos` - Get all videos (admin only)

## Mock Users

Two mock users are created automatically:
- Username: "muser", Password: "muser", Role: "user"
- Username: "mvc", Password: "mvc", Role: "admin"
