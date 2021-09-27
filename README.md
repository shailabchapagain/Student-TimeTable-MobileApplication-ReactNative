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


### Login Page


![login (2)](https://user-images.githubusercontent.com/91322361/134951196-cec0df0d-4b47-4e31-8faa-1028e2a21905.jpg)


### Register Page

![register (2)](https://user-images.githubusercontent.com/91322361/134951208-7c42e802-af15-4e9c-be4c-b0a6ecbf2164.jpg)


### Exam Page(Pending)

![exam_pending](https://user-images.githubusercontent.com/91322361/134951228-eddf17e3-40df-43e4-b26d-5e5347878617.jpg)


### Exam Page(Concluded)

![exam_conclude](https://user-images.githubusercontent.com/91322361/134951244-25aea46a-ac76-4e35-9c94-39ecff4ff0ad.jpg)


### Practicals Page(Concluded)

![practical](https://user-images.githubusercontent.com/91322361/134951265-e61eb317-a011-44e1-a712-ffb580b92f81.jpg)


### Practicals Page(Pending)

![practical_pending](https://user-images.githubusercontent.com/91322361/134951327-fc834957-259d-49e8-a201-ed73d43172e0.jpg)


### Home Page

![add_item](https://user-images.githubusercontent.com/91322361/134951497-32062284-4c19-4f0e-bf5d-1b505f007221.jpg)


### Classes Page

![upcomming_classes](https://user-images.githubusercontent.com/91322361/134951522-98e9f7b1-192e-4ebc-be75-3480260a47cc.jpg)


### Profile Page

![my_pp](https://user-images.githubusercontent.com/91322361/134951560-86a53e8c-53e7-493b-a766-131e55d11204.jpg)


### Edit profile page

![edit_pp](https://user-images.githubusercontent.com/91322361/134951626-dbe60fed-1932-4455-b510-4990b6411837.jpg)


### Uploading profile picture

![pp_update](https://user-images.githubusercontent.com/91322361/134951575-fb595589-8cca-400a-bbd9-871c94fc7fa4.jpg)

