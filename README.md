<!-- PROJECT LOGO -->
<br /><br />
<p align="center">

  <h3 align="center">LineMusicChatbot</h3>
  <p align="center">
    원하는 분야에 대한 음악을 추천해주거나 검색해주는 등 사용자가 원하는 노래 정보를 제공하는 챗봇
    <br />
    <br />
    <a href="http://khuhub.khu.ac.kr/2016102927/LineMusicChatbot/raw/master/QR_Code.png">View Demo QR Code</a>
  </p>
</p>


<br />
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#create-info-file">Create Info file</a></li>
        <li><a href="#chatbot-qr-code">Chatbot QR Code</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a>
        <ul>
            <li><a href="#help">Help</a></li>
            <li><a href="#playlist">PlayList</a></li>
            <li><a href="#search-in-youtube">Search in YouTube</a></li>
            <li><a href="#search-setting">Search Setting</a></li>
        </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<br/>

<!-- ABOUT THE PROJECT -->
# About The Project
<br />

<table>
  <tr>
  <td align="center" >
  <img src = "https://user-images.githubusercontent.com/71369826/192731120-e559e888-07f7-45e5-b43e-f82f8ed5428c.png" width = "250"/>
  </td>
    <td valign="top"> 

이 프로젝트를 선정한 이유는 평소 음악을 들을 때 불편했던 점을 해소하고 싶었기 때문입니다.<br>

왼쪽의 사진은 유튜브에서 특정 음악을 검색한 사진입니다. <br>

'유튜브'는 영상 공유를 주 목적으로 하기 때문에, 유튜브에서 노래 관련 검색만으로 온전히 노래를 즐기기는 어렵습니다. <br>

예를 들면, 뮤직비디오나 저작권자가 아닌 사람이 올린 영상의 경우 공식 음원에 비해 음질도 떨어집니다.<br>

또한 인트로와 아웃트로 때문에 듣기 불편할 수도 있습니다. <br>

따라서 제대로 된 음악 서비스를 즐기기 위해서는 '유튜브 뮤직' 유료 서비스를 이용해야합니다.<br>

  </tr>
<tr>
  Architecture
  <img src = "https://user-images.githubusercontent.com/71369826/192767558-1ddff5e3-4e9c-41ab-980a-1c5a0e2903e5.png" />

</tr>
  <tr>
    <td align="center" >
      <img src = "https://user-images.githubusercontent.com/71369826/192731426-2dd54a16-8877-4d93-b3d7-5761662757a3.png" width = "250" />
    </td>
    <td valign="top"> 
    <br>
    <br>
    <br>
    <br>
왼쪽의 첨부 파일은 유튜브 뮤직에서 제공하는 플레이리스트입니다.<br>

유튜브에서는 이 기능을 이용할 수 없습니다.<br>

1) 어떤 음악을 들어야할지 망설여지는 상황<br>
2) 유튜브 뮤직 유료결제 없이 플레이리스트를 즐기고 싶은 상황<br><br>

위와 같은 상황에서 가수나 장르와 관련된 음악을 제공해주는 시스템을 구현하고자 했습니다.<br><br>
  
</table>

<br />


## 배경
이러한 문제점을 보완하고자 LineMusicChatbot 프로젝트를 시작하게 되었습니다.

* LineMusicChatbot은 라인 챗봇 서비스와 YouTube API를 이용하여 만든 음악 추천 및 검색 챗봇입니다.

* 유튜브 API를 통해 재생목록의 정보와 내 동영상의 제목, 썸네일, URL을 제공합니다.

* 사용자가 특정 메시지를 챗봇에 입력하면 이를 분석하여 노래를 추천해주거나, 재생목록을 출력하는 방식으로 구현한 프로젝트입니다.

<br />

## Built With

