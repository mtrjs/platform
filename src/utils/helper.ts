/**
 * 格式化一个文件大小单位, 小于1024 转为 kb, 大于转为 mb
 *
 * @export
 * @param {number} size
 * @return {*}
 */
export function formatSize(size: number) {
  size = Number(size);
  if (!size) return size;
  if (size <= 1024) {
    return `${size} b`;
  }

  size = Number((size / 1024).toFixed(2));
  if (size <= 1024) {
    return `${size} kb`;
  }

  const mbSize = (size / 1024).toFixed(2);

  return `${mbSize} mb`;
}
