var Info = require('./Info');
var ids = require('./all_ids')
const request = require('request');
const fs = require('fs');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
var { google } = require('googleapis');
var service = google.youtube('v3');

//세팅,설정값
var setting_userId = []; //유저아이디보관
var setting_Thumbnail = []; // 1:썸네일 출력(기본값) / 0:미출력
var setting_SendAmount = []; // 보낼 양 (1이상, 4이하의 정수) (기본값:1)
var setting_SendAddress = []; // 1:유튜브 주소 출력(기본값) / 0:미출력

function SEND(replyToken,title,url2,thumbnail,SendAmount,sendaddress) //검색해서 나온 내용 전송하는 함수
{
    
    sendMessage = "";
    var temp_title = [], temp_url = [], temp_url2 = [], temp_thumpnail = [];
    for (var i = 0; i < SendAmount; i++) {

        temp_title[i] = title[i];

        temp_url2[i] = url2[i];
        if (sendaddress) //주소 전송 활성화
            temp_url[i] = 'https://www.youtube.com/watch?v=' + (temp_url2[i].replace(/\"/gi, ""));
        else 
            temp_url[i] = "";
        sendMessage += temp_title[i] + "\n" +
            temp_url[i] + "\n" + "\n";
    }

    console.log(sendMessage);
    if (thumbnail) //썸네일을 활성화시켰을 경우, 맨 첫번째 작품 리스트 썸네일만 보여줌.
        request.post(
            {
                url: TARGET_URL,
                headers:
                {
                    'Authorization': `Bearer ${Info.TOKEN}`
                },
                json:
                {
                    "replyToken": replyToken,
                    "messages":
                    [
                        {
                            "type": "image",
                            "originalContentUrl": "https://img.youtube.com/vi/" + url2[0] + "/hqdefault.jpg",
                            "previewImageUrl": "https://img.youtube.com/vi/" + url2[0] + "/hqdefault.jpg"
                        },
                        {
                            "type": "text",
                            "text": sendMessage
                        }
                    ]
                }
            }
        );
    else //썸네일 비활성화
        request.post(
            {
                url: TARGET_URL,
                headers:
                {
                    'Authorization': `Bearer ${Info.TOKEN}`
                },
                json:
                {
                    "replyToken": replyToken,
                    "messages":
                    [
                        {
                            "type": "text",
                            "text": sendMessage
                        }
                    ]
                }
            }
        );
}

function shuffle(array) { //플레이리스트에서 랜덤으로 골라서 출력할 수 있도록 shuffle 함수를 추가함
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function SEND_LIST(replyToken,response,choice,thumbnail,SendAmount,sendaddress)//플레이리스트에서 나온 내용 전송하는 함수
{
    var random_order=[0,1,2,3,4,5,6,7,8,9];
    shuffle(random_order)

    sendMessage = "";
    var temp_title = [], temp_url = [], temp_url2 = [], temp_thumpnail = [];
    for (var i = 0; i < SendAmount; i++) {

        temp_title[i] = JSON.stringify(response.data.items[random_order[i]].snippet.title).replace(/\"/gi, "");

        temp_url2[i] = JSON.stringify(response.data.items[random_order[i]].snippet.resourceId.videoId);
        if (sendaddress) //주소 활성화
            temp_url[i] = 'https://www.youtube.com/watch?v=' + (temp_url2[i].replace(/\"/gi, ""));
        else 
            temp_url[i] = "";
        sendMessage += temp_title[i] + "\n" +
            temp_url[i] + "\n" + "\n";
    }


    console.log(sendMessage);
    if (thumbnail) //썸네일을 활성화시켰을 경우, 맨 첫번째 작품 리스트 썸네일만 보여줌.
        request.post(
            {
                url: TARGET_URL,
                headers:
                {
                    'Authorization': `Bearer ${Info.TOKEN}`
                },
                json:
                {
                    "replyToken": replyToken,
                    "messages":
                    [
                        {
                            "type": "image",
                            "originalContentUrl": "https://img.youtube.com/vi/" + (temp_url2[0].replace(/\"/gi, "")) + "/hqdefault.jpg",
                            "previewImageUrl": "https://img.youtube.com/vi/" + (temp_url2[0].replace(/\"/gi, "")) + "/hqdefault.jpg"
                        },
                        {
                            "type": "text",
                            "text": sendMessage
                        }
                    ]
                }
            }
        );
    else //썸네일 비활성화
        request.post(
            {
                url: TARGET_URL,
                headers:
                {
                    'Authorization': `Bearer ${Info.TOKEN}`
                },
                json:
                {
                    "replyToken": replyToken,
                    "messages":
                    [
                        {
                            "type": "text",
                            "text": sendMessage
                        }
                    ]
                }
            }
        );
}

function HELP(replyToken,sendMessage) //도움말 함수
{
    console.log(sendMessage);
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "text",
                        "text": sendMessage
                    }
                ]
            }
        }
    );
}

function SETTINGS(replyToken) //설정 함수
{
    console.log("설정 메뉴 진입");
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "template",
                        "altText": "설정메뉴입니다.",
                        "template": {
                            "type": "buttons",
                            "title": "설정",
                            "text": "설정하려는 항목을 골라주세요.",
                            "actions": [
                                {
                                  "type": "postback",
                                  "label": "썸네일 전송 여부 변경",
                                  "data": "썸네일"
                                },
                                {
                                  "type": "postback",
                                  "label": "추천 음악 개수 조정",
                                  "data": "개수"
                                },
                                {
                                  "type": "postback",
                                  "label": "유튜브 주소 전송 여부 변경",
                                  "data": "주소"
                                }
                            ]
                        }
                    }
                ]
            }
        }
    );
}

