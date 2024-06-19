# 属性更新

## attribute 与 property

### attribute 与 property 的区别

- `attribute` 简单理解为直接在 HTML 中的属性
- `property` 则为 JS 中的对象属性

### 举个例子

```html
<input class="a" value="b" data-id="id" others="other" />
```
在这个例子中，我们一共出现了四种类型的赋值操作：

<md-code ref="./001.ts">
<md-code-note slot="3-3">

1. Attribute 和 Property 同名的赋值。例如 `value`

</md-code-note>

<md-code-note slot="4-4">

2. Attribute 和 Property 不同名的赋值。例如 `class` 与 `className`

</md-code-note>

<md-code-note slot="5-5">

3. 特殊属性的赋值。例如 `data-x` 和 `dataset.x`

</md-code-note>

<md-code-note slot="6-6">

4. 标准 Attribute 的赋值。例如不在 DOM 对象上定义的属性

</md-code-note>

</md-code>

<md-qa qid="why-react-keep-input-value-sync">
  为什么 input 中 value 的 attribute 和 property 明明不会相互 reflect，为啥最终效果上，React 还是会表现的一致呢？这是否会导致性能的下降？以及还有那些框架采用这样的策略？
</md-qa>

## 赋值与更新

知道了这两者的区别之后，接下来的一个问题就是我该怎么决定是用 attribute 更新还是 property 更新呢？

其实严格来说，两者有没太过于本质的区别，对于基于模板这类框架的方式来说，使用 attribute 会更加合适，而如果是基于 JS 的框架，则使用 property 会更加合适。

首先，我们先来修改一下 helper 函数，添加上属性更新的方法。

<md-code diff="helper.ts,helper-2.ts"></md-code>

再以上面那个例子，来看下如何进行更新

<md-code ref="./update-props.svelte"></md-code>

<md-code ref="./update-props.ts">

<md-code-note slot="23-34">

根据源码，这里无需定义所有的变量检查，只需要定义变化的即可。这里全部写上方便展示

</md-code-note>

</md-code>

## 精准更新

这部分的更新策略和<md-link href="../04-changes">前一章</md-link>一致，就不再赘述
