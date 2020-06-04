# jarman

Install and execute jars

Sick and tired of typing `java -jar ....`? Why can't you keep JVM application on your `$PATH` and execute them like any other
native program?

```
npm install -g jarman
```

## Usage

Simply write some code in your favourite JVM language and build a JAR.

```
jarman install /path/to/hello.jar
```

This will create a launcher executable that will run the jar file on the JVM.
Simply add the jarman launcher bin dir to your `$PATH`.

```
export PATH="$PATH:$(jarman --path)"

## or ideally, extend your path in your bash_profile (or equivalent)
echo "\n## JARMAN\nexport PATH=$PATH:$(jarman --path)" >> ~/.bash_profile
```

Now you can run your jar by executing `hello`.

For further help, execute `jarman help` or `jarman help <cmd>`.

### Install

```
jarman install path/to/jar
```

options:
```
--link:              don't copy the jar file, link the launcher to the current jar's location
--name <name>:       override the application name (default in manifest)
--version <version>: override the application version (default in manifest)
```

### List

List all programs managed by jarman
```
jarman list
```

list all versions of the specified program
```
jarman list hello
```

### Use

Use the specified version of your program

```
jarman use hello 0.1.1
```

### Which

Output the current version of your program

```
jarman which hello

```

## Under the hood

When you install a jar file, a few things happen:

1. Unless you specify the `--link` flag, a copy of your jar file is added to the jarman versioned jars directory.
1. A launcher is written that simply executes the `java -jar` command with the specified jar.
1. A link to the versioned launcher script it added to the jarman bin directory (which should be added to your `$PATH`).

The name and version of the application are lifted from the jar's `MANIFEST.MF` file.
They can be overridden by install options (see `jarman help install`)

