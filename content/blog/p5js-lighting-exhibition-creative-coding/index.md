---
category: 'blog'
title: "[p5js] Meditation & Lighting 전시 구상 일지(1)"
date: '2020-05-10'
---

6월에 있을 전시를 위해서 작업을 구상하고 있다. 

최근에 코끼리라는 명상 앱을 다운 받아서 2주동안 사용해보았는데, 심리 상담 치료법과도 유사한 부분들이 있어서 그런지 스트레스를 완화시키는 데에 효과적이었다. 그 경험을 바탕으로 mental health 에 관련된 작품을 만들어 보려고 구상중이다.

이직한 회사가 분위기도 사람들도 좋아서 큰 트러블은 없었는데, 잘 모르는 업무에 대한 부담감이나 공부량에 대한 압박감이 생각보다 점점 커지면서 스트레스를 받은 듯 했다. (같은 분야에서 이직을 자주 해본 친구는 보통 이직하고 나서 '가면 증후군' imposter syndrome 이 잘 나타난다고 그랬다.) 가면 증후군까지는 아니었더라도, 내 능력치에 대한 불만족이나 불안감이 쌓이는 와중에, 코로나 때문에 운동이나 소셜 활동도 많이 못해서 스트레스를 풀 곳이 마땅하지 않았던 것 같다. 그리고 멀티가 잘 안되는 나는, 가끔 공부나 성장에 대한 압박이 심해지면 소셜 활동을 확연히 줄여버려서 outlet이 더 줄어드는 바람에 나중에야 스트레스를 인지하는 경우도 있는 듯 하다.

한국에서도 명상이 조금씩 유행을 타고 있었는데, 코로나 블루로 사회적, 개인적 스트레스가 증가하면서 더 각광을 받고 있는 것 같다. 특히, 종로의 힙한 갤러리 피크닉에서도 mindfulness 라는 주제로 차분한 전시를 기획한 걸 보면 말이다.

**코드에 대한 세부 설명은 다음 포스팅에서 이어갈 예정이다**

# 구상도 
전체적인 기술적 구상은 이렇게 생각중이다.
아두이노 하드웨어를 사용한 시그널 -> p5 js 소프트웨어 프로그램 -> 잔잔하고 차분한 비쥬얼의 변화를 만들어낼 것이다.

명상이나 심리 치료에서 피지컬한 부분은 호흡이다.
호흡을 조절하는 것만으로도 긴장과 불안감이 매우 줄어든다는 걸 실감한다. (아마 요가도 비슷할 것 같다.)
그래서 날숨 호흡을 시그널로 보낼 생각이다. 깊은 들숨과 날숨의 템포를 비쥬얼로 조절하고, 참여자의 날숨 시그널에 따라 프로젝션 비쥬얼을 변화시키려고 한다. 

# 비쥬얼 
명상 앱에서 들숨날숨을 연습시킬 때, 차가운 공기를 마셔서 내 몸의 온기로 따뜻한 공기를 내뱉는다. 
그리고 어두운 회색 구름이었던 환경이 나의 따뜻한 날숨으로 인해 점점 밝아진다.

[Zach Lieberman](https://www.instagram.com/zach.lieberman/) 아티스트/교수가 amber, blue 색깔을 이용한 작업을 예전에 많이 했었다. 전에는 그 색들이 딱히 예뻐보이지도 않고 왜 많이 쓰는지 이해가 안되었는데, 나중에 모두연 인터렉티브아트랩에서 lighting 관련 [p5js 코드 튜토리얼](https://www.notion.so/Light-in-P5-90f4a5b4d66b4a97ad0c71bea4c9f59b)을 만들다가 불현듯 깨달았다. 

내가 예전에 무대조명을 했을 때도, 거의 모든 조명의 베이스는 amber, blue 였다. 이렇게 약간 따뜻한 색감과 약간 차가운 색감은 크게 튀는 부분 없이 그 상황의 분위기(아침/저녁, 온화/냉랭)를 은은하게 연출해준다. 그리고 둘을 합치면 우리가 흔히 보는 neutral 한 하얀 조명이 된다. 

동시에 자연에 매우 가까운 색이라는 생각이 들었다. 내가 발리 여행을 갔을 때, 바다에서 sunrise 사진을 많이 찍었는데, 사진들을 한참 보다보니 주황색과 파랑색이 주를 이루었다. 

amber, blue 가 사람에게 가장 친숙하고 자연스러운 대표적인 색감들이 아닌가 싶다.

현재까지 구상하고 개발한 비쥬얼이다. 3D sphere, lighting 색감을 정해가고 있다.

![img](lighting3d.png)

### 인스타그램에 올린 짧은 모션 영상

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/CAAaueGjkPv/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="13" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/CAAaueGjkPv/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/CAAaueGjkPv/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by @sosunnyproject</a></p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>

# inspiration
주된 영감이 호흡과 색감과 시대상이라면, 표현 방식에 대한 영감은 james turrell, olafur eliasson 이다. 

james turrell 은 PS1MoMA 등 여러 갤러리나 박물관에 전시되는 등 아주 유명한 작가이다. 
넷플릭스 david letterman - kanye west 인터뷰에서는 칸예가 주일 예배 sunday service 하는 찬양 공간을 james turrell 에게 영감 받아서 쨍한 조명의 힐링되는 분위기로 연출했다는 내용이 있다. 그걸 최근에 보고, 나의 조명 경험이 겹쳐지면서 인상이 깊게 남았었다.

![james turrell](jamesTurrell.png)
- Rising Sun. Image Courtesy of Schmidt Hammer Lassen Architects

olafur eliasson 도 예전부터 알았던 건축 배경의 작가이다. 작년에 넷플릭스에서 olafur 관련 다큐를 보고, 런던에서 하는 특별 전시 사진들을 보고 많은 감동을 받았었다. 

![olafur](olafur.png)
- The Weather Project, Olafur Eliasson

둘의 공통점을 간단하게 설명한다면, 하나의 큰 공간을 자연의 색이나 일관된 조명으로 가득 채우고 관객에게 그 경험을 맡긴다는 것이다.
내가 그들에게서 영감받은 부분을 정리한다면, 단순함, 공간성, 자연스러움...?

# Side Talk

지금까지 VR, AR, interactive JS 등 다양한 작업과 전시를 하면서 나의 주된 테마는 **2인 이상이 모여서 '함께' 즐길 수 있는 놀잇감을 주는 것** 이었다. 
문화 특성에 따라 낯선 사람들끼리도 잘 노는 관객들이 있고, 어색해서 시도조차 안하는 관객들이 있었다. 내가 제공한 '놀잇감'의 부족함도 이유일 것이다. 

그런데 이번에는 혼자 참여하는 작업을 시도해보려고 한다. '같이' '함께' 라는 개념은 여전히 중요하게 생각한다. 하지만 코로나가 불러온 언택트 시대, 여러모로 스트레스가 증가하는 시대, 1인 경제인구가 증가하는 시대는 혼자서 많은 것을 감당해야 하는 환경이다. 그리고 개인의 문제 - 트라우마든 자존감이든 불안감이든 - 가 해결되지 않은 상태에서는 외부의 일이나 관계가 부담스러워진다. 혼자서 해결하라는 맥락이라기보다는... 나의 중심이 잘 잡혀있기 위해서는 자신의 내면을 꾸준히 신경써줘야 한다는 생각에 이번 테마는 다소 달라질 것 같다.