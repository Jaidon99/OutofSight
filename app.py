from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app) # This lets your HTML talk to your Python

# Initialize the database
def init_db():python app.py
    conn = sqlite3.connect('business.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client TEXT,
            email TEXT,
            cell TEXT,
            package TEXT,
            notes TEXT,
            status TEXT DEFAULT 'Pending'
        )
    ''')
    conn.commit()
    conn.close()

# The "Receiver" (For the Landing Page)
@app.route('/add_order', methods=['POST'])
def add_order():
    data = request.json
    conn = sqlite3.connect('business.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO Orders (client, email, cell, package, notes)
        VALUES (?, ?, ?, ?, ?)
    ''', (data['client'], data['email'], data['cell'], data['package'], data['notes']))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"}), 201

# The "Sender" (For your Dashboard)
@app.route('/get_orders', methods=['GET'])
def get_orders():
    conn = sqlite3.connect('business.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Orders ORDER BY id DESC")
    rows = cursor.fetchall()
    orders = [dict(row) for row in rows]
    conn.close()
    return jsonify(orders)

if __name__ == '__main__':
    init_db()
    print("🚀 Server is live! Listening for orders...")
    app.run(debug=True, port=5000)