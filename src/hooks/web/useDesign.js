import { useAppProviderContext } from '/@/components/Application/src/useAppContext';

export function useDesign(scope) {
  const values = useAppProviderContext();

  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVal: values.prefixCls,
  };
}