function sendplaylist(replyToken, userId, choose)
{
    var choice=ids.all_ids[choose];
    service.playlistItems.list(
        {
        key: Info.YoutubeKey,
        part: 'snippet',
        fields: 'items(snippet(title,resourceId,thumbnails(high(url))))', //제목, VideoId, Thumbnail 이미지 정보.
        maxResults: 10,
        playlistId: choice
        }, function (err, response){
            if (err) {
                console.log('The API returned an error: ', err);
                return;
            }
            var video = response.data.items;
            if (video.length == 0) 
                console.log('검색된 동영상이 없습니다.');
            else
                SEND_LIST(replyToken,response,choice,setting_Thumbnail[setting_userId.indexOf(userId)],setting_SendAmount[setting_userId.indexOf(userId)],setting_SendAddress[setting_userId.indexOf(userId)]);
        }
    )
    
}


function PLAYLIST(replyToken) //플레이리스트 함수
{
    console.log("플레이리스트 선택창 진입");
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "template",
                        "altText": "플레이리스트 선택창 입니다.",
                        "template": {
                            "type": "buttons",
                            "title": "분야",
                            "text": "원하시는 분야를 골라주세요.",
                            "actions": [
                                {
                                  "type": "postback",
                                  "label": "장르",
                                  "data": "genre"
                                },
                                {
                                  "type": "postback",
                                  "label": "무드",
                                  "data": "mood"
                                },
                                {
                                  "type": "postback",
                                  "label": "가수",
                                  "data": "singer"
                                }
                            ]
                        }
                    }
                ]
            }
        }
    );
}

exports.genre = function (replyToken)
{
    console.log("플레이리스트-장르");
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "template",
                        "altText": "장르 선택창 입니다.",
                        "template": {
                            "type": "buttons",
                            "title": "장르",
                            "text": "원하시는 장르를 골라주세요.",
                            "actions": [
                                {
                                  "type": "postback",
                                  "label": "힙합",
                                  "data": "hiphop"
                                },
                                {
                                  "type": "postback",
                                  "label": "피아노",
                                  "data": "piano"
                                },
                                {
                                  "type": "postback",
                                  "label": "팝",
                                  "data": "pop"
                                }
                            ]
                        }
                    }
                ]
            }
        }
    );
}

exports.hiphop = function(replyToken,userId)
{
    console.log('플레이리스트-장르-힙합');
    sendplaylist(replyToken, userId, 101);
}

exports.piano = function(replyToken,userId)
{
    console.log('플레이리스트-장르-피아노');
    sendplaylist(replyToken, userId, 102);
}

exports.pop = function(replyToken,userId)
{
    console.log('플레이리스트-장르-팝');
    sendplaylist(replyToken, userId, 103);
}

exports.mood = function (replyToken)
{
    console.log("플레이리스트-무드");
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "template",
                        "altText": "무드 선택창 입니다.",
                        "template": {
                            "type": "buttons",
                            "title": "무드",
                            "text": "원하시는 무드를 골라주세요.",
                            "actions": [
                                {
                                  "type": "postback",
                                  "label": "신남",
                                  "data": "exciting"
                                },
                                {
                                  "type": "postback",
                                  "label": "슬픔",
                                  "data": "sad"
                                }
                            ]
                        }
                    }
                ]
            }
        }
    );
}

