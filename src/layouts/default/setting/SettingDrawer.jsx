import {TypePicker} from './components'

import {defineComponent} from 'vue'

export default defineComponent({
  name: 'SettingDrawer',
  setup() {
    function renderSidebar( ) {
      return (
          <TypePicker>
          </TypePicker>
      )
    }

    return () =>
    <>
      <div>
        {renderSidebar()}
      </div>
    </>
  }
})