Feature: list command

    Background: jarman is initialized
    Given jarman is initialized

    Scenario: Scenario name
        Given a hello world jar is installed
            | name    | hello |
            | version | 1.0.0 |
        When I list the managed versions of "hello"
        Then the list includes versions
            | 1.0.0 |