exports.exciting = function(replyToken,userId)
{
    console.log('플레이리스트-무드-신남');
    sendplaylist(replyToken, userId, 201);
}

exports.sad = function(replyToken,userId)
{
    console.log('플레이리스트-무드-슬픔');
    sendplaylist(replyToken, userId, 202);
}

exports.singer = function (replyToken)
{
    console.log("플레이리스트-가수");
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "template",
                        "altText": "가수 선택창 입니다.",
                        "template": {
                            "type": "buttons",
                            "title": "가수",
                            "text": "원하시는 가수를 골라주세요.",
                            "actions": [
                                {
                                  "type": "postback",
                                  "label": "블랙핑크",
                                  "data": "blackpink"
                                },
                                {
                                  "type": "postback",
                                  "label": "아이유",
                                  "data": "iu"
                                }
                                ,
                                {
                                  "type": "postback",
                                  "label": "레드벨벳",
                                  "data": "redvelvet"
                                }
                                ,
                                {
                                  "type": "postback",
                                  "label": "트와이스",
                                  "data": "twice"
                                }
                            ]
                        }
                    }
                ]
            }
        }
    );
}

exports.blackpink = function(replyToken,userId)
{
    console.log('플레이리스트-가수-블랙핑크');
    sendplaylist(replyToken, userId, 301);
}

exports.iu = function(replyToken,userId)
{
    console.log('플레이리스트-가수-아이유');
    sendplaylist(replyToken, userId, 302);
}

exports.redvelvet = function(replyToken,userId)
{
    console.log('플레이리스트-가수-레드벨벳');
    sendplaylist(replyToken, userId, 303);
}

exports.twice = function(replyToken,userId)
{
    console.log('플레이리스트-가수-트와이스');
    sendplaylist(replyToken, userId, 304);
}


exports.thumbnail_settings = function (replyToken)
{
    
    console.log('썸네일 전송 설정');
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                    [
                        {
                            "type": "template",
                            "altText": "설정메뉴입니다.",
                            "template": {
                                "type": "buttons",
                                "title": "썸네일 전송 여부 변경",
                                "text": "아래 항목을 골라주세요.",
                                "actions": [
                                    {
                                        "type": "postback",
                                        "label": "썸네일 전송 O",
                                        "data": "enablethumbnail"
                                    },
                                    {
                                        "type": "postback",
                                        "label": "썸네일 전송 X",
                                        "data": "unablethumbnail"
                                    },
                                ]
                            }
                        }
                    ]
            }
        }

    );
}

exports.enablethumbnail = function(replyToken,userId)
{
    console.log('썸네일 활성화 됨.');
    setting_Thumbnail[setting_userId.indexOf(userId)]=1;
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "text",
                        "text": "이제 썸네일이 전송됩니다!"
                    }
                ]
            }
        }
    );
}
exports.unablethumbnail = function(replyToken,userId)
{
    console.log('썸네일 비활성화 됨.');
    setting_Thumbnail[setting_userId.indexOf(userId)]=0;
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "text",
                        "text": "이제 썸네일이 전송되지 않습니다!"
                    }
                ]
            }
        }
    );
}







exports.amount_settings = function (replyToken, userId)
{
    console.log('출력량 설정');
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                    [
                        {
                            "type": "template",
                            "altText": "설정메뉴입니다.",
                            "template": {
                                "type": "buttons",
                                "title": "추천 음악 개수 조정",
                                "text": "원하는 추천 개수를 골라주세요.",
                                "actions": [
                                    {
                                        "type": "postback",
                                        "label": "1개",
                                        "data": "amount1"
                                    },
                                    {
                                        "type": "postback",
                                        "label": "2개",
                                        "data": "amount2"
                                    },
                                    {
                                        "type": "postback",
                                        "label": "3개",
                                        "data": "amount3"
                                    },
                                    {
                                        "type": "postback",
                                        "label": "4개",
                                        "data": "amount4"
                                    }
                                ]
                            }
                        }
                    ]
            }
        }

    );
}

exports.amount1 = function(replyToken,userId)
{
    console.log('한 번에 1개씩');
    setting_SendAmount[setting_userId.indexOf(userId)]=1;
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "text",
                        "text": "이제 한 번에 한 개씩 추천합니다!"
                    }
                ]
            }
        }
    );
}

exports.amount2 = function(replyToken,userId)
{
    console.log('한 번에 2개씩');
    setting_SendAmount[setting_userId.indexOf(userId)]=2;
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "text",
                        "text": "이제 한 번에 두 개씩 추천합니다!"
                    }
                ]
            }
        }
    );
}

