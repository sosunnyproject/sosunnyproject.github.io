import React from "react"
import Header from "../components/header"
import Container from "../components/container"
import containerStyles from "../components/container.module.css"
import { Link } from "gatsby"
import '../styles/global.css';

export default function Vitae() {
  return (
  <Container>
    <Header />


    <div className={containerStyles.index}>
    <h1>coming soon </h1>

    <p>
    프론트엔드 개발자 | 크리에이티브 코더 | sosunnyproject
    </p>

    <p>
    뉴욕에서 연극과 미디어를 공부하고 현재는 한국에서 개발자로 일하고 있습니다. 
    코딩과 기술을 사용해서 아트를 만드는 개인 작업을 인스타그램에 올리고 가끔 전시를 합니다.
    </p>

    <p>
      유튜브에 작업 영상과 튜토리얼을 올리고, 트위치를 통해 크리에이티브 코딩 101 스터디를 진행할 계획이 있습니다. 
      관심있으신 분들은 <a target="_blank" rel="noreferrer" href="https://forms.gle/F7MP8cPW8J7aUWfq6">구글폼</a>을 작성해주시면 모집 시 연락드리겠습니다 :)
      기타 문의사항은 인스타그램 메세지로 연락주세요.
    </p>

    <p>
    본 페이지는 지속적으로 업데이트될 예정입니다. 자세한 경력/이력은 링크드인을 확인해주세요!
    </p>

    <p className={containerStyles.indexBottom}>
     - 2020/12/30 박소선
    </p>

    </div>

  </Container>
  )
}