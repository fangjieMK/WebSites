function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
function formatPrice(price) {
  return '¥' + price.toLocaleString() + '/月';
}
function formatDate(date) {
  return new Date(date).toLocaleDateString('zh-CN');
}
