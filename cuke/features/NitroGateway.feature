Feature: NitroGateway Feature
AS A User
I WANT to add in one place my favourite episodes, clips and programmes
SO THAT I can revisit them
 
Scenario: Validation of asset request for specific pid
  Given An asset with pid abc is being requested
  When the pid exists in PIPS database
  Then the response of the pid has the following attributes
    | pid   |
    | title |
    | image |
    | type  |

Scenario: Validation of non-existing asset request for specific pid
  Given An asset with pid hahaha is being requested
   When the pid does not exist in PIPS database
   Then An error is thrown as not found
