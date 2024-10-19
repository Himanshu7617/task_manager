# task_manager


BACKEND

1. pehla to user sign up and login ka logic 
   joh bhi naya user hoga uske pass do option hogein ya toh apni team banao aur ya phir kisi team code ke jariye enter karlo
   aur login sirf team leaders ke liye hoga 
   login karte time apni team ka naam bhi dena hoga -- DONE

2. ab login krne ke baad 


    agar team leader hai toh 

        add members ka and create task ka option aayega -- DONE
        boh task delete bhi kar skta hai - DONE
        and team member ko hata bhi sakta hai - NOT DONE
        and kisi bhi task ko done kar sakta hai -DONE

    agar team member hai toh boh sirf use joh task hai use hi check kar sakta hai bas

    MIDDLEWARES - UNDONE
3. aur iske baad ek admin panel iss hi website ka jispe saari teams ka data show ho raha ho
    yahan sirf show karna hota hai ya super user data manipulated bhi kar skta hai?

????????????????????????????????????????????????????????????????


for now the state of the project is that its taking the user signing him up and logging him too (but only the leader right now)


To do :

1. FIRST MAKE THE FRONTEND A LIL APPEALING 
    
    - make a signup page 
    - make a login page
    - make a dashboard for leader
    - make a dashboard for member
    - make a loader and error page too
    - just a page that display admin panel written on it for now

2. SETUP THE BASIC BACKEND which is already running 
 
    - set up the team member signing up this time too
    - As for the middlewares 
        - when the user sends any request to add task, add member, delete anything then we have to check whether the user is the leader of the team or not 
        - At the time of logging in check whether the user is admin or not as in to show the admin panel

3. NOW ADD ALL TASKS THAT LEADER CAN DO 
    
    - first make the functionalities of the leader and show them in the frontend
    - now then add the functionalities of the team member too

4. STORE THE NECESSARY COOKIES 
    
    - learn about light/dark theme implementation 
    - implement refresh token 

5. DEVELOP THE ADMIN DASHBOARD

    - learn how to display live users real time yk

6. DEPLOY THE SHIT FOR NOW




