# Flights

A Fullstack Airport Viewer that allows a user to upload a CSV containing their favorite airports built with React and Ruby on Rails.

## Table of Contents 📖
* [General Info](#general-info-)
* [Built With](#built-with-%EF%B8%8F)
* [Features](#features-)
* [Screenshots](#screenshots-)
* [Setup](#setup-%EF%B8%8F)
* [Usage](#usage-)
* [Final Thoughts/Room for Improvement](#final-thoughtsroom-for-improvement-)

## General Info 📝
For simplicity, both the backend and front end will be contained in the same GitHub. If this were a larger project I would most definitely separate the Front and Backend.\
\
[Here is a link](DESIGN_DOC.pdf) to the design doc that helped guide me through the project.


## Built With ⚡️
Project is created with:
* Ruby version: 3.1.2
* Rails version: 7.0.4
* React version: 18.2.0

Gems:
* rack-cors

React Libraries:
* axios
* uuidv4

## Features 🎯
* Import CSV with aiport data
* Shareable public map

## Screenshots 📸
![Screenshot](\Screenshot29.png)
![Screenshot](\Screenshot30.png)
![Screenshot](\Screenshot31.png)
![Screenshot](\Screenshot32.png)
![Screenshot](\Screenshot33.png)
![Screenshot](\Screenshot34.png)

## Setup ⚙️
To clone and run this application, you'll need [Git](https://git-scm.com), [Ruby on Rails](https://www.tutorialspoint.com/ruby-on-rails/rails-installation.htm), and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.
```
# Clone this repository
$ git clone https://github.com/Nhendy12/flights.git

# Go into the repository
$ cd flights
```

## Usage 🚂

```bash
#for Backend

# to install all req'd dependencies
$ bundle install
# to make all database migrations
$ rake db:migrate
# start the local server (http://localhost:3000)
$ rails s

# for Frontend

# cd into frontend directory
$ cd flight-viewer  
# Install dependencies
$ npm install
# Run the app
$ npm start
```

## Final Thoughts/Things to tell Client 🔔

Possibly move to worker if files are too big


* 

