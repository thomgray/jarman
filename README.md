# jarman

install and execute jars

```
npm install -g jarman
```

## Usage

Simply write some code in your favourite JVM language and build a JAR.

```
jarman install /path/to/jar.jar
```

Now you can run your jar provided you export the jarman path into your `$PATH`

### Install

```
jarman install path/to/jar
```

options:
```
# don't copy the jar, just link the the specified location
--link
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

`jarman` simply creates a launcher script for your jars and stores them in a `bin` directory which can be added to your path.
