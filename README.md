# Interview Scheduler

A react-based dynamic appointment scheduler with responsive design and integrated testing through cypress and jest.

## Main page

Main page with a maximum of 5 available spaces per day

!["Main page"](https://github.com/olicarignan/scheduler/blob/master/docs/scheduler%20screenshots/main_page.png?raw=true)

## Responsive design

Mobile view of the main page

!["Mobile view"](https://github.com/olicarignan/scheduler/blob/master/docs/scheduler%20screenshots/mobile_view.png?raw=true)

## Interactive sidebar

Interactive sidebar that changes status according to the number of appointments per day and on hovering

!["Sidebar"](https://github.com/olicarignan/scheduler/blob/master/docs/scheduler%20screenshots/sidebar_hover.png?raw=true)

## Appointment form

Click on an empty spot to toggle the form to create a new appointment

!["New appointment"](https://github.com/olicarignan/scheduler/blob/master/docs/scheduler%20screenshots/create_hover.png?raw=true)

## Booked appointment

Interactive block to show a spot where an appointment has been booked already with options to either edit or delete when selected

!["Booked appointment"](https://github.com/olicarignan/scheduler/blob/master/docs/scheduler%20screenshots/booked_appointment.png?raw=true)
!["Booked appointment selected"](https://github.com/olicarignan/scheduler/blob/master/docs/scheduler%20screenshots/booked_hover.png?raw=true)

## Cancel appointment

Cancel confirmation form 

!["Cancel appointment"](https://github.com/olicarignan/scheduler/blob/master/docs/scheduler%20screenshots/delete_hover.png?raw=true)

## Edit appointment

Edit appointment form with the information previously entered by the user as default input

!["Edit appoitnment"](https://github.com/olicarignan/scheduler/blob/master/docs/scheduler%20screenshots/create_appointment.png?raw=true)


## Setup

Install dependencies with `npm install`

### Running Webpack Development Server

```bash
npm start
```

### Running Jest Test Framework

```bash
npm test
```

### Running Storybook Visual Testbed

```bash
npm run storybook
```