import requests
from ics import Calendar
from datetime import date

HOLIDAY_CALENDAR_URL = "https://calendar.google.com/calendar/ical/en.lk%23holiday%40group.v.calendar.google.com/public/basic.ics"

def get_sri_lankan_holidays(year: int) -> set[date]:
    response = requests.get(HOLIDAY_CALENDAR_URL)
    response.raise_for_status()

    calendar = Calendar(response.text)
    holidays = set()

    for event in calendar.events:
        if event.begin.year == year:
            holidays.add(event.begin.date())

    return holidays
