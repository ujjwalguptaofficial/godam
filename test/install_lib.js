const { readFileSync } = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const content = readFileSync("../package.json");

const packageInfo = JSON.parse(content);

if (packageInfo) {
    const version = packageInfo.version;
    console.log('version', version);
    execSync(`npm i ../godam-${version}.tgz`);
}
else {
    throw "no package found";
}