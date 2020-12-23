---
category: 'blog'
title: "[GatsbyJS] Making Blog Website with Gatsby for Beginners"
date: "2020-03-11"
---

## CSS
- viewport meta tag 는 이미 개츠비가 설정해두었기에 따로 import 필요 없음
- css 에 calc() 이용해서 바로 적용


##  마크다운 이미지 
- [gatsby-source-filesystem](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/?=gatsby-source-filesystem)
-

## GraphQL

- 포스팅 리스트 순서 : 날짜, 제목 순서
  - https://www.gatsbyjs.com/docs/graphql-reference/

## 플러그인

- 마크다운의 코드 블럭 꾸미기
  - https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/
  - css 충돌은 styles/global.css 로 직접 수정
  - 참고 이슈: https://github.com/PrismJS/prism/issues/1237
  
```css
  pre{
  width: 100%;
  background: beige;
  border-radius: 1px;
}

pre code {
    white-space: break-spaces !important;
}
````

fonts
- https://www.gatsbyjs.com/plugins/gatsby-plugin-web-font-loader/?=google-fonts

- https://github.com/KyleAMathews/typefaces

- different font-family for different languages