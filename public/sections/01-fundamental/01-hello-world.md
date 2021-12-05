# 入门第一课，Hello World

本篇文章主要的讲解内容是如何快速的让我们建立起对 Svelte 最开始的印象，以及核心的思考逻辑和方式，方便为日后的学习打下基础。

## Hello World

我们以 Web 届的 Hello World 作为开场示例，比如有如下 HTML 结构：

<md-code ref="01-001.html"></md-code>

利用 DOM API 来实现这段 HTML 其实是一件非常简单的事情：

<md-code ref="01-002.ts"></md-code>

<md-note type="preknowledge">

<md-note-title link="https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API">

`createElement` 与 `appendChild`

</md-note-title>

这里主要使用了 DOM 的创建 `document.createElement` 以及添加到 DOM 树上 `appendChild` 的 API。

</md-note>

很简单，通过几行代码我们就实现了将一段静态 HTML 模板渲染到 DOM 上的能力。不同于其他的框架会带有非常庞大的运行时，比如要实现 Virtual DOM 的 Diff/Patch 能力，我们这段代码没有任何多余的运行逻辑。

而 Svetle 最核心的思想也就来源于此，它让编译的过程变得尽可能智能，尽量去理解模板上的每一段逻辑，类似于有一个人一样将结果翻译出来。

这个思路通常也被叫做**静态展开**，了解过编译型语言的小朋友或许对这个一点也不陌生，在很多语言的编译器中，也都有着类似的能力。

> 「静态展开」，也就是将在编译期间可以确定的内容用静态的方式输出下来。举个例子，比如最常见的枚举值的校验，通常是利用数组的 indexOf/includes 方法。 `['a', 'b', 'c'].includes(i)` 而通过静态展开便可以写成 `i === 'a' || i === 'b' || i === 'c'` 这样做的好处便是可以极大的提高运行效率，因为现代的 CPU 都有着强大的分支预测能力，在编译解析阶段就可以推测出你的意图，从而对代码进行优化，进而获得很不错的执行效率，但是缺点便是代码体积大，且难以人力维护。虽然这个缺点很致命，但是在现如今预编译技术的加持下，这点却变得不那么重要了。

了解了这个点之后，让我们顺着这个思路继续走下去，看看会发生什么。

其实讲到这里明眼人一看就看出来了，这样写的话可复用性太低，因为同一个模板不仅仅可能挂载到 body 上，还有可能挂载到其他的位置。

因此我们封装一个函数，并设定两个入参，分别是挂载标点和挂载锚点，后文简称**标点**和**锚点**。用于指定挂载的位置。

<md-code diff="01-002.ts,01-003.ts"></md-code>

此时我们就可以在任何需要这个元素片段的地方调用 `mount` 方法即可

```tsx
// 上文的例子就可以简写成
mount(document.body, null)

// 如果想要实现更加复杂的挂载方式，例如挂载到某个元素的头部
const container = document.querySelector('#menus')
mount(container, container.firstChild)
```

或许有的人看到这里就会豁然开朗，一个页面内的元素不就是类似于这样一个个 mount 函数堆砌而成么？没错，确实是这样的，但仅仅挂载是不够的，还需要更多的能力。

## 卸载

在了解了如何创建的之后，紧接而来的便是如何卸载。而卸载首先要知道的便是那些元素需要被卸载，而上面的纯函数并不能记录下这些信息，所以我们需要返回一个包含足够信息的对象。

<md-code diff="01-003.ts,01-004.ts"></md-code>

返回的对象中包含两个方法，分别是 `mount` 和 `destroy`，分别对应着添加元素和删除元素。

另外，为了更好的区分，我们将函数名从 `mount` 改为 `createBlock`，从而让整体更加符合语义。

此时最开始的例子可以写作。

```tsx
const block = createBlock(document.body, null)
block.mount()
// 等待使用完毕后
block.destroy()
```

## 总结

至此，我们可以说第一个脚指头刚刚踏入 Svelte 的大门，由上文可以总结出 Svelte 的一些特点：

- 几乎所有的页面内容都是由一个个不同的 Block 组合而成

> 本文的不是 Svelte 最终代码
