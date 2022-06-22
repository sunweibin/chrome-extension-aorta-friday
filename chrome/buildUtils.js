const fse = require('fs-extra');

const {
  ChromeExtensionManifestJson,
} = require('./buildConfig');


/**
 * 使用 Package.json 中的 version 更新为 Chrome 插件的 manifest.json 的 version
 * @param {String} version 项目 Version
 */
function updateExtensionManifestVersion(version) {
  const manifestJson = fse.readJsonSync(ChromeExtensionManifestJson);

  if (version) {
    manifestJson.version = version;
  }

  fse.writeJsonSync(ChromeExtensionManifestJson, manifestJson);
}


module.exports = {
  updateExtensionManifestVersion,
};

