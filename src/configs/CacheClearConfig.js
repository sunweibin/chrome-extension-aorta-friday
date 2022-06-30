const CacheClearConifg = [
  {
    label: 'Cache',
    value: 'cache',
    enable: true,
    defaultChecked: true,
    suportOriginClear: true,
    tip: '清除浏览器缓存',
  },
  {
    label: 'Cookies',
    value: 'cookies',
    enable: true,
    defaultChecked: true,
    suportOriginClear: true,
    tip: '清除浏览器 Cookies 和证书',
  },
  {
    label: 'Local Storage',
    value: 'localStorage',
    enable: true,
    defaultChecked: true,
    suportOriginClear: true,
    tip: '清除浏览器 LocalStorage 和 SessionStorage',
  },
  {
    label: '下载记录',
    value: 'downloads',
    tip: '清除浏览器下载记录',
  },
  {
    label: 'AutoFill Form',
    value: 'formData',
    tip: '清除浏览器所有的自动完成的表单数据',
  },
  {
    label: '浏览记录',
    value: 'history',
    tip: '清除浏览器浏览的历史记录',
  },
  {
    label: '密码',
    value: 'passwords',
    tip: '清楚浏览器保存的所有密码，慎用！',
  },
  {
    label: 'Service Workers',
    value: 'serviceWorkers',
    tip: '清除浏览器的Service Worker数据',
  },
  {
    label: 'IndexedDB',
    value: 'indexedDB',
    tip: '清除浏览器IndexedDB数据',
  },
  {
    label: 'App Cache',
    value: 'appcache',
    tip: '清除浏览器所有应用程序的缓存',
  },
  {
    label: 'Cache Storage',
    value: 'cacheStorage',
    tip: '从网站的 Cache Storage 中清空浏览器缓存',
  },
  {
    label: 'File Systems',
    value: 'fileSystems',
    tip: '清空浏览器文件系统中的数据',
  },
  {
    label: 'Web SQL Data',
    value: 'webSQL',
    tip: '清空浏览器 Web SQL 数据',
  },
];


export default CacheClearConifg;
