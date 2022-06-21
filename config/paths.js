const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  appPath: resolveApp('.'),
  appDist: resolveApp('dist'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
};

