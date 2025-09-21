
import subprocess
import time
import os

def launch_and_execute():
    # Replace 'your_app.exe' with the actual name of your executable app
    app_path = '../../Back/ScriptStoreAPI/bin/Release/net8.0/ScriptStoreAPI.exe'
    
    # Replace '/path/to/your/directory' with the actual path of your desired directory
    directory_path = '../../Front/zodle'

    try:
        current_directory = os.getcwd()
        app_path = os.path.join(current_directory, app_path)
        directory_path = os.path.join(current_directory, directory_path)
        
        # Launch the executable app
        subprocess.Popen(app_path, shell=True)

        # Wait for 3 seconds
        time.sleep(3)

        # Change the current working directory to the specified directory
        os.chdir(directory_path)

        # Execute the "npm start" command
        subprocess.Popen('npm start', shell=True)

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    launch_and_execute()