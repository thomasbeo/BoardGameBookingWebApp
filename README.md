# BoardGameBookingWebApp
Instructions on how to run the web application:

We navigate to the path of our project which is: C:\web-app-dev\boardgame_booking and then we run the server file which initializes a connection and connects to our MongoDB Atlas database.

  <img width="400" height="70" alt="image" src="https://github.com/user-attachments/assets/271a6124-46f7-40bc-8816-10514cca21ca" />

Then we go to the browser to the url: http://localhost:3000 which leads us to the frontend page below:

<p align="center">
  <img width="1901" height="2433" alt="Image" src="https://github.com/user-attachments/assets/e2704117-bd71-45bf-ad89-75a8d841bc51" />
</p>

There are some facilities which the user selects one of them, then chooses one of the existing board games and makes a reservation. We will demonstrate how the reservation is made. On the top right corner there are 2 buttons named Login and Register. Initially the user clicks on Register and then a form appears with some fields to fill as it is shown below:

<p align="center">
  <img width="650" height="400" alt="Image" src="https://github.com/user-attachments/assets/cd65d71b-3bb4-4225-bbe9-4769839514fd" />
</p>

We click on the button named Create account and then the user is registered on our MongoDB Atlas database on the users field:   

<p align="center">
  <img width="650" height="180" alt="Image" src="https://github.com/user-attachments/assets/d8dc4671-74cf-4d0b-bf94-e641a7191542" />
</p>

Then we click on the Login button which redirects us to the login form. We fill the fields with the previous user credentials and we click the Login button:

<p align="center">
  <img width="650" height="400" alt="Image" src="https://github.com/user-attachments/assets/508df787-cc49-4cd1-aa1b-82af85ce922b" />
</p>

Finally we login to the frontend page. Now that the user has logged in, on the top right corner there is a Logout button so when he clicks on it he gets redirected back to the login form. 

<p align="center">
  <img width="150" height="50" alt="Image" src="https://github.com/user-attachments/assets/c6fed1bc-2899-4495-aa1a-dd51a5ccdc9d" />  
</p>
Also in the GameCenter on the right there are 2 buttons:
<img width="1000" height="75" alt="Image" src="https://github.com/user-attachments/assets/b8ed9d5b-38d0-4264-8e6c-15695cccfb43" />

So when the user logs in, the top side of the frontend is like:

<p align="center">
  <img width="1600" height="700" alt="image" src="https://github.com/user-attachments/assets/6ff24e55-b972-4d3d-9392-b760078c333c" />
</p>

We will explain the use of those 2 buttons but first we will show how the user can make and mofify a reservation. We navigate to "Our Facilities" field and we can observe the existing three facilities. We can decide in which one of them we want to play the board game eventually. Afterwards if we navigate to the "Popular Games" field we can see the four board games we can play. For example we can choose to play the "Uno" board game by clicking the button named "Play Now". Then the following form appears with some fields to fill. 

<p align="center">
  <img width="490" height="380" alt="image" src="https://github.com/user-attachments/assets/811c7b8e-b4d2-4fcc-8439-e26913bee0fe" />
</p>
