## 0.5.0
###### _May 30, 2016_

##### General
- [Core] Integrate and use OpenLayers for Map rendering as well as its Features
- [Core] Re-wire all map clicks, popup, features, controls and more to work with OpenLayers

##### Client
- [Map] Show Cluster and HeatMap layers
- [SlidePanel] Add ability to switch between different layers (#89)
- [DataPopup] It does not store its pixel positioning any more. Positioning controlled by Overlay in Map
- [DataPopup] Unfortunately styling is controled from JS now due to Overlay properties. Need to change that
- [SlidePanel] Decouple social part of the SlidePanel into SlidePanelSocial

##### Server
- [Core] Return _id, text and timeStamp for every GeoJSON feature

##### Fixes / Enhancements
- [Docs] Add missing spec for new GeoJSON returned from server
- [UI] Replace all requires with import to be more ES6

##### Depreceated
- [Core] Remove GoogleMap API with OpenLayers v3 (#57)

## 0.4.0
###### _Apr 14, 2016_

##### General
- [Docs] Add CHANGELOG to the project for major releases
- [UI] Make UI mobile friendly and more responsive
- [Cleanup] Change language bundles. Simplifying language files for changes or missing labels
- [Translations] Add Russian language to the bundle
- [Docs] Add new Postman calls due to new API
- [Docs] Existing build commands were wrong. Fix them
- [Internal] Now pasting previous TweetGeoViz URL will trigger search and date filters (#86)
- [Bug] Fixed client production build webpack configuration since it was not working before due to the wrong path to static/ folder

##### Client
- [Internal] Major refactoring for the client code components and containers
- [Internal] Refactor routes by adding a new Layout component
- [Internal] Use Material UI now for most of the components (#87)
- [App] App component is more straightforward with less HTML markup
- [NotFound] Now Not Found Page works properly with new Layout
- [Toaster] Create new Toaster component which is mobile friendly for any page notifications
- [DataPopup] Has a filter input which allows to filter results in the popup
- [DataPopup] Add an ability to show timestamps for every tweet (#85)
- [DataPopup] DataPopup centers in the screen for small mobile device resolutions
- [DataPopup] Switched to Material UI
- [Map] Simplify markup and CSS of the HTML component
- [NavBar] Added left menu button
- [NavBar] Added a button to show advanced search menu (#84)
- [NavBar] Added date inputs for startDate and endDate with clear buttons (#84)
- [NavBar] Switched to Material UI
- [NavBar] Any search will change URL of the page (#86)
- [SlidePanel] shows on top of the UI instead of shifting it to the right
- [SlidePanel] added checkbox for showing filter in DataPopup
- [SlidePanel] added checkbox for showing time stamps in DataPopup
- [SlidePanel] CSS and markup improvements
- [SlidePanel] switched to Material UI

##### Server
- [ES6] Switch code to ES6 from ES5 (#74)
- [Node] Add new NPM commands to transpile code from ES6 to ES5 (#74)
- [Core] Changr config to JS from JSON due to the transpiling
- [Core] Now all tweets are sorted by timeStamp instead of coordinates
- [Core] Tweet data returns timeStamp as well (#85)
- [Core] Add ability to pass startDate and endDate for filtering tweets (#81)
- [Cleanup] Remove NPM command for dev server mode. Need to add it taking into consideration Babel

##### Fixes / Enhancements
- [Translations] Better language detection when a complex TweetGeoViz URL is pasted into browser
- [Core] Clean of action and events
- [UI] Added React icon for the project

##### Depreceated
- [Node] Remove mentioning of GULP from the README
- [LeftMenu] Remove SnapJS from the project
- [Docs] Removed older screenshots from the project
- [Core] Removed lodash from npm packages and from code
