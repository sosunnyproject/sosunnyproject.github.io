import React from "react"
import Header from "../components/header"
// import Container from "../components/container"
import * as vitaeStyles from "../components/vitae.module.css"
import '../styles/global.css';

export default function VitaeKO() {
  return (
    <>
    <p>
    뉴욕에서 연극과 미디어를 공부하고 현재는 한국에서 개발자로 일하고 있습니다. 
    코딩과 기술을 사용해서 아트를 만드는 개인 작업을 온라인에 공유하고 종종 전시를 합니다.
    </p>

    <h2>Exhibitions</h2>
      <p className={vitaeStyles.title}>‘을지로에는 공원이 없다' v.1, 서울문화재단 도시문화 랩 x 을지예술센터 
      <a href="https://archivist.kr/show/scroll.php?pagecode=1638070197" rel="noreferrer" target="_blank"> “접는도시" 전시 </a> </p>
      <span className={vitaeStyles.addition}>작가</span>
      <span className={vitaeStyles.addition}>August 2021 - January 2022</span>
      <ul>
        <li> 을지로의 미래를 상상한 인터렉티브 리얼타임 3D 웹사이트 작품 기획 및 개발 </li> 
        <li> Threejs 및 WebGL 사용, Xbox 컨트롤러 연동,  3D GLTF 모델 및 애니메이션 (monstermash) 사용</li>
      </ul>

      <p className={vitaeStyles.title}>분산된 돌봄의 웹 - 
      <a href="https://whiteblock.org/%EC%A0%84%EC%8B%9C/view/2792034" rel="noreferrer" target="_blank">가든.로컬 v.2</a>, 파주 아트센터 화이트블럭 x 최태윤스튜디오</p>
      <span className={vitaeStyles.addition}>소프트웨어 엔지니어 협업자</span>
      <span className={vitaeStyles.addition}>August 2021 - January 2022</span>
      <ul>
        <li> Pixi.js 이용해서 프론트엔드 및 제너레이티브 아트 개발, 모바일 웹 터치 및 사운드 인터렉션 기능 개발 </li> 
        <li> 라즈베리 파이 네트워크 환경에서 접속 가능한 모바일/PC 로컬 웹사이트 개발, 현장 전시 원격 지원</li>
      </ul>
      <p className={vitaeStyles.title}>
      <a href="https://2021frankenstein.bubbleapps.io/version-test" rel="noreferrer" target="_blank">2021 프랑켄슈타인</a>, 서울문화재단 UNFOLD x SAPY 청년예술청 전시</p>
      <span className={vitaeStyles.addition}>작가, 팀 리드, 개발 담당</span>
      <span className={vitaeStyles.addition}>June 2021 - August 2021</span>
      <ul>
        <li>청년예술청 공간의 특수성과 고전 SF소설 프랑켄슈타인을 중심으로 XR 작품 기획 및 개발 </li> 
        <li>Unity 엔진을 이용해 홀로렌즈 버전, iOS 앱, Android 앱 개발</li>
      </ul>

      <h2>Experience</h2>

      <p className={vitaeStyles.title}>Tripbtoz, 강남</p>
      <span className={vitaeStyles.addition}>프론트엔드 개발자</span>
      <span className={vitaeStyles.addition}>March 2020 - May 2021</span>
      <ul>
        <li>반응형 웹/ 모바일 웹뷰 개발, 매 스프린트마다 UI/UX 개선, 소셜 미디어 공유 기능 및 디자인 시스템 기획과 개발</li> 
        <li>호텔 매출 관리 솔루션 초기 기획 및 개발, 아토믹 디자인 기반 컴포넌트 모듈화, i18n 다국어 지원 개발</li>
      </ul>
      <p className={vitaeStyles.title}>포스코 ICT R&D 센터, 판교</p>
      <span className={vitaeStyles.addition}>AR, 블록체인, 웹 개발자 </span>
      <span className={vitaeStyles.addition}>December 2017 - March 2020</span>
      <ul>
        <li>스마트 팩토리 환경을 위한 AR 글래스 및 라즈베리 파이 연동용 일렉트론 앱 데모 개발 </li> 
        <li>Hyperledger Fabric 환경에서 블록체인 트랜잭션 모니터링 웹 서비스 개발, ERD 디자인 / 스마트 컨트랙트 / API 개발</li>
      </ul>
      <p className={vitaeStyles.title}>Fortune Magazine, Time Inc, New York</p>
      <span className={vitaeStyles.addition}>웹 프로덕션</span>
      <span className={vitaeStyles.addition}>June 2016 - May 2017</span>
      <ul>
        <li>웹사이트 CMS 컨텐츠 프로덕션 관리, 워드프레스 에러 디버깅, 온라인 컨텐츠 퍼블리싱 관리</li> 
        <li>포춘 500 외 관련 기업 리스트 정리 및 리서치, 이커머스 전략 기획 및 컨텐츠 발행</li>
      </ul>

    <h2>Workshops/Conference</h2>
    <p>
      삼성 오픈소스 컨퍼런스 2020, JS CONF 2020, 모두콘 2018, 모두콘 2020, 모두의 연구소 인터렉티브 아트랩, 모두의 연구소 풀잎스쿨 Nature of Code x p5 js (물리 시뮬레이션 크리에이티브 코딩 스터디)
    </p>

    <h2>Education</h2>
    <p className={vitaeStyles.title}>Vassar College, Poughkeepsie, NY</p>
    <span className={vitaeStyles.addition}>Bachelor’s Degree, Cum Laude, Phi Beta Kappa</span>
    <span className={vitaeStyles.addition}>September 2012 - May 2016</span>
    <ul>
      <li>미디어 학과 전공, 중국어 부전공, GPA 3.8/4.0</li> 
      <li>관련 이수 수업: Computer Science I & II, CS III: Software Design and Implementation, Computer Organization (structure of computing systems), Computer Animation (Maya), Computer Games (Unity)</li>
    </ul>

    <p className={vitaeStyles.title}>모두의 연구소, 딥러닝 스쿨 프로그램 1년 과정 이수</p>
    <span className={vitaeStyles.addition}>컴퓨터 비전 AI 연구 및 논문 발표</span>
    <span className={vitaeStyles.addition}>January 2018 - December 2018</span>
    <ul>
      <li>스탠포드 CS224n 커리큘럼을 기반으로 국내 교수진 및 전문가들과 통계, 수학, 딥러닝, 인공지능 공부 </li> 
      <li>컴퓨터 비전 알고리즘을 활용한 팀 논문 리서치 및 개인 프로젝트 발표 (모두콘 2018)</li>
    </ul>

    <p className={vitaeStyles.title}>포항공대 POSTECH 빅데이터/AI 부트캠프</p>
    <span className={vitaeStyles.addition}>성적 우수자 수료</span>
    <span className={vitaeStyles.addition}>July 2017 - November 2017</span>
    <ul>
      <li>Python, Tensorflow, 선형대수, 통계, 머신러닝 과목 수료</li> 
      <li>NLP 텍스트 요약 알고리즘, 데이터 수집 / 분석 / 시각화 관련 프로젝트 리드</li>
    </ul>

    </>

  )
}
