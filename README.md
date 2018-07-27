# ngx-present

ngx-present is an open source, [Angular](https://angular.io) based presentation tool developed
by [W11K](https://w11k.de).

At W11K we use it e.g. for our conference talks as well as for the course material
of [theCodeCampus](https://thecodecampus.de) where we offer Angular and
TypeScript trainings.


## Features

* Nested Slides
* Overview with Zoom
* End User Help
* Write Content as Markdown
* Source Code Highlighting (also for Markdown) 


## Project structure

This project consists of 3 parts: the core library, a theme library and a demo application.
The project uses the Angular CLI as build tool.
Therefore the previous mentioned libraries are located in the `projects` folder.
The `src/app` folder contains a demo application where you can see how to use the libraries.

### [@w11k/ngx-present](./projects/w11k/ngx-present)

@w11k/ngx-present is the core library. It contains some basic components like menu, help,
overview, ... and the routing system. It does not contain any styling for your slides.
However it contains the styling for the contained components. 

### [@thecodecampus/ngx-present-theme](./projects/thecodecampus/ngx-present-theme)

@thecodecampus/ngx-present-theme is, as the name suggests, a theme for ngx-present
with special styling for theCodeCampus. Basically it is a set of reusable
master-slide-components which can be applied to a slide in the concrete presentation project. 

Please note: the source of the theme is available but you are not allowed to use it as it is.
You can use this theme as a blueprint to create your own theme.
Feel free to copy and modify it but please do not use our styling and logos.


## Installation

* Create a new angular application `ng new my-presentation`
* Install @w11k/ngx-present via `npm install @w11k/ngx-present`
* You may want to install a theme via `npm install your-ngx-present-theme`.
  Of course you also can use ngx-present without a theme.
  A theme is just a way to reuse your styling in multiple presentations
  without copy & paste.  


## Usage

* Each slide is an Angular component. Go on and create one. Do not declare this
  component on any module directly. 
  All slide components get structured in an array of components or nested arrays.
  You can nest the slides as deep as you want to. Later on this structure is used
  for the routing and numbering of the slides. 
* In your app module import the ngx-present module and pass the slides to it: 
  ```
  NgxPresentModule.withSlides(slides)
  ```
* Add the slide components to app module's declarations and entryComponents.
  These to parts of the module decoration typically look like this:
  ```
  declarations: [AppComponent, ...slides],
  entryComponents: [...slides],
  ``` 
* Import the router module and pass your custom routes along with ngx-present's
  routes. Minimal route configuration should look like the code below.
  Feel free to add additional routes or change the default redirect.
  You don't need to create routes for your slides. This is managed by ngx-present.
  ```
  import { ngxPresentRoutes } from '@w11k/ngx-present';
  ```
  ```
  RouterModule.forRoot([
    ...ngxPresentRoutes,
    { path: '**', redirectTo: 'slide'}
  ])  
  ```
* In your AppComponent's template insert the ngx-present-container component.
  This container component is designed to use the complete window (100vw and 100vh).
  All styling and theming should be done inside of the slide components.
  Create master slides for reusable styling.
  ```
  <ngx-present-container></ngx-present-container>
  ```
* Start your development server and open the application.


## Run the Demo

* Clone this repository
* Run `npm install`
* Run `npm run build:lib` and `npm run build:theme`
* Then run `npm run start` and open
  [http://localhost:4200](http://localhost:4200) in your browser
