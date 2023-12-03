const hasPort = url => {
    const portRegex = /:\d+/;
    return portRegex.test(url);
};

export const url = !hasPort(origin) ? origin : origin.replace(/(^[^:]*:[^:]*):.*$/, '$1') + ':3884';

