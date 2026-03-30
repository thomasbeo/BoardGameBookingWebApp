# BoardGameBookingWebApp
Instructions on how to run the web application:

We navigate to the path of our project which is: C:\web-app-dev\boardgame_booking and then we run the server file which initializes a connection and connects to our MongoDB Atlas database.

  <img width="400" height="70" alt="image" src="https://github.com/user-attachments/assets/271a6124-46f7-40bc-8816-10514cca21ca" />

Then we go to the browser to the url: http://localhost:3000 which leads us to the frontend page below:

<p align="center">
  <img width="1901" height="2433" alt="Image" src="https://github.com/user-attachments/assets/e2704117-bd71-45bf-ad89-75a8d841bc51" />
</p>

There are some facilities which the user can select one of them, then chooses one of the existing board games and makes a reservation. We will demonstrate how the reservation is made. On the top right corner there are 2 buttons named Login and Register. Initially the user clicks on Register and then a form appears with some fields to fill as it is shown below:

<p align="center">
  <img width="650" height="400" alt="Image" src="https://github.com/user-attachments/assets/cd65d71b-3bb4-4225-bbe9-4769839514fd" />
</p>

We click on the button named "Create account" and then the user is registered on our MongoDB Atlas database on the users field:   

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

We will explain the use of those 2 buttons but first we will demonstrate how the user can make a reservation. If we click on the yellow button named "Explore Facilities", we go to "Our Facilities" field and we can observe the existing three facilities. We can decide in which one of them we want to play the board game eventually. Below each one of the facilities there is a button named "Book Now". For example if we click on the facility "Board Game Room 1" then the server displays the message:

<img width="500" height="200" alt="image" src="https://github.com/user-attachments/assets/cd511ee0-e2e2-459a-b1f5-3daa22fe0135" />

This message confirms that we chose facility so we can continue to select which board game we want.

Afterwards if we navigate to the "Popular Games" field we can see the four board games we can play. Suppose we choose to play the "Uno" board game by clicking the button named "Play Now". Then the following form appears as it is shown below. 

<p align="center">
  <img width="450" height="350" alt="image" src="https://github.com/user-attachments/assets/2c6cb8cb-3f97-4791-9f23-80d20b4c5ce9" />
</p>

This form has three fields for the user to fill. The first one is the "Facility" which was chosen earlier. If the user eventually wants to select a diffenrent facility, there is the following dropdown menu:

<img width="450" height="170" alt="image" src="https://github.com/user-attachments/assets/a28c6c60-45d8-485e-a1f7-fd751c93e98a" />

The second field is the "Date" from which the user can select any present or future date. It is prevented to choose a date from the past since this is not possible.  

<img width="210" height="330" alt="image" src="https://github.com/user-attachments/assets/9d5fef33-0c3e-4262-a74a-468d7f5955d3" />

And the last field is the "Time Slot" which displays some fixed time intervals:

<img width="450" height="180" alt="image" src="https://github.com/user-attachments/assets/a3daed7e-0ea0-4baa-a16f-2ec84fef072b" />

Finally if we fill the form with some random choices from the user:

<img width="470" height="375" alt="image" src="https://github.com/user-attachments/assets/074b4814-f572-4dac-91a6-49aa6030e5b2" />

And then click on the button "Confirm Reservation", then a message pops up from the server which confirms that the reservation is done successfully:

<img width="500" height="150" alt="image" src="https://github.com/user-attachments/assets/db82d3be-5c1a-4699-9e82-558ed6b14046" />

Also it is important that this reservation is stored to our MongoDB Atlas database to the reservations field:

<img width="700" height="325" alt="image" src="https://github.com/user-attachments/assets/6b6c6dbc-dbbb-486d-b248-74f84d82d4bf" />

Now that we explained how the reservation is made, we can take a look on those two buttons we mentioned in the beginning:

<p align="center">
  <img width="400" height="80" alt="image" src="https://github.com/user-attachments/assets/965cacfc-15ca-4fbc-b8fd-c1e98e250dc5" />  
</p>

If we click on the left button named "Όλες οι κρατήσεις" we can see all the reservations that are made from all the users:

<p align="center">
  <img width="1100" height="700" alt="image" src="https://github.com/user-attachments/assets/578f2481-eb05-4a95-aeee-311b04d7d074" />
</p>

We can cancel any reservation by clicking on the button "Ακύρωση". For example if we choose to cancel the reservation we made earlier, we see:

<p align="center">
  <img width="500" height="150" alt="image" src="https://github.com/user-attachments/assets/1c3cd17e-71e5-4fe7-80ff-43487020c51f" />
  <img width="200" height="270" alt="image" src="https://github.com/user-attachments/assets/cae600fe-1362-4d83-8bb4-acd56dde6955" />
</p>

Now we can see above there is the red button that says "Ακυρώθηκε" which indicates that the reservation is canceled. By clicking the other button named "Ακυρωμένες κρατήσεις" we get redirected to a new page in which all the canceled reservations are shown below:

<p align="center">
  <img width="1900" height="500" alt="image" src="https://github.com/user-attachments/assets/e066088a-e9e0-44d5-97c5-252d848ed4de" />
</p>

Then if we click in the top right corner the button "<--Επιστροφή" we go back to the frontend page. 
