# Angular Testing Style Guide

Looking for an opinionated guide to Angular testing structure, conventions, and best practices guide?
Step right in!
This testing style guide presents preferred conventions and, as importantly, explains why.


## Test Pyramid decision diagram

![Alt text](./assets/test_pyramid_decision.svg)
<img src="./assets/test_pyramid_decision.svg">

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

## Generic


**Do** write minimally passing tests

**Why?** Small tests runs faster

**Why?** Small tests are easier to maintain

**Why?** Small tests give more precisely clues where are the issue when it breaks

**Why?** Small tests become more resilient to future changes in the codebase.

Tests that include more information than required to pass the test have a higher chance of introducing errors into the test and can make the intent of the test less clear. When writing tests you want to focus on the behavior. Setting extra properties on models or using non-zero values when not required, only detracts from what you are trying to prove.


### Organizing Tests

**Do** break your tests in multiple sub-describes, grouping them by subject

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

Unit tests are tests that should cover the code that you've written. It is responsible to assure that unwanted chances in your code exposes possible failures. 

Unit tests should not be dependent on external code. Unit tests should be responsible for assuring that some lines of code are been executed properly. If your code depends on a external function or variable, those has to be mocked or stubbed and their code have to be tested by their own unit tests.

### Unit Test Responsibility

**Do** write tests to cover code that are contained on a single file.

**Why?** Creating tests that cross code boundaries is test more than it's responsibilities.

**Why?** Errors on external dependencies should not break your unit tests.

**Why?** Tests that cross boundaries should be tested as Integration Tests.


### Fake Dependencies

**Do** mock or stub all dependencies. With exception of frameworks dependencies or public libraries.

**Why?** 


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

**Do** only unit test HTML code that don't are affected by Typescript code. Use integration tests to test the behaviour of the DOM with component code.

**Why?** Helps to avoid a lot of assertion on DOM elements

**Why?** Tests that access DOM elements tends to run slower

**Why?** Public attributes and functions accessed by the Template can be tested directly from uni


<a href="#toc">Back to top</a>

## Integration Tests

Integration tests have the purpose of validating how units of code work together. All possible scenarios that tests that unit should have been done previously on Unit Tests, and after you assure that your units are tested you can see if they are integrating fine.

Even though you can use the same tools for Unit tests and Integration tests, you should not use it to test small pieces of code. This separation is important so your tests still small even when there's a lot of integrations happening on a component.

### Integration Test Responsibilities

**Do** assure that all possible scenarios are already covered on Unit Tests before you start to write Integration Tests for a code.

**Why?** Integration tests are slower then Unit Tests to run.

**Why?** Integration tests are responsible to assure that multiple parts of your code are working fine together. 

### Integration Assertions 

**Consider** limit the assertions to dependency calls and the end result of the integration.

**Why?** If your units are properly created, you shouldn't have to assert those parts of code again.

Asserting integrations calls with spies 

### Other Dependencies

**Do** mock/stub dependencies that are not part of your test.

**Avoid** loading the main module and modules not related to your tests.

**Why?** Each integration test should be focused on test as little integration as possible.

**Why?** Bringing unnecessary module configuration to your tests makes it slower to run.

**Why?** Unnecessary configuration can cause unwanted problems.

Testing all the integrations on a single test makes it hard to spot what's wrong when it breakes, so consider creating multiple tests for multiple integrations, and if necessary, create a tests with multiple integrations only after have tested priorly those single integrations.

### Integration Test Organization

**Do** name your root describe for Integration tests with ```"[featureName] Integration Tests"```

**Consider** create a separate file for Integration tests, like ```my-feature.integration.spec.ts```. Be consistent throughout you codebase.

**Why?** Makes easier to know that those tests are about integration and differentiate them from Unit Tests.

**Why?** Makes easier to spot Unit tests written on a wrong location.

**Why?** Makes easier to spot unallowed dependencies, thus helping code review

**Why?** Helps to identify if the proportion of Integration tests are consistent with Unit tests on the testing pyramid.


<a href="#toc">Back to top</a>
