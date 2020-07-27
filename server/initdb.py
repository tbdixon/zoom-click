from db_utils import create_db, get_db_connection


def create_user_table() -> None:
    conn = get_db_connection()
    conn.execute('CREATE TABLE user (user_name TEXT PRIMARY KEY, user_alias TEXT )')
    conn.commit()
    conn.close()


def create_meetings_table() -> None:
    conn = get_db_connection()
    conn.execute('CREATE TABLE meeting (meeting_id TEXT, meeting_pw TEXT, '
                 'user_name TEXT, meeting_name TEXT, meeting_company TEXT, FOREIGN KEY (user_name) REFERENCES user(user_name))')
    conn.commit()
    conn.close()


def init_db() -> None:
    create_db()
    create_user_table()
    create_meetings_table()


if __name__ == '__main__':
    validation = input("This will delete and rebuild the database--do you want to proceed (y/n)?\n")
    if validation == 'y':
        init_db()
    else:
        print("Cancelling database initialization")
