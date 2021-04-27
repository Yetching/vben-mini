import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();

export const footerProps = {
  confirmLoading: {
    type: Boolean,
  },
  showCancelBtn: {
    type: Boolean,
    default: true,
  },
  cancelButtonProps: {
    type: Object,
  },
  cancelText: {
    type: String,
    default: t('common.cancelText'),
  },
  showOkBtn: {
    type: Boolean,
    default: true,
  },
  okButtonProps: {
    type: Object,
  },
  okText: {
    type: String,
    default: t('common.okText'),
  },
  okType: {
    type: String,
    default: 'primary',
  },
  showFooter: {
    type: Boolean,
  },
  footerHeight: {
    type: [String, Number],
    default: 60,
  },
};

export const basicProps = {
  placement: {
    type: String,
    default: 'right',
  },
  isDetail: {
    type: Boolean,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: 300,
  },
  loadingText: {
    type: String,
  },
  showDetailBack: {
    type: Boolean,
    default: true,
  },
  visible: {
    type: Boolean,
  },
  loading: {
    type: Boolean,
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
  getContainer: {
    default: 'body',
  },
  scrollOptions: {
    type: Object,
    default: null,
  },
  closeFunc: {
    type: Function,
    default: null,
  },
  triggerWindowResize: {
    type: Boolean,
  },
  destroyOnClose: {
    type: Boolean,
  },
  ...footerProps,
};
