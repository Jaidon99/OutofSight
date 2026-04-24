import sqlite3

connection = sqlite3.connect('business.db')
cursor = connection.cursor()

# Ask the database for everything in the Customers table
cursor.execute("SELECT * FROM Customers")
rows = cursor.fetchall()

print("--- CUSTOMER LIST ---")
for row in rows:
    print(f"ID: {row[0]} | Company: {row[1]} | Email: {row[2]} | Cell: {row[3]}")

connection.close()