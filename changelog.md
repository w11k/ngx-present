# ngx-present Changelog

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

