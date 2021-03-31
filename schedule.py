#this script manages to schedule database for individual hospitals.
#in order for this script to work, the first column must be the name of doctors, and every column afterwards must be if the doctor is free from 8 AM to 6 PM

import gspread

def check_value_exist(t_dict, value):
    do_exist = False
    for key, val in t_dict.items():
        if val == value:
            do_exist = True
    return do_exist

def check_schedule(t_dict, value):
    free = [t_dict.get('Doctor')]
    for key, val in t_dict.items():
        if val == value:
           free += [key] 
    return free 

gc = gspread.service_account(filename='creds.json')

sh = gc.open_by_key('1xw67uDo0AhYi9Ho7a7Eoq_qYVxk34ZPuzItjIOFipDY')
wks = sh.sheet1
res = wks.get_all_records()
#res is a list of dictionaries that holds all of the data of the spreadsheet.
appointments = []
for i in res:
    if check_value_exist(i, 'FREE'):
        appointments += [check_schedule(i, 'FREE')]

print(appointments)
#now we have a list of lists, where the first index is the doctor and the
#rest of the indices are all of the free times for that doctor.

        
