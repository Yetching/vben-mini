import { primaryColor, themeMode } from '../../build/config/themeConfig.js';
import {
  MenuTypeEnum,
  MenuModeEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from '/@/enums/menuEnum.js';
import {
  SIDE_BAR_BG_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
} from './designSetting';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
} from '/@/enums/appEnum.js';
import { CacheTypeEnum } from '/@/enums/cacheEnum.js';
const setting = {
  //设置按钮
  showSettingButton: true,
  //设置按钮的位置
  settingButtonPosition: SettingButtonPositionEnum.AUTO,
  //权限访问模式
  permissonMode: PermissionModeEnum.ROLE,
  //权限访问缓存模式
  permissonCacheType: CacheTypeEnum.LOCAL, //1： local  0： session
  //主题颜色
  themeColor: primaryColor,
  //主题模式 黑暗主题
  themeMode: themeMode,
  //灰色模式，悼念日
  grayMode: false,
  //色弱模式
  colorWeak: false,
  //是否取消菜单，顶部，多标签页显示，为可能嵌入其他系统
  fullContent: false,
  contentType: ContentEnum.FULL,
  showLogo: true,
  showFooter: false,
  headerSetting: {
    // header bg color
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // Fixed at the top
    fixed: true,
    // Whether to show top
    show: true,
    // theme
    theme: ThemeEnum.LIGHT,
    // Whether to enable the lock screen function
    useLockPage: true,

    // Whether to show the full screen button
    showFullScreen: true,
    // Whether to show the document button
    showDoc: true,
    // Whether to show the notification button
    showNotice: true,
    // Whether to display the menu search
    showSearch: true,
  },

  // Menu configuration
  menuSetting: {
    // sidebar menu bg color
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    //  Whether to fix the left menu
    fixed: true,
    // Menu collapse
    collapsed: false,
    // Whether to display the menu name when folding the menu
    collapsedShowTitle: false,
    // Whether it can be dragged
    // Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
    canDrag: false,
    // Whether to show no dom
    show: true,
    // Whether to show dom
    hidden: false,
    // Menu width
    menuWidth: 210,
    // Menu mode
    mode: MenuModeEnum.INLINE,
    // Menu type
    type: MenuTypeEnum.SIDEBAR,
    // Menu theme
    theme: ThemeEnum.DARK,
    // Split menu
    split: false,
    // Top menu layout
    topMenuAlign: 'center',
    // Fold trigger position
    trigger: TriggerEnum.HEADER,
    // Turn on accordion mode, only show a menu
    accordion: true,
    // Switch page to close menu
    closeMixSidebarOnChange: false,
    // Module opening method ‘click’ |'hover'
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // Fixed expanded menu
    mixSideFixed: false,
  },

  // Multi-label
  multiTabsSetting: {
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true,
    // Turn on quick actions
    showQuick: true,

    // Whether to show the refresh button
    showRedo: true,
    // Whether to show the collapse button
    showFold: true,
  },

  // Transition Setting
  transitionSetting: {
    //  Whether to open the page switching animation
    // The disabled state will also disable pageLoadinng
    enable: true,

    // Route basic switching animation
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading
    // Only open when enable=true
    openPageLoading: true,

    // Whether to open the top progress bar
    openNProgress: false,
  },

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  openKeepAlive: true,

  // Automatic screen lock time, 0 does not lock the screen. Unit minute default 0
  lockTime: 0,

  // Whether to show breadcrumbs
  showBreadCrumb: true,

  // Whether to show the breadcrumb icon
  showBreadCrumbIcon: false,

  // Use error-handler-plugin
  useErrorHandle: false,

  // Whether to open back to top
  useOpenBackTop: true,

  //  Is it possible to embed iframe pages
  canEmbedIFramePage: true,

  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: true,

  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // If it is enabled, I want to overwrite a single interface. Can be set in a separate interface
  removeAllHttpPending: false,
};

export default setting;