exports.amount3 = function(replyToken,userId)
{
    console.log('한 번에 3개씩');
    setting_SendAmount[setting_userId.indexOf(userId)]=3;
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "text",
                        "text": "이제 한 번에 세 개씩 추천합니다!"
                    }
                ]
            }
        }
    );
}

exports.amount4 = function(replyToken,userId)
{
    console.log('한 번에 4개씩');
    setting_SendAmount[setting_userId.indexOf(userId)]=4;
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "text",
                        "text": "이제 한 번에 네 개씩 추천합니다!"
                    }
                ]
            }
        }
    );
}




exports.address_settings = function (replyToken)
{
    console.log('유튜브 주소 전송 설정');
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                    [
                        {
                            "type": "template",
                            "altText": "설정메뉴입니다.",
                            "template": {
                                "type": "buttons",
                                "title": "유튜브 주소 전송 여부 변경",
                                "text": "아래 항목을 골라주세요.",
                                "actions": [
                                    {
                                        "type": "postback",
                                        "label": "유튜브 주소 전송 O",
                                        "data": "enableaddress"
                                    },
                                    {
                                        "type": "postback",
                                        "label": "유튜브 주소 전송 X",
                                        "data": "unableaddress"
                                    },
                                ]
                            }
                        }
                    ]
            }
        }

    );
}

exports.enableaddress = function(replyToken,userId)
{
    console.log('주소 활성화 됨.');
    setting_SendAddress[setting_userId.indexOf(userId)]=1;
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "text",
                        "text": "이제 유튜브 주소가 전송됩니다!"
                    }
                ]
            }
        }
    );
}
exports.unableaddress = function(replyToken,userId)
{
    console.log('주소 비활성화 됨.');
    setting_SendAddress[setting_userId.indexOf(userId)]=0;
    request.post(
        {
            url: TARGET_URL,
            headers:
            {
                'Authorization': `Bearer ${Info.TOKEN}`
            },
            json:
            {
                "replyToken": replyToken,
                "messages":
                [
                    {
                        "type": "text",
                        "text": "이제 유튜브 주소가 전송되지 않습니다!"
                    }
                ]
            }
        }
    );
}

exports.check = function (message, replyToken, userId) {
    if (setting_userId.indexOf(userId)==-1) // 새로운 사용자가 이용할때, 설정 초기값 세팅
    {
        setting_userId.push(userId);
        setting_Thumbnail.push(1);
        setting_SendAmount.push(1);
        setting_SendAddress.push(1);
        console.log("알림: 새로운 사용자가 발견됨");
    }
    
    var choice;
    var choose;

    switch (message) {
        case "플레이리스트":
            PLAYLIST(replyToken);
            break;
        case "도움말":
            sendMessage = "- 기본적으로 찾고 싶은 음악을 입력하여 보내면 적절한 음악 영상을 찾아 추천해드립니다."
                    +"\n"+"예시) 소녀시대 노래"
                    +"\n"+"- '플레이리스트'를 입력하면 분류에 따라 엄선한 음악을 추천드립니다!"
                    +"\n"+"- '설정'을 입력하면 썸네일 출력 여부, 추천 음악 개수(1~4), 유튜브 주소 전송 여부를 설정하실 수 있습니다."
                    +"\n"+"- 이 도움말을 다시 보고 싶으시다면 '도움말'을 입력하시면 됩니다! 음악과 함께 좋은 하루 보내세요.";
            HELP(replyToken,sendMessage);
            break;
        case "설정":
            SETTINGS(replyToken);
            break;
        default: //일반 검색
            var optionParams={
                q:message,
                part:"snippet",
                type:"video",
                key:Info.YoutubeKey,
                maxResults:10
             };
            optionParams.q=encodeURI(optionParams.q);
            var url="https://www.googleapis.com/youtube/v3/search?";
            for(var option in optionParams){
                url+=option+"="+optionParams[option]+"&";
            }
            
            //url의마지막에 붙어있는 & 정리
            url=url.substr(0, url.length-1);
            
            request(url, function(err, res, body){
                var title=[]
                var url2=[]
                var data=JSON.parse(body).items;
                for(var content in data)
                {
                    title.push(data[content].snippet.title);
                    url2.push(data[content].id.videoId);
                }
                if (title.length==0)
                    console.log('검색된 동영상이 없습니다.');
                else
                    SEND(replyToken,title,url2,setting_Thumbnail[setting_userId.indexOf(userId)],setting_SendAmount[setting_userId.indexOf(userId)],setting_SendAddress[setting_userId.indexOf(userId)]);
            });
    }
}