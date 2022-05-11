# Charitable Tracker

### An app to creatively track volunteer hours and charitable donations in engaging and helpful ways and provide you with useful and encouraging reports to show you the impact you're making with the organizations and causes you value most!

Designed by Adam Lindgren

Logo by Jocelyn Inlay

Database by Ted Fulk, Jocelyn Inlay, Osama Mousa

**Netlify Deploy: https://charitable-tracker.netlify.app/**

![Landing-for-github](https://user-images.githubusercontent.com/98040659/166087734-7ba387fa-73a0-4d92-b152-d2df2bb6f0be.jpg)

# **Features**

Below are the features available for Charitable Tracker

## **Dashboard**

This is your homebase, where all of your data lives. Customize your dashboard by opening the Settings Sidebar! Options include:

### **My Impact**

Choose between measuring your imact by cause or by organization. Each graph allows you to switch between measuring your donations or your volunteering!

### **My Progress**

A brief overview of how much of your annual income you've donated to date, as well as how close you are to your donation and volunteer goals!

### **My Timeline**

Your last 10 records submitted, both for donations and volunteering, sorted from newest to oldest.

### **My Volunteering**

All of your volunteer records, sorted from newest to oldest. You have the option to edit your entry, view its notes, or view its receipt. If you need more detail on the receipt, simply click on it and zoomed in view will pop up on screen!

### **My Donations**

All of your donation records, sorted from newest to oldest. You can also edit these entries, as well as view their receipts. Similar to above, if you need a better view of the receipt, just click on it and a window will pop up with a better view!

### **Add/Edit Donation Goal**

Enter/Edit your donation goal here. This will be used to update the `My Progress` component!

### **Add/Edit Volunteer Goal**

Enter/Edit your volunteer goal here. This will also dynamically update the `My Progress` component!

### **Add/Edit Yearly Income**

Enter/Edit your yearly income here, which will be used on the `My Progress` component to measure your donations to date vs. your income.
_Your income is not used for any other purpose, nor is it tied to your person in any way besides your username, and is not shared with anyone within or outside of our development team._

## **Enter Donations**

Enter your individual donations here! Choose the date of the donation (autopopulated with the current date), the organization you donated to, the amount you donated, what cause it benefited, and choose a receipt if you received one!

## **Enter Volunteer Hours**

Enter your volunteer hours here! Choose the date of your volunteering (autopopulated with the current date), the organization you volunteered with, the amount of hours you volunteered, any notes you may have, and a receipt or screen grab of email confirmation or volunteer log if you have one.

# **Getting Started with Create React App**

If you'd like to run this project locally, follow the instructions below.\
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## **Available Scripts**

In the project directory, you can run:

### `npm install --force`

Installs all dependancies for the project.\
`--force` needed due to Victory Charts.

**Dependancies:**

- [react-timeline](https://github.com/steven-mercatante/react-timeline)
- [axios](https://axios-http.com/)
- [bulma-pagination-react](https://github.com/hipstersmoothie/bulma-pagination-react)
- [react-cookie](https://github.com/reactivestack/cookies)
- [react-pro-sidebar](https://github.com/azouaoui-med/react-pro-sidebar)
- [sass](https://github.com/sass/sass)
- [use-local-storage-state](https://github.com/astoilkov/use-local-storage-state)
- [victory](https://formidable.com/open-source/victory/)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
