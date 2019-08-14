# Planes, trains and automobiles

## The Traffic Meister application assignment

 - Create a form which behaves as follows
    - It will display the following drop down menus
      - A list of vehicle types
      - A list of vehicle brands
      - A list of vehicle brand colors
    - All three lists are enabled when data is available.
    - When selecting an option in on of the list, the other lists are filtered accordingly.
    - At the bottom of the form all selections will be shown.
  - Use the framework based on the vacancy you're applying for. So if you applied to an Angular vacancy, use Angular. The same goes for React, VueJS, etc.
  - Except the framework restriction above, you are free to use any tool and/or framework you like. We do encourage you to remain critical when you include an additional dependency. Is this dependency really needed/useful? As long as it runs inside a browser and you can explain why that solution is the most favorable.
  - You are allowed/encouraged to design your own layout.
  - Your implementation should be
      - tested
      - visually attractive
      - deployable

### For example.
1. When yellow is selected all types and brands that have no yellow vehicles are filtered out
2. When selecting "Bugatti Veyron", only the car type and the available colors are selectable

## Data library

The data are provided by a small service you can find in the `service` folder.

This service can be accessed by a the global variable `trafficMeister` and provide a single method `fetchData`.

```
trafficMeister.fetchData(callBack);
```

The callback is called with the full data list as first parameter.

```
trafficMeister.fetchData(function(err, data) {
  console.log(data);
});
```

The data library can be used as a node module.

```
var trafficMeister = require('traffic-meister');
trafficMeister.fetchData(function(err, data) {
  console.log(data);
});
```

## Coding Assignment Evaluation Guidelines

To give you an idea what we expect from the implementation of the assignment we came up with the following guidelines. In general, treat it as code that will go in production for one of our clients.

**Important!** We will provide you with a Github repository where you can create your assignment in. As soon as you create a pull request to `master` our bot will immediately lock you out of the repository and the assignment is over. So before you put in a pull request, make sure you are done!

### Assignment
* Does the code work.
* Does the code still work when encountering edge cases.
* Does the code come with instructions.
* Do all included artifacts have purpose.

### Code quality
* Is the code structured in a logical way.
* Could the code be extended.
* Do functions, classes and modules use the right level of abstraction.
* Does the code show software engineering best practices and design patterns where applicable.
* Is the code consistent.
* Does the code contain descriptive names.
* Is the code production ready.
* Does the code base scale to a bigger feature set.

### Frameworks + Language
* What framework was chosen.
* Are the features of the framework used according to community best practices.
* Does the code use features of the framework or language when possible.
* Are common pitfalls avoided.

### Testing
* Are there automated test.
* How are the tests written.
* What choices are made in testing certain parts of the code.
* Are the tests written with the right level of abstraction.
* What test cases are chosen.
* Does the test code make use of the features of the test framework when applicable.

### Design + CSS
* How much effort is taken into making the app look nice.
* Is user experience taken into consideration.
* How was the UI implemented.
* Does the application work on all devices.