* [Line Messaging API](https://developers.line.biz/en/services/messaging-api/)
* [YouTube Data](https://developers.google.com/youtube/v3/getting-started?hl=ko)
<br />
<br />

<br />
<!-- GETTING STARTED -->

## Getting Started

### Prerequisites
* Chatbot Application
* Create info.js
* npm
  ```
  npm install
  ```
<br />



### Installation
<br />

1. Clone the repo<br>
```
git clone http://khuhub.khu.ac.kr/2016102927/LineMusicChatbot.git
```

2. Install NPM packages<br>
```
npm install
```
<br />
<br />


### Create Info file
보안을 위해 토큰 값과 API키를 빼놓았습니다.
새 파일 Info.js 을 생성하고 

``` javascript 
exports.TOKEN = 'Kb1/rQYz4MUhF8XyKQv7z9x0MxVQ5bX/XO8S/yt/1qQEJVAbsEFAaMvXKEOx9Umr7KhivfyDPfZHRRLFPngR0O4ZGWV2VFses8ufPE7uAdvYr4G6keBNAU69nBz5IC71HfbIrUHxXYqD7GfhVwXzpwdB04t89/1O/w1cDnyilFU='  

exports.YoutubeKey = 'AIzaSyBInggOtXxPFYIRee0Xs3vb5iZ9YE9_518'

exports.domain='2020105631.oss2021.tk'
```
을 붙여넣기 해주시기 바랍니다.<br><br>

<br />


### Chatbot QR Code
![QR_Code](/uploads/d00b60136d78cb8c790e7d59be1e09e9/QR_Code.png)
QR 코드를 이용해 챗봇을 등록해주시기 바랍니다.

<img src = "https://user-images.githubusercontent.com/71369826/192736621-1add8e80-8062-4655-bbff-0a5de4c62144.png" width = "400" />
올바르게 친구 추가 되었을 때의 화면입니다.
<br />
<br />
<br />

<!-- USAGE EXAMPLES -->

## Usage

### Help

<table>
  <tr>
    <td align="center">
    <img src = "https://user-images.githubusercontent.com/71369826/192736908-229dab44-960c-4773-96b3-c25a9bd14561.png" width = "400" />
    </td>
    
  <td>
    기본적인 구현 예시를 도움말 명령어를 통해 구현해 놓았습니다. "도움말"을 입력하면 구체적인 구현에 대한 설명을 얻을 수 있습니다.
  </td>
  
  </tr>
</table>
<br />

### PlayList

<table>
  <tr>
    <td align="center">
    <img src = "https://user-images.githubusercontent.com/71369826/192737478-0e99d3e7-f887-4823-bc70-8024c13d1e5e.png" width = "400" />
    </td>


<td align="left">
<br><br><br>  
첫번째 기능은 음악을 추천하는 기능입니다. 
<br><br>

사용자가 입력한 문자열이 "플레이리스트"일 때, 챗봇이 선택지를 제공해 음악 추천을 준비합니다.<br><br>

원하는 분야를 고르고 또 그 안에서 주어지는 선택지를 선택하면 최종 선택지와 관련한 노래를 무작위로 추천합니다.<br><br>


이때, 공식 음원을 찾기 힘들다는 단점을 보완하기 위해 URL을 통해 이동하면 공식 음원으로 이동하는 것을 볼 수 있습니다. <br><br>

</td>
      
  </tr>
</table>
<br />

<br />



<table>
  <tr>
    <td align="center"><img src = "https://user-images.githubusercontent.com/71369826/192737566-e49e8704-fc83-44df-a566-14c1f14c5572.png"/></td>

<td align="left">
<br><br>
지원하는 플레이리스트는 아래와 같이 분류하여 제공합니다. <br><br>
* 장르 플레이리스트 : 힙합, 피아노, 팝 <br><br>
* 무드 플레이리스트 : 슬픈 노래, 신나는 노래<br><br>
* 가수 플레이리스트 : 블랙핑크, 아이유, 트와이스, 레드벨벳<br><br>
</td>
      
  </tr>
</table>
<br />
<br />



### Search in YouTube
<br />
<table>
  <tr>
    <td align="center"><img src = "https://user-images.githubusercontent.com/71369826/192737969-29d752ff-22ff-49b1-ac73-5820c9146f36.png" width = "400"/></td>

<td align="left">
<br>
두번째 기능은 검색입니다. <br><br>

자신이 검색하고 싶은 노래가 있다면 유튜브로 번거롭게 이동하여 검색하지 않고 <br><br>

바로 검색할 수 있도록 챗봇 자체에 검색 기능을 추가하였습니다.<br><br>

챗봇은 사용자가 입력한 문자열의 유튜브 검색 결과 중 최상단의 결과를 출력하고, <br><br>

그 영상의 제목과 URL 그리고 썸네일 정보를 제공합니다.<br><br>

이에 관하여 사용자가 판단하기에 챗봇이 썸네일은 보여주지 않았으면 하거나, <br><br>

출력 정보가 너무 적다고 판단되는 경우를 고려하여 검색에 대하여 설정할 수 있는 기능을 추가하였습니다.<br><br>

</td>
      
  </tr>
</table>


<br />
<br />

### Search Setting
<br />
<table>
  <tr>
    <td align="center"><img src = "https://user-images.githubusercontent.com/71369826/192738109-3ae7d7aa-2185-4b1d-a058-06bd7e0f3d16.png" width = "400" /></td>
    <td align="center"><img src = "https://user-images.githubusercontent.com/71369826/192738094-f5cfbe17-536d-4fdc-995d-e1d92409cf32.png" width = "400" /></td>



</td>
      
  </tr>
</table>

검색 기능에 대한 커스텀 설정 기능입니다.<br>

“설정”을 입력하면 자동으로 챗봇이 설정 기능을 차례로 출력하도록 하였습니다.<br>

설정할 수 있는 기능은 썸네일의 출력 유무, 출력할 동영상의 개수, 영상 URL의 포함 여부입니다.<br><br><br>

각각의 경우 Default값은<br><br>

  * 썸네일 출력 – 출력<br><br>

  * 출력할 동영상의 개수 – 1개<br><br>

  * URL 포함 여부 – 출력<br><br>

입니다.<br><br>

<br />
<!-- ROADMAP -->

## Roadmap
<br />
YouTube API를 이용하는 과정에서 문제가 있었습니다.

데이터를 list하는 것 이외에 insert, update, delete 하는 기능은 Oauth 2.0 인증을 필요로 하는데 이 과정이 SSH 챗봇 서버에서 구현이 불가능하다는 문제에 부딪혔습니다.

때문에 재생목록에 대해 사용자가 원하는 곡을 추가하거나 삭제하는 등의 작업이 구현되지 않아 재생목록에 대한 완전한 기능구현을 하지 못했다는 문제점이 있습니다.

이에 대한 앞으로의 로드맵은 추가적으로 다른 API를 이용하여 구현하지 못하는 부분을 구현하거나 사용자에게 재생목록 자체의 URL을 제공하여 사용자가 해당 링크를 방문하여 유튜브 내에서 동영상을 추가, 삭제 하도록 하는 방법을 생각하고 있습니다.
<br><br>
<br />

<!-- CONTRIBUTING -->
## Contributing
<br />
추가하거나 개선할 기능이 있다면 참고 바랍니다.

  1. Project를 Fork 합니다.
  2. 새로운 브랜치를 생성합니다. (`git checkout -b feature/AmazingFeature`)
  3. 변경된 사항을 Commit 합니다. (`git commit -m 'Add some AmazingFeature'`)
  4. 브랜치에 Push 합니다. (`git push origin feature/AmazingFeature`)
  5. Pull Request 합니다.
<br><br>

<br />

<!-- LICENSE -->
## License
<br />
MIT License
<br><br>

<!-- CONTACT -->
## Contact
<br />
신지원 - Dev.jiwonshin@khu.ac.kr

엄민용 - dono222@khu.ac.kr

엄성진 - 7497aaaa@khu.ac.kr

Project Link: [http://khuhub.khu.ac.kr/2016102927/LineMusicChatbot.git](http://khuhub.khu.ac.kr/2016102927/LineMusicChatbot.git)
<br><br>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/github_username
<br><br>
