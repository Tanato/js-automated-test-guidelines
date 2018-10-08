# Angular Testing Style Guide

Looking for an opinionated guide to Angular testing structure, conventions, and best practices guide?
Step right in!
This testing style guide presents preferred conventions and, as importantly, explains why.


## Test Pyramid decision diagram

[![Alt text](./assets/test_pyramid_decision.png)](https://raw.githubusercontent.com/Tanato/cit-ng-testing/master/assets/test_pyramid_decision.png)

## Style vocabulary

Each guideline describes either a good or bad practice, and all have a consistent presentation.

The wording of each guideline indicates how strong the recommendation is.

**Do** is one that should always be followed.
_Always_ might be a bit too strong of a word.
Guidelines that literally should always be followed are extremely rare.
On the other hand, you need a really unusual case for breaking a *Do* guideline.

**Consider** guidelines should generally be followed.
If you fully understand the meaning behind the guideline and have a good reason to deviate, then do so. Please strive to be consistent.

**Avoid** indicates something you should almost never do. Code examples to *avoid* have an unmistakeable red header.

**Why?** gives reasons for following the previous recommendations.

<a href="#toc">Back to top</a>

## Generic Tests Guidelines

### Test Scope

**Do** write minimally passing tests

**Why?** Small tests runs faster

**Why?** Small tests are easier to maintain

**Why?** Small tests give more precisely clues where are the issue when it breaks

**Why?** Small tests become more resilient to future changes in the codebase.

Tests that include more information than required to pass the test have a higher chance of introducing errors into the test and can make the intent of the test less clear. When writing tests you want to focus on the behavior. Setting extra properties on models or using non-zero values when not required, only detracts from what you are trying to prove.


### Organizing Tests

**Do** break your tests in multiple sub-describes, grouping them by subject, like functions or properties

**Why?** Grouping them makes it easier to idenfify what's been tested

**Why?** It allow your test file to remain organized independent of it's size.


### Strings

**Avoid** magic strings, assign all your strings to constants, local or even global if necessary.

**Why?** Using constants for strings makes them reusable, so it makes harder that your tests assert in a wrong value.


### Naming Guidelines

**Do** name your variables properly. Unit tests code still code.

**Do** use only one line for tests descriptions

**Do** describe your tests in a clear form, The name of your test should consist of three parts:

* The name of the method being tested.
* The scenario under which it's being tested.
* The expected behavior when the scenario is invoked.


**Why?** Naming variables and functions properly makes the test easy to understand.

**Why?** Naming standards are important because they explicitly express the intent of the test.

**Why?** Tests should be named to easily identify what have broken when it fails.

**Why?** Longer descriptions are a indicative that you are testing too much on a single test unit.


### Complexity of Tests

**Avoid** logic in test code. Tests can't be complex to write.

**Avoid** logic in test stubs or mocks. Setup multiple stubs/mocks if necessary.

**Why?** Less chance to introduce a bug inside of your tests.

**Why?** If your test is becaming complex, you are probably testing more than you should in a single test, consider break them into smaller tests

**Why?** Focus on the end result, rather than implementation details.

**Why?** Stubs and Mocks should be used to return a single result so it will always be predictable.

### Test Sequencing

**Do** create tests from simplest cases to more complex

**Why?** testing simple cases first allow that complex tests are less necessary

**Why?** testing simple cases first normally show the user what have broken first 

### 3 A's convention (Arrange, Act and Assert)

**Do** use the 3 A's convention to write your tests "Arrange, Act and Assert", Arrange, Act, Assert is a common pattern when unit testing. As the name implies, it consists of three main actions:

* Arrange your objects, creating and setting them up as necessary.
* Act on an object.
* Assert that something is as expected.

**Do** Arrange once. Prepare your objects in sequence, creating and setting them up as necessary.

**Do** Act once. Execute the actions on your object only after your scenary is prepared.

**Do** Assert once. Validate only the result of the test and only after all the actions are done.

**Why?** Clearly separates what is being tested from the arrange and assert steps.

**Why?** Less chance to intermix assertions with "Act" code.

**Why?** Asserting multiple times in a single test makes hard to understand their objective.

**Why?** Assert multiple times during your tests make it slow to run.

**Why?** Validate your preparations is a symptom of multiple responsibility of your tests, if preparations can cause changes on your test result, test the preparations on a separated previous test.


### Environment

**Do** consider mocking all external environment events, like date, time, timezone and language. 

**Why?** Tests shoudn't be affected by the environment conditions that it is running.

**Why?** Makes it easier to reproduce unusual scenarios.

Setting up your environment, allows you to write more precise tests.


### Test Preparation

**Do** use beforeEach and afterEach wisely. Only use them for setup when it's something clear to understand.

**Why?** Having all your setup inside your test make it easier to understand.

**Why?** Less chance of setting up too much or too little for the given test.

**Why?** Less chance of sharing state between tests which creates unwanted dependencies between them.


## Unit tests

Unit tests are responsible to test units of code in isolation. Units of code can be understood as functions, properties and variables.

Unit tests are tests that should cover the code that you've written. It is responsible to ensure that unwanted chances in your code exposes possible failures. 

Unit tests should not be dependent on external code. Unit tests should be responsible for assuring that some lines of code are been executed properly. If your code depends on a external function or variable, those has to be mocked or stubbed and their code have to be tested by their own unit tests.

### Unit Test Responsibility

**Do** write tests to cover code that are contained on a single file.

**Why?** Creating tests that cross code boundaries is test more than it's responsibilities.

**Why?** Errors on external dependencies should not break your unit tests.

**Why?** Tests that cross boundaries should be tested as Component Tests.


### Fake Dependencies

**Do** mock or stub all dependencies. 

**Why?** Unit test should be resilient to changes on external code.

**Why?** External changes that can break you code should be testes with Component tests.

Exception apply for frameworks dependencies that don't provide Stubs or public packages.

### Private Members

**Do** validate private members by unit testing public methods that consumes it.

**Why?** Private methods still have to be tested.

**Why?** Private methods shoudn't be exposed only for testing purposes


### Module Configuration

**Do** not load any application modules.

**Avoid** configuring multiple times the TestBed. Setup it once then use spies to change it's behaviour if necessary.

**Why?** Loading application modules breaks the boundaries on unit testing.

**Why?** TestBed is shared throughout your entire tests, and changes on injection are not allowed after ```.compileComponents()``` is called.


### Template Testing

**Do** only unit test HTML code that don't are affected by Typescript code. Use Component Tests to test the behaviour of the DOM with component code.

**Why?** Helps to avoid a lot of assertion on DOM elements

**Why?** Tests that access DOM elements tends to run slower

**Why?** Public attributes and functions accessed by the Template can be tested directly from uni


<a href="#toc">Back to top</a>

## Component Tests

Component tests have the purpose of validating how units of code work together, testing the Components with the real implementation of his dependencies. Boundaries that cross the application limits, like for example Backend APIs, should be mocked as the intent is to validate only the aplication itself. 

You should create Component tests only after your coverage is done with Unit Tests, that way you guarantee that that piece of code is working properly by itself before trying to integrate with another pieces of code.

Even though you can use the same tools for Unit tests and Component tests, you should separate those tests by it's purposes, this separation will allow you to create smaller tests that runs faster, are easyer to maintain and serve a single purpose.

### Component Test Responsibilities

**Do** ensure that all possible scenarios are already covered on Unit Tests before you start to write Component Tests for a code.

**Why?** Component tests are slower then Unit Tests to run.

**Why?** Component tests are responsible to ensure that multiple parts of your code are working fine together. 

### Component Assertions 

**Consider** limit the assertions to dependency calls and the expected end state of the component.

**Why?** If your units are properly created, you shouldn't have to assert those parts of code again.

Asserting integrations calls with spies 

### Other Dependencies

**Do** mock/stub dependencies that are not part of your test.

**Avoid** loading the main module and modules not related to your tests.

**Why?** Each Component Test should be focused on test only its dependencies. 

**Why?** Bringing unnecessary module configuration to your tests makes it slower to run.

**Why?** Unnecessary configuration can cause unwanted problems.

Testing all the integrations on a single test makes it hard to spot what's wrong when it breakes, so consider creating multiple tests for multiple integrations, and if necessary, create a tests with multiple integrations only after have tested priorly those single integrations.

### Component Test Organization

**Do** name your root describe for Component tests with ```"[featureName] Component Tests"```

**Do** create a separated root describe for your Component Tests

**Why?** Makes easier to separate objectives and differentiate them from Unit Tests.

**Why?** Makes easier to spot Unit tests written on a wrong location.

**Why?** Makes easier to spot unallowed dependencies, thus helping code review

**Why?** Helps to identify if the proportion of Component tests are consistent with Unit tests on the testing pyramid.

<a href="#toc">Back to top</a>

## Integration Tests

Integration tests are responsible for testing the application as a whole without the dependency of external services and APIs. The focus of the Integration tests is to load the application and ensure that the application that the user will see behaves like expected. 

It differs from E2E tests as it usually mocks all the external dependencies, this approach allows Integration Tests to run faster compared to E2E tests, without the complexity of running the entire backend and at the same time having a more controlled environment.

Tntegration Tests will be written using Protractor and mocking the API dependencies through a express server inside the tests.

### Integration Test Responsibilities

**Do** ensure that the smaller components used by your interface are already covered by Unit and Component tests.

**Do** Test routable components and parts of the application that the end user interacts with.

**Why?** Integration tests are slower then Unit and Component Tests to run.

**Why?** Integration Tests are responsible to validate the application as a whole, not caring about how the internals of the application are coded. 

### Component Test Organization

**Do** use the termination ```[my-feature].integration-spec.ts``` for your Integration Tests

**Do** create your Integration Tests in a separate folder at the root of your application, named ```./integration/```

**Do** respect the folder structure of your application to write your tests, supressing the ```app``` folder.

**Why?** Allows easier navigation through Integration Tests.

**Why?** Allows the tool to identify what tests to run in Integration Test phase.

**Why?** Follow the same standard for Angular E2E tests, making it familiar to Angular Protractor developers.

For example, if you're testing a component inside this folder structure ```src/app/login/login.component.ts``` you should put your tests in a directory like ```integration/src/login/login.integration-spec.ts```

### External Dependencies

**Do** mock/stub dependencies that are from outside your application, like API calls and external data sources.

**Why?** Integration Test should validate the application and not it's dependencies.



## What to test?

Below I have listed some examples of what you should test in Unit Tests scenarions  and Component Tests.


Some of those examples could be fitted on one or another category, but is important to decide on where's the best place to put them and have a motive to do so. There's a flow chart on this page that may help you to decide, but as the pyramid of tests suggest, try always to cover the majority of your code using Unit Tests.


Remember also that this is only a small set of common cases and there's plenty of scenarios that aren't listed below that should be tested as well.

## Unit Test

### Every public member functionality

Every piece of code inside a function has to be tested alongside with it's effects on other members of the class.

### Private function through the public ones

Every private function inside your class has to be covered on tests of public members that uses that function.

### Initial state of the object

After a Service, Component or another class is created, you should assure that the initial state of it's public members are properly setted with expected values.

### All elements that should exists on the Template

It's important to ensure that all elements are being created on the template with it's correct identification. Another important thing to test is if the elements CSS classes that are related to business rules are being correctly applied.

## Component Tests

### Calls from Components or Services to Angular Services

After Unit Tests are done with stubbed and mocked services, you should cover if the real implementation of the service is been called with correct parameters and if that call is receiving the proper return

### Data Binding (Component x Template)

In Component Tests, you should ensure that the DOM element is binded correctly with the component's public properties that it is related. 

### DOM Events (e.g. clicks, lost focus)

In Component Tests, all public functions of a component should already be covered by Unit Tests, so in Component tests is important to test if a given event is calling his related function.

### Use of Directives and Sub-Components on Templates

When using a Directive or Sub-Component in a Template from inside your application, you should ensure that those Components are receiving the correct @Input parameters and ensure if its @Outputs events are triggering correct functions in your container Component 
