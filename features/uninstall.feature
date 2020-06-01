Feature: uninstall

    uninstall command

    Background: jarman is initialized
        Given jarman is initialized

    Scenario: Uninstall a version
        Given a hello world jar is installed
            | name    | hello |
            | version | 1.0.0 |
        And a hello world jar is installed
            | name    | hello |
            | version | 2.0.0 |
        When I uninstall version "1.0.0" of "hello"
        Then no launcher exists for version "1.0.0" of "hello"
        And no jar is cached for version "1.0.0" of "hello"
        And the current version of "hello" is "2.0.0"

    Scenario: Uninstall an entire application
        Given a hello world jar is installed
            | name    | hello |
            | version | 1.0.0 |
        And a hello world jar is installed
            | name    | hello |
            | version | 2.0.0 |
        When I uninstall "hello" wholesale
        Then no versions exist of "hello"
        And there is no "hello" executable

    @todo
    Scenario: Uninstall versions with willdcarded major version
        Given a hello world jar is installed
            | name    | hello |
            | version | 1.0.0 |
        And a hello world jar is installed
            | name    | hello |
            | version | 1.1.0 |
        And a hello world jar is installed
            | name    | hello |
            | version | 2.0.0 |
        When I uninstall version "1.*" of "hello"
        Then no launcher exists for version "1.0.0" of "hello"
        And no jar is cached for version "1.0.0" of "hello"
        And no launcher exists for version "1.1.0" of "hello"
        And no jar is cached for version "1.1.0" of "hello"
        And a launcher exists for version "2.0.0" of "hello"
        And a jar is cached for version "2.0.0" of "hello"
        And the current version of "hello" is "2.0.0"
