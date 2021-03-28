import gspread
print("getting service account")
gc = gspread.service_account(filename='creds.json')

print("opening sheet")
sh = gc.open_by_key('1xw67uDo0AhYi9Ho7a7Eoq_qYVxk34ZPuzItjIOFipDY')
print("setting sheet")
wks = sh.sheet1
print("worksheet.getallrecords")
res = wks.get_all_records()
print("printing")
print(res)
