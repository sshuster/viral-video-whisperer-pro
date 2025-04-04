
import sqlite3
import os
from flask import Flask, request, jsonify, g
from flask_cors import CORS
import json
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import datetime

app = Flask(__name__)
CORS(app)

# Database setup
DATABASE = "viral_videos.db"

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    """Initialize the database with tables and mock data"""
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()
        
        # Add mock users
        mock_users = [
            {
                "username": "muser",
                "password": generate_password_hash("muser"),
                "name": "Mock User",
                "role": "user"
            },
            {
                "username": "mvc",
                "password": generate_password_hash("mvc"),
                "name": "Admin User",
                "role": "admin"
            }
        ]
        
        for user in mock_users:
            db.execute(
                "INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)",
                (user["username"], user["password"], user["name"], user["role"])
            )
        
        db.commit()

# Authentication routes
@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        db = get_db()
        user = db.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
        
        if user and check_password_hash(user['password'], password):
            return jsonify({
                'id': user['id'],
                'username': user['username'],
                'name': user['name'],
                'role': user['role']
            }), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        name = data.get('name')
        
        db = get_db()
        existing_user = db.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
        
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 409
        
        # Hash the password
        hashed_password = generate_password_hash(password)
        
        # Insert the new user
        db.execute(
            'INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)',
            (username, hashed_password, name, 'user')
        )
        db.commit()
        
        # Get the newly created user
        user = db.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
        
        return jsonify({
            'id': user['id'],
            'username': user['username'],
            'name': user['name'],
            'role': user['role']
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Video routes
@app.route('/api/videos', methods=['GET'])
def get_videos():
    try:
        user_id = request.args.get('user_id')
        
        db = get_db()
        query = 'SELECT * FROM videos'
        params = ()
        
        if user_id:
            query += ' WHERE user_id = ?'
            params = (user_id,)
            
        videos = db.execute(query, params).fetchall()
        
        result = []
        for video in videos:
            # Parse the suggestions and metrics from JSON strings
            suggestions = json.loads(video['suggestions'])
            metrics = json.loads(video['metrics'])
            
            result.append({
                'id': video['id'],
                'user_id': video['user_id'],
                'url': video['url'],
                'platform': video['platform'],
                'description': video['description'],
                'timestamp': video['timestamp'],
                'suggestions': suggestions,
                'metrics': metrics
            })
        
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/videos', methods=['POST'])
def create_video():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        url = data.get('url')
        platform = data.get('platform')
        description = data.get('description', '')
        
        # Simulate AI analysis
        suggestions = [
            "Add trending hashtags like #viral #trending #explore",
            "Shorten the intro to 3 seconds to improve retention",
            "Add text overlays to make it more engaging",
            "Use more vibrant color grading to stand out in feeds",
            "Add a hook in the first 5 seconds to capture attention"
        ]
        
        metrics = {
            "engagement": 75,
            "retention": 68,
            "shareability": 82,
            "overall": 72
        }
        
        timestamp = datetime.datetime.now().isoformat()
        
        db = get_db()
        db.execute(
            'INSERT INTO videos (user_id, url, platform, description, timestamp, suggestions, metrics) VALUES (?, ?, ?, ?, ?, ?, ?)',
            (user_id, url, platform, description, timestamp, json.dumps(suggestions), json.dumps(metrics))
        )
        db.commit()
        
        # Get the newly created video
        video_id = db.execute('SELECT last_insert_rowid()').fetchone()[0]
        video = db.execute('SELECT * FROM videos WHERE id = ?', (video_id,)).fetchone()
        
        return jsonify({
            'id': video['id'],
            'user_id': video['user_id'],
            'url': video['url'],
            'platform': video['platform'],
            'description': video['description'],
            'timestamp': video['timestamp'],
            'suggestions': json.loads(video['suggestions']),
            'metrics': json.loads(video['metrics'])
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/videos/<int:video_id>', methods=['DELETE'])
def delete_video(video_id):
    try:
        db = get_db()
        video = db.execute('SELECT * FROM videos WHERE id = ?', (video_id,)).fetchone()
        
        if not video:
            return jsonify({'error': 'Video not found'}), 404
        
        db.execute('DELETE FROM videos WHERE id = ?', (video_id,))
        db.commit()
        
        return jsonify({'message': 'Video deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Admin routes
@app.route('/api/admin/users', methods=['GET'])
def get_users():
    try:
        db = get_db()
        users = db.execute('SELECT id, username, name, role FROM users').fetchall()
        
        result = []
        for user in users:
            # Count videos for each user
            videos_count = db.execute('SELECT COUNT(*) FROM videos WHERE user_id = ?', (user['id'],)).fetchone()[0]
            
            result.append({
                'id': user['id'],
                'username': user['username'],
                'name': user['name'],
                'role': user['role'],
                'videosSubmitted': videos_count,
                'joinDate': '2023-12-31T00:00:00Z'  # Placeholder date
            })
        
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        db = get_db()
        user = db.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Delete the user's videos first to maintain referential integrity
        db.execute('DELETE FROM videos WHERE user_id = ?', (user_id,))
        # Then delete the user
        db.execute('DELETE FROM users WHERE id = ?', (user_id,))
        db.commit()
        
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/videos', methods=['GET'])
def get_all_videos():
    try:
        db = get_db()
        videos = db.execute('''
            SELECT v.*, u.username 
            FROM videos v 
            JOIN users u ON v.user_id = u.id
        ''').fetchall()
        
        result = []
        for video in videos:
            result.append({
                'id': video['id'],
                'user_id': video['user_id'],
                'username': video['username'],
                'url': video['url'],
                'platform': video['platform'],
                'description': video['description'],
                'timestamp': video['timestamp'],
                'suggestions': json.loads(video['suggestions']),
                'metrics': json.loads(video['metrics']),
                'status': 'active'  # Default status
            })
        
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the application
if __name__ == '__main__':
    # Create the database if it doesn't exist
    if not os.path.exists(DATABASE):
        init_db()
    
    app.run(debug=True, host='0.0.0.0', port=5000)
