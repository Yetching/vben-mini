import { Modal, message as Message, notification } from 'ant-design-vue';
import { InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';

import { ArgsProps, ConfigProps } from 'ant-design-vue/lib/notification';
import { useI18n } from './useI18n';

function getIcon(iconType) {
  if(iconType === 'warning') {
    return <InfoCircleFilled class="modal-icon-warning" />
  }else if (iconType === 'success') {
    return <CheckCircleFilled class="modal-icon-success" />
  }else if(iconType === 'info') {
    return <InfoCircleFilled class="modal-icon-info"/>
  }else {
    return <CloseCircleFilled class="modal-icon-error"/>
  }
}

function renderContent({content}) {
  return <div innerHTML={`<div>${content}</div>`}></div>
}

function createConfirm(options) {
  const iconType = options.iconType || 'warning'
  Reflect.deleteProperty(options, 'iconType')
  const opt ={
    centered: true,
    icon: getIcon(iconType),
    ...options
  }
  return Modal.confirm(opt)
}

const getBaseOptions = () => {
  const {t} = useI18n()
  return {
    okText: t('common.okText'),
    centered: true
  }
}

function

export function useMessage() {
  return {
    createMessage: '777'
  }
}