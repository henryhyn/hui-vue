export default `
# Marked 测试文件

## 造轮子

不只是想造轮子,
还想造个好轮子.

- 好用
- 强大
- 代码易于维护


> 我算是跟 Markdown 杠上了.

---

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 文本对齐

[居中对齐]

[诗歌排版需要右对齐
--- By Henry]]

## 插图

![](https://pic-gino-prod.oss-cn-qingdao.aliyuncs.com/henry/20210721110100989-2021-07-21_11-00-10.png)

## 超级链接

<http://www.baidu.com>

<yongnenghe@xiaohongshu.com>

## 行内样式

- 加粗**加粗**
- 斜体*斜体*
- 删除~~删除~~


1. 3
3. df

## 代码

行内代码 \`npm run test\`.

行间代码

\`\`\`c
for(int i=0; i<n; i++) {
  sum += i;
}
\`\`\`

\`\`\`
for(int i=0; i<n; i++) {
  sum += i;
}
\`\`\`

## 数学公式

行内公式 $a^2+b^2=c^2 (a<b)$, 勾股定理.

$$x_{1,2}=
\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$$

## 表格

| a | b |
|:-:|:-|
| t | 国家 |
| t | 中华 |
| t | 人民 |
`;
