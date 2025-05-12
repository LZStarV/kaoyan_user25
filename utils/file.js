function openFile(filePath) {
  wx.openDocument({
    filePath: filePath,
    success: function (res) {
      console.log('打开文件成功');
    },
    fail: function (err) {
      console.error('打开文件失败：', err);
    }
  });
}
export {openFile}