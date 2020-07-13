import sqlite3
import os

def create_db():
    if os.path.exists('zoomclick.db'):
        os.remove('zoomclick.db')
    return sqlite3.connect('zoomclick.db')


def create_user_table(conn) -> None:
    conn.execute('CREATE TABLE users (name TEXT)')


def create_meetings_table(conn) -> None:
    conn.execute('CREATE TABLE meetings (user_name TEXT, meeting_id TEXT, meeting_pw TEXT)')


def init_db() -> None:
    conn = create_db()
    create_user_table(conn)
    create_meetings_table(conn)


if __name__ == '__main__':
    validation = input("This will delete and rebuild the database--do you want to proceed (y/n)?\n")
    if validation == 'y':
        init_db()
    else:
        print("Cancelling database initialization")
