# ngx-present Changelog

## 0.5.2

* fix navigation to first slide in presenter

## 0.5.1

* remove overlay over current slide in presenter to allow usage of interactive elements
* add current slide to url of presenter to survive page reload

## 0.5.0

* add help component to tcc-theme

## 0.4.5 - 0.4.13

* add missing styling to tcc-theme
* fix a lot of small styling bugs in tcc-theme

## 0.4.4

* improve help
* allow markdown in pre-tag
* improve readme

## 0.4.3

* fix publishing

## 0.4.2

* fix table-of-content styling

## 0.4.1

* fix strange compile error

## 0.4.0

* fix navigation race condition
* fix navigation to slide via link
* add table-of-content component and use it in side bar. could be use on a slide too

### Breaking Changes

* tcc theme styling is now encapsulated as a mixin. please include it in your style.scss
  ```
  @include ngx-present-tcc-theme();
  ``` 

## 0.3.1

* fix installed ngx-present version in tcc-theme

## 0.3.0

* update to Angular 6.1
* help content improved
* improve slide-by-slide navigation: jump to current section title on left-arrow instead previous section title
* various small bugfixes and improvements

### Breaking Changes

* scss mixin `ng-presentation-global` renamed to `ngx-present`
* import of tcc-theme changed
  ```scss
  // old
  @import "~@thecodecampus/ngx-present-theme/style/ngx-present-theme";
  // new
  @import "~@thecodecampus/ngx-present-theme/style/ngx-present";
  ```
* tcc-theme module renamed from `NgxPresentThemeModule` to `TccNgxPresentThemeModule`

## 0.2.0

Initial, working release

### New Features

* Nested Slides Routing
* Overview with Zoom
* End User Help
* Write Content as Markdown
* Source Code Highlighting (also for Markdown) 

