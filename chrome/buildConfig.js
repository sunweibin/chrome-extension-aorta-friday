const path = require('path');

const workspaceRootPath = path.join(__dirname, '../');
const ProjectPackageJson = path.join(workspaceRootPath, 'package.json');
const ChromePublicPath = path.join(workspaceRootPath, 'chrome/public');
const ChromeExtensionPath = path.join(workspaceRootPath, 'aorta-friday-chrome-extension');
const ChromeExtensionManifestJson = path.join(ChromeExtensionPath, 'manifest.json');
const ChromeExtensionFilesPath = path.join(workspaceRootPath, 'dist');
// const releaseRootPath = path.join(workspaceRootPath, 'release');


module.exports = {
  ProjectPackageJson,
  ChromeExtensionManifestJson,
  ChromePublicPath,
  ChromeExtensionPath,
  ChromeExtensionFilesPath,
};
