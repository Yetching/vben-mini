const MenuTypeEnum = {
  SIDEBAR: 'sidebar',
  MIX_SIDEBAR: 'mix-sidebar',
  MIX: 'mix',
  TOP_MENU: 'top-menu',
};

//折叠触发器位置
const TriggerEnum = {
  NODE: 'NONE',
  FOOTER: 'FOOTER',
  HEADER: 'HEADER',
};

const MenuModeEnum = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  VERTICAL_RIGHT: 'vertical-right',
  INLINE: 'inline',
};

const MenuSplitEnum = {
  NONE: 'NONE',
  TOP: 'TOP',
  LEFT: 'LEFT',
};

const TopMenuAlignEnum = {
  CENTER: 'center',
  START: 'start',
  END: 'end',
};

const MixSidebarTriggerEnum = {
  HOVER: 'hover',
  CLICK: 'click',
};

export {
  MenuModeEnum,
  MenuTypeEnum,
  MenuSplitEnum,
  TopMenuAlignEnum,
  MixSidebarTriggerEnum,
  TriggerEnum,
};
