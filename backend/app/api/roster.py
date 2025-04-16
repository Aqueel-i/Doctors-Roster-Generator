from fastapi import APIRouter, Body
from typing import List
from datetime import date, timedelta
from app.utils.holiday_utils import get_sri_lankan_holidays
from fastapi.responses import StreamingResponse
from app.excel.exporter import create_excel

router = APIRouter()

@router.post("/generate-roster")
def generate_roster(
    doctors: List[str] = Body(..., embed=True),
    start_date: date = Body(..., embed=True),
    end_date: date = Body(..., embed=True)
):
    holidays = get_sri_lankan_holidays(start_date.year)
    num_days = (end_date - start_date).days + 1
    roster = []
    doctor_index = 0

    for i in range(num_days):
        current_date = start_date + timedelta(days=i)

        if current_date.weekday() >= 5:  # Skip Saturday/Sunday
            continue
        if current_date in holidays:  # Skip holidays
            continue

        doctor = doctors[doctor_index % len(doctors)]
        shift = "Morning" if i % 2 == 0 else "Evening"

        roster.append({
            "date": current_date.isoformat(),
            "doctor": doctor,
            "shift": shift
        })
        doctor_index += 1

    return {"roster": roster}

@router.post("/download-excel")
def download_roster_excel(
    doctors: List[str] = Body(..., embed=True),
    start_date: date = Body(..., embed=True),
    end_date: date = Body(..., embed=True)
):
    holidays = get_sri_lankan_holidays(start_date.year)
    num_days = (end_date - start_date).days + 1
    roster = []
    doctor_index = 0

    for i in range(num_days):
        current_date = start_date + timedelta(days=i)

        if current_date.weekday() >= 5 or current_date in holidays:
            continue

        doctor = doctors[doctor_index % len(doctors)]
        shift = "Morning" if i % 2 == 0 else "Evening"
        roster.append({
            "date": current_date.isoformat(),
            "doctor": doctor,
            "shift": shift
        })
        doctor_index += 1

    excel_file = create_excel(roster)
    filename = f"doctor_roster_{start_date}_{end_date}.xlsx"
    return StreamingResponse(
        excel_file,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )
