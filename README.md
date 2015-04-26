## Terra Charts v2

This is the second attempt using node & express + flux & alt + reactJS + BackBone + various libraries for express to make interacting with a database painless (hopefully I can copy over the models from the front end to the back end).

### Getting Started 
Install dependencies... run `npm install && cd public && bower install && cd ..`

...Then to start the app run `npm start`.  Navigate to `http://localhost:3000` to see the app.  

Open up another terminal tab and run `gulp watch` to transpile stuff for development.  

Note: this is livereload friendly so if you have the extension installed in your browser, enable it for development joy (broken for `.jsx` files currently).

#### Potential Errors
Bootswatch might be causing issues (lame considering I ran `bower install bootswatch --save`) so in order to fix this you must remove it from `bower.json` in `./public` directory.  I usually `vim public/bower.json` and `DD` the line that says `"bootswatch": "lameo-cause-problems-edition"`.  After that run `bower install bootswatch --save` and you will be good.

Gulp might fail at transpiling less if you write buggy less.  Kill it (if not already dead) and rerun `gulp watch` to continue transpilation process.