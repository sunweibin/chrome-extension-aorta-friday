const fse = require('fs-extra');

const {
  ProjectPackageJson,
  ChromePublicPath,
  ChromeExtensionPath,
  ChromeExtensionFilesPath,
} = require('./buildConfig');

const {
  updateExtensionManifestVersion,
} = require('./buildUtils');

const PackageJson = require(ProjectPackageJson);


async function buildChromeExtension() {
  // 1. 清空以前创建的 Chrome 插件目录
  fse.removeSync(ChromeExtensionPath);

  // 2. 生成用于存放 Chrome 插件文件的目录
  fse.ensureDirSync(ChromeExtensionPath);

  // 3. 将 Chrome 公共的文件复制到 Chrome 插件所在目录
  fse.copySync(ChromePublicPath, ChromeExtensionPath);

  // 4. 将项目 dist 下的打包文件，复制到 Chrome 插件所在目录
  fse.copySync(ChromeExtensionFilesPath, ChromeExtensionPath);

  // 读取项目 Package.json 的 version 赋值给 Chrome 插件的 manifest.json
  // 5. 更新 Chrome 插件版本
  updateExtensionManifestVersion(PackageJson.version);
}


buildChromeExtension();
