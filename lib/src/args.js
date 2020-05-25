const processArgs = (args) => {
    args = args.reverse();

    const parsed = {
        args: {},
        flags: [],
        positional: [],
        command: undefined
    }

    let arg;
    while (args.length) {
        arg = args.pop();

        let flag = readFlag(arg);
        let argument = readArg(arg);

        if (argument != undefined) {
            let value = args.pop()
            parsed.args[argument] = value;
        } else if (flag != undefined) {
            parsed.flags.push(flag);
        } else if (!parsed.command) {
            parsed.command = arg;
        } else {
            parsed.positional.push(arg);
        }

    }
    return parsed;
};

const readArg = (input) => {
    switch (input) {
        case '--name':
        case '-n':
            return 'name';
        case '--version':
        case '-v':
            return 'version';
    }
    return undefined;
}

const readFlag = (input) => {
    switch (input) {
        case '--help':
        case '-h':
            return 'help';
        case '--path':
            return 'path';
    }

    if (input.startsWith('--')) {
        return input.slice(2);
    } else if (input.startsWith('-')) {
        return input.slice(1);
    }
    return undefined;
}

module.exports = processArgs;