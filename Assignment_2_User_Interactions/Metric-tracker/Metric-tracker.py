import time
from selenium import webdriver
import collections 
import csv
def writeToCSV(filename : str, metrics : dict):
    with open(file=filename, mode="w", newline="") as fp:
    # Create a writer object
        writer = csv.DictWriter(fp, fieldnames=metrics.keys())

        # Write the header row
        writer.writeheader()

        # Write the data row
        writer.writerow(metrics)
def main():

    # Initialize browser
    driver = webdriver.Chrome()

    # Navigate to your website 
    driver.get("http://localhost:3000/")
    
    #INitialize varables
    metrics = collections.defaultdict(list)
    SAMPLE_SIZE = 2
    count = 0
    start_time = time.time()

    while count < SAMPLE_SIZE:#True: #presence_time < 50: # seconds
        # Track presence time 
        # start_time = time.time()
        # presence_time = start_time
        current_time = time.time()
        presence_time = current_time - start_time
        print(f"Presence time: {presence_time} seconds")
        metrics["Presence time (Seconds)"].append(presence_time)

        # Track scrolling
        scroll_height = driver.execute_script("return document.body.scrollHeight")  
        current_scroll = driver.execute_script("return window.pageYOffset")
        print(f"Scrolled {current_scroll}/{scroll_height} pixels")
        metrics["Scrolling (PIxels)"].append(current_scroll/scroll_height)

        count += 1
        time.sleep(2) 

        # Track clicks   
        # buttons = driver.find_elements_by_tag_name("button")
        # num_clicks = 0

        # for button in buttons:
        #     button.click()
        #     num_clicks += 1
        
        # print(f"Number of clicks: {num_clicks}")
        
    driver.quit()
    print(metrics)
    writeToCSV("metrics.csv", metrics)