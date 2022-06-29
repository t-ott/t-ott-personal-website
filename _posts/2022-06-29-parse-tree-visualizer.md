---
layout: inner
position: right
title: Jack Syntax Analyzer and Parse Tree Visualizer
date: 2022-06-29
tags: jack compiler syntax analyzer parse tree d3 pyscript
lead_text: 'Visualize the internals of high-level language compilation by plotting the parse trees of Jack classes with D3.js.'
featured_image: 'img/posts/2022/06-29_parse-tree-visualizer.png'
project_link: '2022/06/29/parse-tree-visualizer'
button_text: 'See full post'
---
# Jack Syntax Analyzer and Parse Tree Visualizer

*Feel free to [skip directly to the parse tree visualizer]({{ site.baseurl }}/parse-tree-visualizer/).*

Trying to build something from scratch is a great way to learn how it works. More generally, breaking down a complex system to its most basic components then reassembeling from there can be an effective way to understand it. This approach is often referred to as [first principles thinking](https://fs.blog/first-principles/){:target="_blank" rel="noopener"}.

A modern computer is an example of a highly complex system. However, its operation is really just a complicated dance of a limited set of basic components. All software ever written is executed by a central processing unit as a series of binary instructions after all. Just ones and zeros. Well, *nearly* all software... this doesn't apply to quantum computing, and apparently there are such things as [ternary computers](https://en.wikipedia.org/wiki/Ternary_computer){:target="_blank" rel="noopener"}?

Setting out to build a computer from scratch is an intimidating task. Where would you even start? One option is to start at the logic gate level. [Noam Nisan and Shimon Schocken's Nand to Tetris course](https://www.nand2tetris.org/){:target="_blank" rel="noopener"} starts from here. The course takes you from this elementary logic level, through virtual hardware programming, machine code assembly, virtual machine translation, and finally high-level language compilation. As you work through each of these levels, the lower level becomes abstracted away.

The course utilizes a simple high-level object-orientated language called Jack, which looks like Java but is much simpiler. Students of the course are eventually tasked with writing a Jack compiler. The syntax analyzer portion of the compiler chews up the Jack code into a series of lexical tokens that are parsed to organize and connect them in a meainingful way. The result of the syntax analyzer is an XML file, which represents the [parse tree](https://en.wikipedia.org/wiki/Parse_tree){:target="_blank" rel="noopener} for a given Jack file.

I set out to write a Jack syntax analyzer in Python, and initially it just functioned as a command-line program. But more interesting was trying to think of a way to programmatically visualize the parse tree for a given Jack class. Since the syntax analyzer returns XML, its output can be used to generate a parse tree visual using a D3.js hierarchy. And the Python syntax analyzer could integrate directly into the browser using [PyScript](https://pyscript.net/){:target="_blank" rel="noopener"}.

The most glaring issue with the current implementation of this syntax analyzer is the lack of error handling. The syntax analyzer does not tell you you have a missing semi-colon for example, it just fails. In the "real world" this would be incredibly inconvienent. For the time being, proofread your Jack code carefully.

 ---

<div class="col text-center">
  <a class="btn btn-default btn-lg" href="{{ site.baseurl }}/parse-tree-visualizer/">
    <strong>Try out the parse tree visualizer &rarr;</strong>
  </a>
</div>

---