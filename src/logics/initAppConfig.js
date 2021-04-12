import projectSetting from '/@/settings/projectSetting';
import { Persistent } from '/@/utils/cache/persistent';
import { deepMerge } from '/@/utils';

export function initAppConfigStore() {
  // let projCfg = Persistent.getLocal(PROJ_CFG_KEY);
  // projCfg = deepMerge(projectSetting, projCfg || {});
  console.log(projectSetting);
}
