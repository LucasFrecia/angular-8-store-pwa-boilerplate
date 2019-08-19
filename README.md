# SytacTrainsAndCars

Angular 8 project built by Lucas Frecia for a jot test.

![](sytac-test.gif)

### Installation

After cloning, install with yarn, run the production build, and run the server to see tha app running as a PWA (if using npm replace yarn with npm)

```sh
$ yarn
$ ng build --prod
$ yarn start:pwa
```
Head to http://localhost:8080/ to see the app running.

### E2E Testing

Before testing the app with Cypress, run the local server

```sh
$ yarn start
```
Head to http://localhost:4200/ you should see the app running

Now run Cypress

```sh
$ yarn e2e
```
A chromium browser should open, click the test named transport.selector.spec.ts and it will run.

### Plugins

Some of the libs included that make for a better user and developer experience are: 

| Plugin | README |
| ------ | ------ |
| @ngxs/store | https://ngxs.gitbook.io/ngxs/ |
| @angular/flex-layout | https://github.com/angular/flex-layout |
| angular-in-memory-web-api | https://github.com/angular/in-memory-web-api |
| cypress | https://docs.cypress.io/guides/overview/why-cypress.html |
| @angular/pwa | https://angular.io/guide/service-worker-getting-started |
| @angular/material | https://material.angular.io/guides |

### Why @ngxs over @ngrx?

I decided to go with ngxs for this test because it is actually the underdog but in my experience it has shown to be a great library for managing state. Having started and worked in many projects with ngrx, I find that ngxs is great for devs who come from Java, .net or any other OOP language, so it can serve in many cases to teach to new devs.

### Why an in memory web api?

The test came with a service, I decided that instead of using this script in my application I should make as realistic as possible. So I think going with this interceptor of http requests was the best way to go for the test.

### Why Cypress?

In my last job we had heated debates over testing, mostly unit testing over E2E, and the I myself and other team members reached the conclusion that for this kind of tests E2E is the way to go since it takes into account the whole application and services. And even though it is true that it could give false positives in some cases, the end result are tests that cover most cases and act how a user would.

### Why PWA?

The PWA experience really changes how the user interacts with our application. It not only allows him to access and view a weba pp as if it where a native app, but also increases speed by an order of magnitude and even allows for browsing without a connection with cached data. I decided to add this since I think it will be an important player n the market the years to come.


