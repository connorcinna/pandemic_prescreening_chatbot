import gspread
from google.oauth2 import service_account 
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
#scope = ['https://www.googleapis.com/auth/spreadsheets']
#scope = ["https://spreadsheets.google.com/feeds",'https://www.googleapis.com/auth/spreadsheets',"https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive"]
gc = gspread.service_account()
#SERVICE_ACCOUNT_FILE = 'creds.json'
#creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=scope)
#client = gspread.authorize(creds)
#sheet = gc.open("ClinicSchedule")
sheet = gc.open_by_url('https://docs.google.com/spreadsheets/d/1xw67uDo0AhYi9Ho7a7Eoq_qYVxk34ZPuzItjIOFipDY/edit#gid=0')
work = sheet.worksheet('ClinicSchedule')
data = work.get_all_records()
print(data)
