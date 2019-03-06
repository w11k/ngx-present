# ngx-present Changelog

## 1.0.3

* update dependencies (requires Angular 7 now)
* improve overview
* fix not complete npm publish of 1.0.2

## 1.0.2

* restore lost changes introduced in 0.11.0

## 1.0.1

* fix dependencies

## 1.0.0

* same functionality as 0.11.0
* updated dependencies: @w11k/tydux

## 0.11.0

* refactor navigation: toc instead of section and now with alt, arrows just slide-by-slide

## 0.10.1

* add missing dependency: prism-themes

## 0.10.0

* feature: add light code theme to config, add switch in sidebar
* fix too large margin-bottom of help-component
* fix navigating to preview slides in presenter

## 0.9.3

* fix navigate without coordinatesToKeep

## 0.9.2

* make presenter previews configurable
* add 'go to table-of-content' to help dialog

## 0.9.1

* decrease delay in overview
* fix error in generated d.ts file with a workaround

## 0.9.0

* slide-link: navigate within same mode
* slide-link: switch to presenter via alt-click
* toggle presenter via alt-p
* fix showing outdated current-slide 

## 0.8.0

* hide expert menu in side-bar, show with alt-click or alt-m

## 0.7.0

* navigate to presenter instead of slide with alt-click in overview
* add configurable navigate-to-overview key command

## 0.6.1

* add animation to help component to focus attention to new visible content

## 0.6.0

* make markdown links always open in new tab (theme)
* add depth limit to table-of-content
* make more things configurable
* improve theme
* fix help (go to start of current section)

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

