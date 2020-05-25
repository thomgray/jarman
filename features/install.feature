Feature: Install

    Install feature

    Scenario: Install a jar
        Given a jar file exists
        And jarman is initialised
        When I install the jar file
        And I execute the "hello" command
        Then the jar file is run

    Scenario: List managed version
        Given a hello world jar file exists
            | name    | hello |
            | version | 1.0.0 |
        And jarman is initialised
        When I install the jar file
        And I list the managed versions of "hello"
        Then the list includes versions
            | 1.0.0 |

    Scenario: List current version
        Given a hello world jar file exists
            | name    | hello |
            | version | 1.0.0 |
        And jarman is initialised
        When I install the jar file
        And I get the current versions of "hello"
        Then the output is "1.0.0"
