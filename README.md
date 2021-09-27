## Multi-platform DevelopmentStudent Timetable

### Introduction
Basically, Our project is to develop an application that works as a student’stimetable, where there can be the registration of new student and manage-ment  of  different  practical  works,  exams  and  classes.   Our  main  goal  is  todevelop an application in React Native supported by Firebase service wherethe logged in user will be able to view their pending and concluded exams,user’s classes, pending and concluded practical works also can add classes,exams and practicals and edit their profile and perform logout.  When theuser will add any of the items from the application the added data are storedin database and retrieve in each specific field.
### How our application works?
Our application fulfils all the requirements as explained in the project sce-nario.  Initially, when we run the application our application starts with thelogin  screen  with  the  fields  email  and  password.   If  the  user  is  registeredthen he/she can login with the email and password if not then he/she canregister by tapping the text register user will be redirect to register page.  Inregister page there are several fields like email, name, mobile phone, studentnumber, password through which user should pass by in order to completethe registration.  After the registration the user is directed to the applicationwith a pop-up message ”User Registered Successfully”.  If the user is alreadyregistered  and  has  added  some  of  items  like  exams,  practicals  and  classesthen  he/she  will  be  able  to  view  the  list  of  the  classes,  exams(pending  &concluded)  &  practicals(pending  &  concluded)  in  respective  pages.   If  notthen he/she  can navigate to home page  and their they  can add each item1
filling all the required field.  as they save it the data are stored in firebaseand will be retrive in each specifig field.The  user  can  view,  edit  and  update  each  and  every  item  in  list  of  theclasses,  exams(pending  &  concluded)  &  practicals(pending  &  concluded).And also they can view and edit their profile with contains fields like pic-ture, name, email, mobile phone, student number.They can logout by simplypressing logout button which redirects to the login page and can be loggedin by another user.
### Implementation
For  our  app,  we  used  various  technologies.   As  back-end  service  we  usedGoogle Firebase both for Authentication and as Database.First we used Miro app for work break, and also for working as team moreefficiently as much as possible.After work break, we made a app plan using part using Figma app. Figmaapp offers various technologies for both User experience and User Interfacedesigns.  After finishing User interface design we started to Front-end part ofour project.  In front-end part we used both class components and functionalcomponents upon our needs.  We used navigation for navigate between pages.We  made  our  custom  color  palette  to  use  in  our  app.   Depend  on  ourneeds we used Some react hooks as well.  Such as useEffect,  useState.  Wehave splitted our code to look more clear for anyone can understand moreeasily.We have a user object that includes both user info and Classes/Exams/Practicalworks collections.First User need to be Login to see/edit/update the collections.  To Loginuser need to enter the email/password and we are calling the Firebase withthat credentials.  After getting success user logins and uses our app.We  are  fetching  the  data  from  Firebase  once  user  entered  to  the  page.And calling again Firebase when user adds item to the collection.  User canregister to our app by navigating from Login Page.  After Registration weare passing to Login Page again.We try to impliment our app more optimally.  For that we splitted ourelements that repeated again and again.  As a result we achived very smoothexperience,even more faster performance
### Conclusion
In our app, user can add classes/exams/Practical works to timeline.  App isdesigned to improve students productivity and to prepare/study more effi-ciently.App is User-Friendly to anyone in any age can easily adapt to it.  Appuses Google Firebase as a back-end service and it gives us super smooth userexperience.We can give many more features such as integration with school’s officialtimetable for adding classes to our app through API.


#### Login Page


#### Register Page



#### Exam Page(Pending)

#### Exam Page(Concluded)

#### Practicals Page(Concluded)

#### Practicals Page(Pending)

#### Home Page

#### Classes Page

#### Profile Page

#### Edit profile page

#### Uploading profile picture



