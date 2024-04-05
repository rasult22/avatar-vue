import { Ref, computed, ref } from 'vue';


export default function useQueue<T>(initialValue: T[] = []) {
  const queue = ref<T[]>(initialValue) as Ref<T[]>

  const add = (el: T) => {
    queue.value = [...queue.value, el]
  }


  const remove = () => {
    const [first, ...q] = queue.value
    queue.value = q

    return first;
  }

  const clear = () => {
    queue.value = []
  }

  return {
    add,
    remove,
    clear,
    first: computed<T>(() => queue.value[0]),
    last: computed<T>(() => queue.value[queue.value.length - 1]),
    size: computed(() => queue.value.length),
    queue,
  };
}