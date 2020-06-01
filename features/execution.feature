Feature: launcher execution

    launcher scripts work as expected

    Background: jarman is initialized
        Given jarman is initialized

    Scenario: Install a jar
        Given a hello world jar file exists
            | name    | hello |
            | version | 1.0.0 |
        When I install the jar file
        And I execute the "hello" command
        Then the jar file is run

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

# check for output of jars with different implementations
# check for command line args
# java options? might be a `jarman launch` or `exec` command
# install another jar with same version - check output is the new one