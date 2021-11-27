# 属性更新

## Attribute 与 Property

### Attribute 与 Property 两者并不等价

### 举个例子

```html
<input
  class="a"
  value="b"
  data-id="id"
  others="other"
/>
```

<md-code ref="03/001.ts"></md-code>

在这个例子中，我们一共出现了四种类型的赋值操作：

- Attribute 和 Property 同名的赋值。例如 `value`
- Attribute 和 Property 不同名的赋值。例如 `class` 与 `className`
- 特殊属性的赋值。例如 `data-x` 和 `dataset.x`
- 标准 Attribute 的赋值。例如不在 DOM 对象上定义的属性

<md-qa qid="why-react-keep-input-value-sync">
  为什么 input 中 value 的 attribute 和 property 明明不会相互 reflect，为啥最终效果上，React 还是会表现的一致呢？这是否会导致性能的下降？以及还有那些框架采用这样的策略？
</md-qa>

## 赋值与更新

在了解了上面的各种赋值方式之后，于是我们便可以开始考虑后续的更新操作了。还是用上文的例子，只不过我们这次将值换成对应的插值表达式。

```html
<input
  class={className}
  value={value}
  data-id={dataId}
  others={other}
/>
```

<md-code ref="03-002.ts"></md-code>
