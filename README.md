# Angular Testing Style Guide

Looking for an opinionated guide to Angular testing structure, conventions, and best practices guide?
Step right in!
This testing style guide presents preferred conventions and, as importantly, explains why.


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

**Why?** Small tests show more precisely where are the issue when it breaks

**Why?** Tests become more resilient to future changes in the codebase.

Tests that include more information than required to pass the test have a higher chance of introducing errors into the test and can make the intent of the test less clear. When writing tests you want to focus on the behavior. Setting extra properties on models or using non-zero values when not required, only detracts from what you are trying to prove.

**Do** break your tests in multiple sub-describes, grouping them by subject

**Why?** Grouping them makes it easier to idenfify what's been tested

**Why?** It allow your test file to remain organized independent of it's size.


**Avoid** magic strings, assign all your strings to constants, local or even global if necessary.

**Why?** Using constants for strings makes them reusable, so it makes harder that your tests assert in a wrong value.


**Do** name your variables properly. Unit tests code still code.

**Why?** Naming variables and functions properly makes the test easy to understand.

**Do** name your tests in a clear form, The name of your test should consist of three parts:

* The name of the method being tested.
* The scenario under which it's being tested.
* The expected behavior when the scenario is invoked.

**Why?** Naming standards are important because they explicitly express the intent of the test.

**Why?** Tests should be named to easily identify what have broken when it fails.


**Do** use only one line for tests descriptions

**Why?** Longer descriptions are a indicative that you are testing too much on a single test unit.


**Avoid** logic in test code. Tests can't be complex to write.

**Why?** Less chance to introduce a bug inside of your tests.

**Why?** If your test is becaming complex, you are probably testing more than you should in a single test, consider break them into smaller tests

**Why?** Focus on the end result, rather than implementation details.

**Avoid** logic in test stubs or mocks. Setup multiple stubs/mocks if necessary.



**Do** create tests from simplest cases to more complex

**Why?** testing simple cases first allow that complex tests are less necessary

**Why?** testing simple cases first normally show the user what have broken first 


**Do** use the 3 A's convention to write your tests "Arrange, Act and Assert", Arrange, Act, Assert is a common pattern when unit testing. As the name implies, it consists of three main actions:

* Arrange your objects, creating and setting them up as necessary.
* Act on an object.
* Assert that something is as expected.

**Why?** Clearly separates what is being tested from the arrange and assert steps.

**Why?** Less chance to intermix assertions with "Act" code.


**Do** Arrange once. Prepare your objects in sequence, creating and setting them up as necessary.

**Why?** 


**Do** Act once. Execute the actions on your object only after your scenary is prepared.

**Why?** Executing actions multiple times 


**Do** Assert once. Validate only the result of the test and only after all the actions are done.

**Why?** Validate your preparations is a simptom of poor division of tests, if preparations can cause changes on your test result, test the preparations on a separated test.

**Why?** Asserting multiple times in a single test makes them hard to read.

**Why?** Assert multiple times during your tests make it slow to run.

**Do** consider mocking all external environment events, like date, time, timezone and language. 

**Why?** Tests shoudn't be affected by the environment conditions that it is running.

**Why?** Makes it easier to reproduce unusual scenarios.

Setting up your environment, allows you to write more precise tests.

**Do** use beforeEach and afterEach wisely. Only use them for setup when it's something clear to understand.

**Why?** Having all your setup inside your test make it easier to understand.

**Why?** Less chance of setting up too much or too little for the given test.

**Why?** Less chance of sharing state between tests which creates unwanted dependencies between them.


## Unit tests

Unit tests are responsible to test units of code in isolation. Units of code can be understood as functions, properties and variables.

Unit tests are tests that should cover the code that you've written. It is responsible to assure that unwanted chances in your code exposes possible failures. 

Unit tests should not be dependent on external code. Unit tests should be responsible for assuring that some lines of code are been executed properly. If your code depends on a external function or variable, those has to be mocked or stubbed and their code have to be tested by their own unit tests.

**Do** write tests to cover code that are contained on a single file.

**Why?** Creating tests that cross code boundaries is test more than it's responsabilities.

**Why?** Errors on external dependencies should not break your unit tests.

**Why?** Tests that cross boundaries should be tested as Integration Tests.


**Do** mock or stub all dependencies. With exception of frameworks dependencies or public libraries.

**Why?** 

**Do** validate private methods by unit testing public methods that consumes it.

**Why?** Private methods still have to be tested.

**Why?** Private methods shoudn't be exposed only for testing purposes

### Typescript

**Do** not load any application modules

**Why?** 

**Avoid** creating big classes to mock or stub dependencies




### HTML

**Do** only test code that don't are affected by Typescript code


<a href="#toc">Back to top</a>

Integration Tests

Integration tests should not be used to test single  

**Do** rite tests that cross border with another file

Avoid 