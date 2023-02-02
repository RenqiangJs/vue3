import { ref, watch } from 'vue'
export interface MessageType {
  GET_DATA_IF_FAILED?: string;
  GET_DATA_IF_SUCCEED?: string;
  EXPORT_DATA_IF_FAILED?: string;
  EXPORT_DATA_IF_SUCCEED?: string;
}
export interface OptionsType {
  requestError?: () => void;
  requestSuccess?: () => void;
  message: MessageType;
}
export default function useList<
  ItemType extends Object,
  FilterOption extends Object
>(listRequestFn: Function, filterOption,exportRequestFn?: Function) {
  // 加载态
  const loading = ref(false)
  // 当前页
  const curPage = ref(1)
  // 总数量
  const total = ref(0)
  // 分页大小
  const pageSize = ref(10)
  const list = ref<ItemType[]>([])
  const loadData = async (page = curPage.value) => {
    // 设置加载中
    loading.value = true
    try {
      const {
        data,
        meta: { total: count },
      } = await listRequestFn(pageSize.value, page, filterOption.value)
      list.value = data
      total.value = count
    } catch (error) {
      console.log('请求出错了', 'error')
    } finally {
      // 关闭加载中
      loading.value = false
    }
  }
  const exportFile = async () => {
    if (!exportRequestFn) {
      throw new Error("当前没有提供exportRequestFn函数");
    }
    if (typeof exportRequestFn !== "function") {
      throw new Error("exportRequestFn必须是一个函数");
    }
    try {
      const {
        data: { link },
      } = await exportRequestFn(filterOption.value);
      window.open(link);
    } catch (error) {
      console.log("导出失败", "error");
    }
  };
  const reset = () => {
    if (!filterOption.value) return;
    const keys = Reflect.ownKeys(filterOption.value);
    filterOption.value = {} as FilterOption;
    keys.forEach((key) => {
      Reflect.set(filterOption.value!, key, undefined);
    });
  watch([curPage, pageSize], () => {
    loadData(curPage.value)
  })
}
