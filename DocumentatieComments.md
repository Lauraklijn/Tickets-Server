Opmerkingen/comments op de assignment - BACKEND (Server-Side):

Gemaakte modellen(tabellen)

- USERS relatie met ----> TICKETS <---- relatie EVENTS

a name -- V
a description -- V
a picture or logo -- V
a start and end date (could be the same) - V (Date)

After you click on an event, you see a list of tickets that are offered for this event. ---> X Nog geen relatie aan front-end met event+ticket

A ticket is made for a specific event and has an author (the user that created the ticket). --> V

Apart from that, it has:
a picture of the ticket (optional field) -- V
a price -- V
a description -- V

When you click on a ticket, you see the details of that ticket (description/price) -- V Not YET: and which event it's for.

On this page you can add comments as a customer
and everybody can see all the comments. A comment has a text and is connected to a specific ticket. It also has an author. --> NOT YET

Anybody can view events and tickets, but you have to login to add a new ticket or comment. Mockup of some pages of the app
--> AUTH is not working YET (I think small detail, still checking)

!! Fraud risk algorithm !!
This is an important part of the assignment. If you only finish one thing, it should be this thing! Tickets can be fraudulent, and as a customer I don't want to buy a fake ticket! So, we want to show customers the risk that they are taking when buying the ticket. On the ticket page for a specific ticket, we want to show a text like:

"We calculated that the risk of this ticket being a fraud is XX%" The percentage should be calculated using the following algorithm:

if the ticket is the only ticket of the author, add 10% --> V
if the ticket price is lower than the average ticket price for that event, that's a risk _ if a ticket is X% cheaper than the average price, add X% to the risk _ if a ticket is X% more expensive than the average price, deduct X% from the risk, with a maximum of 10% deduction --V (Last part has to be checked!!)

if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk -- V

if there are >3 comments on the ticket, add 5% to the risk. --> No comments yet (created a example of how the algoritm i think it should look like)

The minimal risk is 5% (there's no such thing as no risk) and the maximum risk is 95%. -- V

The calculated risk of a ticket depends on many factors. Make sure that the risk value is always "live" (i.e. up to date). -- NOT ONE THE FRONT_END YET

User stories
As a customer I want to see max. 9 events on a page and be able to click 'next' to see more pages of events if there are more
As a customer I only want to see events that are not finished yet
As a customer I want to view a list of tickets when I click on an event --> See All tickets (EventId + ticket not connected yet)
As a customer I want to view ticket details when I click on a ticket in the ticket list --> V
As a customer I want to see what the fraud-risk is for a specific ticket (Back-end ready, front-end not yet)
As a customer I want to be able to login, or sign up if I don't have an account yet -- V
As a logged in customer I want to add a ticket (for a specific event) that shows up on the event page with a title, picture, price and description --> Not Yet, can add ticket, but not for specifick event
As an author of the ticket I want to be able to edit a ticket's description, price and picture (other logged in customers cannot do this! only the user that created the ticket can edit it)
As a logged in customer I want to be able to create events with a name, picture (logo), date and description -- Can create event (have to check AUTH)
As a customer I can see some color (red/yellow/green) indicating the fraud risk of a ticket for all tickets in the all tickets list (Not added RISK to front-end yet)

Tools and technology
We recommend to use starter kits that we provided during the program to start this app. In terms of backend (server) technology, you can work with any NodeJS backend: JavaScript or Typescript, Express, or routing-controllers. It's up to you. The API should follow the better part of the REST principles. For the frontend, we expect you to properly use React and Redux. Make sure you use the Redux store to your advantage! Use either create-react-app or one of the starter kits that you've used before. Feel free to add any packages that you like. E.g. MaterialUI can be used to set up a nice layout (maybe even responsive!) but there are perfect alternatives as well.

Hand-in and evaluation
You will receive a time slot for a final evaluation talk on Friday. Before you show up on Friday, you should share the code of your assignment (frontend + backend) by adding the evaluator as a collaborator to your project.

create a PRIVATE (this is very important) GitHub repository
push your assignment to it regularly (so even if your computer breaks you will have a backup and we can see your progress!)
You will be asked to demo your application. Make sure you have everything running on your laptop before the start of the evaluation session.
Make sure your database contains enough data to demo the app (more than 9 events, events in the past, tickets that are low risk, tickets that are high risk, etc.) We don't want you to publish the code of your final assignment on GitHub to prevent people from copying each other's work. This also means you cannot use this as a portfolio project.
Final words
Show us what you've learned in the past weeks!
Have fun
Don't forget to sleep
