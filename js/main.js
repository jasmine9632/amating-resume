/*把code写到#code和style标签里*/
function writeCss(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            fn && fn.call()
        }
    }, 70)

}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn && fn.call()
        }
    }, 35)
}
var css1 = `/*
*面试官你好，我是任芬
*只用文字做自我介绍太单调了
*我就用代码介绍吧
*首先，准备一些样式
*/
*{
    transition:all 0.2s;
    }
#code{
        border:1px solid #aaa;
        padding:20px;
    }

/*咦，字有点模糊看不清，加个背景试试 */
    html {
        background:  rgb(0,43,54); color: rgb(222,222,222);
    }
    
/*再给代码加个高亮*/

.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,12); }


/*好像字有点小，调大点儿*/
*{
    font-size:16px;
}



/*现在正式开始*/

/*首先我需要一张白纸*/

#code-wrapper{
    width:50%;left:0;position:fixed;
    height:100%;
}
#paper>.content{
display:block;
}

/*于是我就可以在白纸上写字啦,请看右边*/
`


var css2 = `
/*接下来用一个优秀的库 marked.js
把Markdown 变成 HTML
*/
`

var md = `
#自我介绍

我是任芬
1993年6月出生
武汉科技大学城市学院毕业
自学前端半年
希望应聘前段开发岗位

#技能介绍

熟悉javascript css html


#项目介绍
1. 简历轮播
2. 简历
3. 自做画板
4. 键盘网页导航


#联系方式

- QQ 360925221
- E-mail 360925221@qq.com
- 手机13429818231

`
let css3 = `
/*
*这就是我的自动播放简历
*谢谢观看
*/
`


writeCss('', css1, () => { //write css call the function
    createPaper(() => {
        writeMarkdown(md, () => {
            writeCss(css1, css2, () => {
                convertMarkdownToHtml(() => {
                    writeCss(css1 + css2, css3, () => {
                        console.log('完成')
                    })
                })
            })
        })
    })
})

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()

}

function convertMarkdownToHtml(fn) {
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper>.content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
}