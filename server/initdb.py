import sqlite3
import os


def create_db():
    if os.path.exists('zoomclick.db'):
        os.remove('zoomclick.db')
    return sqlite3.connect('zoomclick.db')


def create_user_table(conn) -> None:
    conn.execute('CREATE TABLE user (user_id INTEGER PRIMARY KEY, user_name TEXT, user_alias TEXT )')


def create_user_group_table(conn) -> None:
    conn.execute('CREATE TABLE user_group (group_id INTEGER PRIMARY KEY, group_name TEXT)')


def create_group_membership_table(conn) -> None:
    conn.execute('CREATE TABLE group_membership (group_id INTEGER, user_id INTEGER, '
                 'FOREIGN KEY (group_id) references user_group(group_id), FOREIGN KEY (user_id) references user(user_id))')


def create_meetings_table(conn) -> None:
    conn.execute('CREATE TABLE meeting (meeting_id TEXT, meeting_pw TEXT, '
                 'meeting_user_id INTEGER, FOREIGN KEY (meeting_user_id) REFERENCES user(user_id))')


def init_db() -> None:
    conn = create_db()
    create_user_table(conn)
    create_meetings_table(conn)
    create_user_group_table(conn)
    create_group_membership_table(conn)


if __name__ == '__main__':
    validation = input("This will delete and rebuild the database--do you want to proceed (y/n)?\n")
    if validation == 'y':
        init_db()
    else:
        print("Cancelling database initialization")
