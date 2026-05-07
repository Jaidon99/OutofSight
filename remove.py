import sqlite3

# 1. This creates a database file named 'business.db' in your folder
connection = sqlite3.connect('business.db')
cursor = connection.cursor()

# 2. Create the Customers Table
cursor.execute('''
CREATE TABLE IF NOT EXISTS Customers (
    CustomerID INTEGER PRIMARY KEY AUTOINCREMENT,
    CompanyName TEXT,
    Email TEXT,
    Cell TEXT
)
''')

# 3. Create the Orders Table
cursor.execute('''
CREATE TABLE IF NOT EXISTS Orders (
    OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
    CustomerID INTEGER,
    Package TEXT
)
''')

# First, save the customer:
cursor.execute("INSERT INTO Customers (CompanyName, Email, Cell) VALUES ('Cool Tech LLC', 'hello@cooltech.com', '555-1234')")

# Get the ID of the customer we just created so we can link their order
new_customer_id = cursor.lastrowid 

# Now, save their order:
cursor.execute("INSERT INTO Orders (CustomerID, Package) VALUES (?, 'Platinum')", (new_customer_id,))

# Save changes and close
connection.commit()
connection.close()

print("Database created and new Platinum order saved successfully!")
