Feature: use

    use command

    Background: jarman is initialized
        Given jarman is initialized

    Scenario: use alternate version
        Given a hello world jar is installed
            | name    | hello |
            | version | 1.0.0 |
        And a hello world jar is installed
            | name    | hello |
            | version | 1.1.0 |
        And the current version of "hello" is "1.1.0"
        When I use version "1.0.0" of "hello"
        And I get the current version of "hello"
        Then the output is "1.0.0"
        # And
        When I use version "1.1.0" of "hello"
        And I get the current version of "hello"
        Then the output is "1.1.0" 
        
