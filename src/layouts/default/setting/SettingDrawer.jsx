import {TypePicker} from './components'

import {baseHandler} from './handler'

import {defineComponent, unref} from 'vue'
import { menuTypeList, HandlerEnum } from './enum'

import {useMenuSetting} from '/@/hooks/setting/useMenuSetting'

import {AppDarkModeToggle} from '/@/components/Application'
import { Divider } from 'ant-design-vue'
import {BasicDrawer} from '/@/components/Drawer/index'

import {useI18n} from '/@/hooks/web/useI18n'

export default defineComponent({
  name: 'SettingDrawer',
  setup(props, {attrs}) {
    const {t} = useI18n()
    const {
      getIsHorizontal,
      getMenuType
    } = useMenuSetting()
    function renderSidebar( ) {
      return (
          <TypePicker
            menuTypeList={menuTypeList}
            handler={(item) => {
              baseHandler(HandlerEnum.CHANGE_LAYOUT, {
                mode: item.mode,
                type: item.type,
                split: unref(getIsHorizontal) ? false: undefined
              })
            }}
            def={unref(getMenuType)}>
          </TypePicker>
      )
    }

    return () =>
    <BasicDrawer
     {...attrs}
     title={t('layout.index.setting.drawerTitle')}
     width={330}
     >
       <Divider>{()=> t('layout.index.setting.darkMode')}</Divider>
      <AppDarkModeToggle class="mx-auto"/>
      <Divider>{() => t('layout.index.setting.navMode')}</Divider>
      {renderSidebar()}
    </BasicDrawer>
  }
})