## The Weather App
  An application that can tell the 5 day weather forcast for a given city and/or region
## How to Buildit ;)
  The Weather App was built using React.js bootstrapped using create-react-app, using npm to manage my project and its node modules:<br/>
  Prereqs: Have Node installed, clone repo<br/>
  Step 1: `npm install`<br/>
  Step 2: Create .env file<br/>
    I provided a .env.example as a starting point. It has the URLs for the free apis . The only thing needed to run is a the free appIds. You can get it from:<br/>https://openweathermap.org/api<br/>
and<br/>https://timezonedb.com/register<br/>
  Step 3: `npm start` <br/>
  
The reason why I ended up using another api was to get the timezone for each city's weather information I was getting back. OWM does not provided the timezone or offset of the time in reference to UTC (at least not from what I saw)<br/>
   
  Everything should work :D

## Tradeoffs
  1. Because The Weather App is a SPA, the user will have to download a larger bundle. This could be solved by code splitting. 
  2. SEO could also be a potential issue with a full SPA, this could be solved by server side rendering.  If a web crawler does not/cannot does not use javascript, it won't see the site. 
  3. Similar to 2, if the user has javascript disabled, they wont be able to see the site.
  
## With more time I would...
  1. Try to display the information in a more aesthetically pleasing. All the other weather apps I saw graph the increase of decrease in temperature. It would be cool to make graphs over time for the information at the very least.
  2. Figure out a more accurate way to calculate what logo I need to show on the 5 day panels.
  3. Try to manipulate and organize the json cityID lookup to be more user friendly. Some cities have multiple id's and can be confusing, as it just shows multiple cities. 