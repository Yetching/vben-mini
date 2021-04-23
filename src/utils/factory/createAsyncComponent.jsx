import {defineAsyncComponent} from 'vue'

import {Spin} from 'ant-design-vue'
import {noop} from '/@/utils/index'

export function createAsyncComponent(loader, options = {}) {
  const {size = 'small', delay = 100, timeout = 30000, loading = false,retry = true} = options
  return defineAsyncComponent({
    loader,
    //加载异步时使用的组件  骨架屏
    loadingComponent: loading ? <Spin spining={true} size={size} />: undefined,
    timeout,
    delay,
    onError: !retry? noop: (error, retry, fail,attempts) => {
      if(error.message.match(/fetch/) && attempts <=3) {
        retry()
      }else {
        fail()
      }
    }
  })
}