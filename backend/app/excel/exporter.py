from openpyxl import Workbook
from datetime import datetime
from io import BytesIO

def create_excel(roster_data: list[dict]) -> BytesIO:
    wb = Workbook()
    ws = wb.active
    ws.title = "Doctor Roster"

    # Headers
    ws.append(["Date", "Doctor", "Shift"])

    # Rows
    for entry in roster_data:
        ws.append([entry["date"], entry["doctor"], entry["shift"]])

    # Save to a BytesIO stream
    stream = BytesIO()
    wb.save(stream)
    stream.seek(0)
    return stream
