Feature: Install

    Install feature

    Background: jarman is initialized
        Given jarman is initialized

    Scenario: Install a jar
        Given a hello world jar file exists
            | name    | hello |
            | version | 1.0.0 |
        When I install the jar file
        And I execute the "hello" command
        Then the jar file is run

    Scenario: Install a jar when a version is already installed
        Given a hello world jar is installed
            | name    | hello |
            | version | 1.0.0 |
        And a hello world jar file exists
            | name    | hello |
            | version | 1.0.1 |
        When I install the jar file
        And I get the current version of "hello"
        Then the output is "1.0.1"

    Scenario: Install a jar with name and version override
        Given a hello world jar file exists
            | name    | hello |
            | version | 1.0.0 |
        When I install the jar file with commands
            | name    | goodbye |
            | version | 3.0     |
        And I get the current version of "goodbye"
        Then the output is "3.0"
        # And
        When I get the current version of "hello"
        Then the command fails with status 1 and error "No executable found with the name 'hello'"
        # And
        When I execute the "goodbye" command
        Then the jar file is run
