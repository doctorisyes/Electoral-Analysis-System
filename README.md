<p align="center">
    <img src="resources/images/easLogo.png" style="width: 20vw">
</p>

<h3 align="center">Electoral Analysis System</h3>

<p align="center">
A Python-Flask web app for analysing elections.
</p>

## ❓ What is the EAS?
EAS is a web app that allows you to analyse elections with ease through our intuitive GUI. EAS automates the process of finding, calculating, abstracting and presenting graphical statistics.

EAS heavily relies on <a href="https://www.electionguide.org">ElectionGuide</a> to source its electoral information, and this project would not be possible without them.

I am planning to eventually deploy this web app on a Raspberry Pi server, but that will not happen untill the first prototype is complete.

This project also serves as my coursework for my OCR A Level Computer Science NEA, hence no one else can contribute to this project untill it is submitted to OCR. But of course, like all repositories be free to download and experiment with the EAS!

## 📋 Requirements
To install EAS you will need:
- Python v3 /w pip

During installation you will be able to automatically install your dependencies later.

## ⚙️ Installation
**At the time of writing the project is not launchable!**

To install EAS, clone the repository and run it in a Python virtual enviorment. (you may need to use "python3" as opposed to "python" depending on how Python is installed on your system)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/doctorisyes/Electoral-Analysis-System.git
   cd Electoral-Analysis-System
2. **Create and activate a virtual enviorment**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
3. **Install dependencies**

    ```bash
    pip install -r requirements.txt
4. **Run the program**

    ```bash
    python main.py
## 📦 Dependencies
The Python backend uses a multitude of dependencies:
- Flask
- Requests Library
- to be continued... (as project develops)

## 🤝 Contributing
Due to the nature of this project being my coursework, I cannot accept any contributions untill after the project is sent to OCR.

## ⚖️ License
This repository uses this licence: Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)
## 🧑‍💻 Author
**Samuel Douek** – [@justsamueld](https://github.com/doctorisyes)