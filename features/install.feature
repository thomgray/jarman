Feature: Install

    Install feature

    Background: jarman is initialized
        Given jarman is initialized

    Scenario: Install a jar
        Given a hello world jar file exists
            | name    | hello |
            | version | 1.0.0 |
        When I install the jar file
        Then a launcher exists for version "1.0.0" of "hello"
        And a jar is cached for version "1.0.0" of "hello"
        And there is a "hello" executable bin linked to version "1.0.0"

    Scenario: Install a jar when a version is already installed
        Given a hello world jar is installed
            | name    | hello |
            | version | 1.0.0 |
        And a hello world jar file exists
            | name    | hello |
            | version | 1.0.1 |
        When I install the jar file
        Then a launcher exists for version "1.0.0" of "hello"
        And a launcher exists for version "1.0.1" of "hello"
        And a jar is cached for version "1.0.0" of "hello"
        And a jar is cached for version "1.0.1" of "hello"
        And there is a "hello" executable bin linked to version "1.0.1"

    Scenario: Install a jar with name and version override
        Given a hello world jar file exists
            | name    | hello |
            | version | 1.0.0 |
        When I install the jar file with commands
            | name    | goodbye |
            | version | 3.0     |
        Then a launcher exists for version "3.0" of "goodbye"
        And a jar is cached for version "3.0" of "goodbye"
        And no launcher exists for version "1.0.0" of "hello"
        And no jar is cached for version "1.0.0" of "hello"
        And there is a "goodbye" executable bin linked to version "3.0"
        And there is no "hello" executable
