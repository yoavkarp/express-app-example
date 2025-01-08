import path from 'path';
import fs from 'fs';
import packageJson from '../package.json';

const supportedVersions = ["1.0.17", "^1.0.17"];

const fix = () => {

    if (!supportedVersions.includes(packageJson.devDependencies['@types/passport'])) {
        console.log("Your version of @types/passport is not supported. Please update to one of the following versions: ", supportedVersions.join(', '));
        return;
    }

    const typesfile_path = path.join(__dirname, '../node_modules/@types/passport/index.d.ts');
    const typesfile = fs.readFileSync(typesfile_path, 'utf8');
    const fixed_typesfile = typesfile.replace('interface User { }', '').replace('user?: User | undefined;', '');

    if (typesfile === fixed_typesfile) {
        console.log("Already fixed, nothing found to fix");
        return;
    }

    fs.writeFileSync(typesfile_path, fixed_typesfile);

    console.log("Fixed @types/passport");
}

fix()