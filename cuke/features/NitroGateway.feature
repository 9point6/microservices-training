Feature: NitroGateway Feature
AS A User
I WANT to add in one place my favourite episodes, clips and programmes
SO THAT I can revisit them
 
Scenario: provide asset for specific pid
  Given I get an asset with pid abc
  When the pid exists
  Then the response of the pid has the following attributes
  |pid|
  |title|
  |image|
  |type|
