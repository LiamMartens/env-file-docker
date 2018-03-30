const fs = require('fs');

/**
 * Possible types for preferring
 */
const PreferTypes = Object.freeze({
    FILE: 'FILE',
    ENV: 'ENV'
});

/**
 * Attempts to fetch an environment variable by looking at the _FILE param
 * 
 * @param string env_name 
 * @param string encoding
 */
const envFromFile = (env_name, encoding = 'utf8') => {
    const e = process.env;

    const env_file = `${env_name}_FILE`;
    if(e[env_file] &&
        e[env_file].trim() !== '' &&
        fs.existsSync(e[env_file]) &&
        fs.statSync(e[env_file]).isFile()) {
        return fs.readFileSync(e[env_file], {
            encoding
        });
    }

    return null;
}

/**
 * Attempts to read an environment variable as is
 * 
 * @param string env_name 
 */
const envFromEnv = (env_name) => {
    const e = process.env;

    if(e[env_name] && e[env_name].trim() !== '') {
        return e[env_name];
    }

    return null;
}

/**
 * Attempts to read an env file from either _FILE or as is
 * 
 * @param string env_name 
 * @param mixed def 
 * @param string encoding 
 */
const envFile = (env_name, def = null, encoding = 'utf8') => {
    let fromFile;
    let fromEnv;

    if(envFile.PreferType === PreferTypes.FILE) {
        if((fromFile = envFromFile(env_name, encoding)) !== null) {
            return fromFile;
        }

        if((fromEnv = envFromEnv(env_name)) !== null) {
            return fromEnv;
        }

        return def;
    }

    if((fromEnv = envFromEnv(env_name)) !== null) {
        return fromEnv;
    }

    if((fromFile = envFromFile(env_name, encoding)) !== null) {
        return fromFile;
    }

    return def;
}

envFile.PreferType = PreferTypes.FILE;
envFile.setPreferType = pt => {
    envFile.PreferType = pt;
}

module.exports = envFile;
module.exports.PreferTypes = PreferTypes;