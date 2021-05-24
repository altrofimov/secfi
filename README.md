# Secfi Test Task 

Notes:
* No CSS preprocessor was used, as it would be an overkill for such a small application
* No CSS methodology like BEM was used for for such a small application
* Normalize CSS is used to have consisted styles across the browsers
* Application Accessibility is tested with Screen Reader, Google Lighthouse, and for WCAG level A
* Font sizes where used in pixels intentionally for Accessibility

Assignment-related answers for the questions:
* It took around 5 hours and 30 minutes to complete. React is not my main framework, so it took a bit time to refresh the knowledge on Hooks and Functional Components 
* I have chosen to use Functional components as the required logic is simple. Due to time limit I found the design inspiration on Dribble instead of creating it, used *material-ui* instead of implementing the controls, and made use of *devexpress* charts. SessionStorage for caching is chosen to clear cache when session ends
* I like that I have moved Data manipulation logic into separate Module, so the Data source can be replaced/extended without touching components. I have used dumb/presentation component where it made sense, thought of API error handling, and implemented Caching that saves the Free Tier API calls

Areas to improve:
* Implement loading spinner to show before API data is received 
* To perfect different screen sizes support 
* Add interceptor for API calls to unify caching mechanism, calls config and error handling
* Implement Backend For Frontend (BFF) to prepare API data responses to edible format instead of formatting data in Frontend
* Add more unit tests. Only a couple were are added due to lack of time
* Implement e2e tests
* Add automated Accessibility tests
* Setup pre-push / pre-commit Husky hooks for:
  * Checking code style
  * Commit Message Convention support
  * Code Linting
  * Checking Code Coverage
  * SonarQube Scanner for security checks
* Wrap whole Application as a Web Component for future Micro-Frontend architecture implementation if needed

# Working with the Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Browsers support can be found at package.json under *browserslist* property.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
