const fs = require('fs');

module.exports = (env_name, def = null, encoding = 'utf8') => {
    const e = process.env;
    if(e[env_name] && e[env_name].trim() !== '') {
        return e[env_name];
    }

    const env_file = `${env_name}_FILE`;
    if(e[env_file] &&
        e[env_file].trim() !== '' &&
        fs.existsSync(e[env_file]) &&
        fs.statSync(e[env_file]).isFile()) {
        return fs.readFileSync(e[env_file], {
            encoding
        });
    }

    return def;
}