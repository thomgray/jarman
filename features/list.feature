Feature: list command

    Background: jarman is initialized
        Given jarman is initialized

    Scenario: list versions of application
        Given a hello world jar is installed
            | name    | hello |
            | version | 1.0.0 |
        When I list the managed versions of "hello"
        Then the list includes versions
            | 1.0.0 |

    Scenario: list installed applications
        Given a hello world jar is installed
            | name    | hello |
            | version | 1.0.0 |
        And a hello world jar is installed
            | name    | goodbye |
            | version | 1.0.0   |
        When I list manages applications
        Then the output is
            """
            goodbye
            hello
            """
