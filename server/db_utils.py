import sqlite3
import os
from typing import List
import json

db_name = "server/zoomclick.db"


def create_db():
    if os.path.exists(db_name):
        os.remove(db_name)
    return get_db_connection()


def get_db_connection():
    return sqlite3.connect(db_name)


def check_required_args(input_args, args: List[str]) -> bool:
    return all([arg in input_args for arg in args])


def post_insert(request, required_args: List[str], table: str) -> tuple:
    if check_required_args(request.json, required_args):
        values = ','.join([f'\'{request.json[arg]}\'' for arg in required_args])
        conn = get_db_connection()
        with conn:
            conn.cursor().execute(f'INSERT INTO {table} VALUES ({values})')
            return f'Successfully created {table}', 200
    else:
        return "Missing required parameters", 400


def get_select(request, where_fields: List[str], table: str) -> tuple:
    conn = get_db_connection()
    conn.row_factory = sqlite3.Row
    with conn:
        curr = conn.cursor()
        where_clause = ['1=1'] + [f'{field} = "{request.args[field]}"' for field in where_fields if field in request.args]
        where_clause = ' and '.join(where_clause)
        ret = json.dumps([dict(row) for row in curr.execute(f'SELECT * FROM {table} WHERE {where_clause}').fetchall()])
        return ret, 200
