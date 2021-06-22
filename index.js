var express = require('express');
var Info = require('./Info');
const request = require('request');
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const sslport = 23023;
const bodyParser = require('body-parser');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
var app = express();
app.use(bodyParser.json());
var songs = require('./check');
app.post('/hook', function (req, res) {

    var eventObj = req.body.events[0];
    var message = eventObj.message;

    // request log
    console.log('======================', new Date(), '======================');
    
    if (eventObj.type=="message") // 일반 메시지일때
    {
        react(eventObj.replyToken, message.text,eventObj.source.userId);
    }
        
    else
    switch (eventObj.postback.data) {
        case "썸네일": //설정에서 썸네일 설정버튼을 눌렀을때
            songs.thumbnail_settings(eventObj.replyToken);
            break;
            case "enablethumbnail": //설정 -> 썸네일 설정 -> 활성화
                songs.enablethumbnail(eventObj.replyToken,eventObj.source.userId);
                break;
            case "unablethumbnail": //설정 -> 썸네일 설정 -> 비활성화
                songs.unablethumbnail(eventObj.replyToken,eventObj.source.userId);
                break;

        case "개수": //설정에서 전송 개수 설정버튼을 눌렀을때
            songs.amount_settings(eventObj.replyToken,eventObj.source.userId);
            break;
            case "amount1": //설정 -> 전송 개수 -> 1
                songs.amount1(eventObj.replyToken,eventObj.source.userId);
                break;
            case "amount2": //설정 -> 전송 개수 -> 2
                songs.amount2(eventObj.replyToken,eventObj.source.userId);
                break;
            case "amount3": //설정 -> 전송 개수 -> 3
                songs.amount3(eventObj.replyToken,eventObj.source.userId);
                break;
            case "amount4": //설정 -> 전송 개수 -> 4
                songs.amount4(eventObj.replyToken,eventObj.source.userId);
                break;

        case "주소": //설정에서 유튜브 주소 설정버튼을 눌렀을때
            songs.address_settings(eventObj.replyToken);
            break;
            case "enableaddress": //설정 -> 주소 설정 -> 활성화
                songs.enableaddress(eventObj.replyToken,eventObj.source.userId);
                break;
            case "unableaddress": //설정 -> 주소 설정 -> 비활성화
                songs.unableaddress(eventObj.replyToken,eventObj.source.userId);
                break;
        

        case "genre": // 플레이리스트 -> 장르
            songs.genre(eventObj.replyToken);
            break;

            case "hiphop": // 플레이리스트 -> 장르 -> 힙합
                songs.hiphop(eventObj.replyToken,eventObj.source.userId);
                break;
            case "piano": // 플레이리스트 -> 장르 -> 피아노
                songs.piano(eventObj.replyToken,eventObj.source.userId);
                break;
            case "pop": // 플레이리스트 -> 장르 -> 팝
                songs.pop(eventObj.replyToken,eventObj.source.userId);
                break;

        case "mood": // 플레이리스트 -> 무드
            songs.mood(eventObj.replyToken);
            break;

            case "exciting": // 플레이리스트 -> 무드 -> 신남
                songs.exciting(eventObj.replyToken,eventObj.source.userId);
                break;
            case "sad": // 플레이리스트 -> 무드 -> 슬픔
                songs.sad(eventObj.replyToken,eventObj.source.userId);
                break;

        case "singer": // 플레이리스트 -> 가수
            songs.singer(eventObj.replyToken);
            break;

            case "blackpink": // 플레이리스트 -> 가수 -> 블랙핑크
                songs.blackpink(eventObj.replyToken,eventObj.source.userId);
                break;
            case "iu": // 플레이리스트 -> 가수 -> 아이유
                songs.iu(eventObj.replyToken,eventObj.source.userId);
                break;
            case "redvelvet": // 플레이리스트 -> 가수 -> 레드벨벳
                songs.redvelvet(eventObj.replyToken,eventObj.source.userId);
                break;
            case "twice": // 플레이리스트 -> 가수 -> 트와이스
                songs.twice(eventObj.replyToken,eventObj.source.userId);
                break;
        }
        res.sendStatus(200);
    }
);
function react(replyToken, message,userId) {

    request.post(
        {
            body: message
        },

        function () {
            songs.check(message, replyToken,userId);
        }
    );
}
try {
    const option = {
        ca: fs.readFileSync('/etc/letsencrypt/live/' + Info.domain + '/fullchain.pem'),
        key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + Info.domain + '/privkey.pem'), 'utf8').toString(),
        cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + Info.domain + '/cert.pem'), 'utf8').toString(),
    };

    HTTPS.createServer(option, app).listen(sslport, () => {
        console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
} catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
}
