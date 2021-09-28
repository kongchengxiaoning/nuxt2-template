import request from '@/utils/request'

/**
 * @description 上传表单信息
 * @parme {String} name 名字
 * @parme {String} phone 手机
 * @parme {String} industry 行业
 * @parme {String} area 地区
 */
export const setFormSave = (data) => {
  return request({
    url: '/admin/api/save',
    method: 'POST',
    data
  })
}
