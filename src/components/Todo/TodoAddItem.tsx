import React, { KeyboardEvent } from 'react';
import { TodoAddItemInput } from 'styles';
import { useTodoStore } from 'hooks';

function TodoAddItem() {
  const { addItem } = useTodoStore();

  const onAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    /**
     * e : KeyboardEvent<HTMLInputElement>
     * -> 위처럼 지정시 e.target.value 사용 불가
     * 사용하려는 KeyboardEvent도 DOM 요소나 window 객체에서 발생할 수 있으므로,
     *  이론적으로는 event.target을 요소로 정의하는 것은 의미가 없습니다.
     * DOM 요소에 대한 이벤트라면 event.target을 안전하게 가정할 수 있습니다.
     * 타겟이되는 HTMLElement의 타입을 TypeScript에 명시 적으로 전달해야합니다.
     * 따라서 적절한 Element 유형으로 캐스팅해서 사용해야합니다.
     */
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter' && target.value !== '') {
      addItem({ text: target.value });
      target.value = '';
    }
  };

  return <TodoAddItemInput placeholder="+ Todo" onKeyDown={onAddItem} />;
}

export default React.memo(TodoAddItem);