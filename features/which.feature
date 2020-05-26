Feature: which

    which command

    Background: jarman is initialized
        Given jarman is initialized

    Scenario: which version is selected
        Given a hello world jar is installed
            | name    | hello |
            | version | 1.0.0 |
        When I get the current version of "hello"
        Then the output is "1.0.0"
