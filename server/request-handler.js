/* eslint-disable no-console */
/*************************************************************
 
 request handler 함수를 여기서 작성합니다.
 
 reuqestHandler 함수는 이미 basic-server.js 파일에서 사용 했지만, 아직 작동하지 않습니다.
 
 requestHandler 함수를 export 하여 basic-server.js 에서 사용 할 수 있게 하세요
 
 **************************************************************/
const requestHandler = function (request, response) {
  // node server 의 requestHandler는 항상 request, response를 인자로 받습니다.
  // console.log(request);

  request.setEncoding("utf8");
  var message = ""; //메세지 배열에 문자가 들어갔다고 가정.
  request.on("data", (chunk) => {
    message += chunk;
  });

  request.on("end", () => {
    // console.log("리퀘스트", message); // 이거를 지우고
    if (request.method === "OPTIONS") {
      response.writeHead(200, headers);
      response.end();
    } else if (request.method !== "POST") {
      response.end("4040404040");
    } else if (request.method === "POST") {
      if (request.url === "/") {
        //이거를 한번 변경하는 것을 고려.
        // response.end(JSON.stringify(message));
        response.end();
        console.log("리퀘스트 안의 유알엘", message);
      }
    }
  });

  /*
      여기에
    */

  // 1. 인코딩 -> 2. on data => chunk => message 3. message on end
  // 1. 리퀘스트 핸들러니까 - 요청을 하고, 요청을 받아서, 응답까지

  // 또한 http 요청은 항상 요청과 응답이 동반 되어야 합니다.
  //
  // 이것들은 요청에 대한 정보를 담고 있습니다. 예를들면, 요청 url과 method 등을 담고 있습니다.
  //
  // 기본적인 로그를 작성 하세요
  //
  // 간단한 로그를 작성 하는 것은, 서버를 디버깅 하는데 매우 수월하게 해줍니다.
  // 아래는 모든 리퀘스트의 메소드와 url을 로깅 해줍니다.
  console.log(
    "Serving request type " + request.method + " for url " + request.url
  );

  // 응답을 위한 status 코드입니다.
  const statusCode = 200;

  // 기본 CORS 설정이 되어있는 코드 입니다. 아래에 있습니다.
  // CORS에 대해서는 조금더 알아보세요.
  const headers = defaultCorsHeaders;
  // 응답 헤더에 응답하는 컨텐츠의 자료 타입을 헤더에 기록 합니다.
  headers["Content-Type"] = "text/plain";

  // .writeHead() 메소드는 응답 헤더에 해당 key, value 를 적어줍니다.
  response.writeHead(statusCode, headers);

  // 노드 서버에 대한 모든 요청은 응답이 있어야 합니다. response.end 메소드는 요청에 대한 응답을 보내줍니다.
  // response.end("Hello, World!");
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
const defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
};

module.exports = requestHandler;

// request.setEncoding("utf8"); //이거 개념 좀 더 보고
// var message = ""; // chunk 단위로 전부 쪼개져서 오기 때문에, 메세지 변수가 빈 배열로 설정이 되어있다면, concat을 통해서 합칠 수 있음
// //여기서부터 시작
// request.on("data", (chunk) => {
//   console.log(chunk); // 뭘 받아왔는가
//   message += chunk; //만약 2개 이상을 받을때는?? 배열로써 설정하는건가?
// });

// request.on("end", () => {
//   if (request.method === "OPTIONS") {
//     response.writeHead(200, headers);
//     response.end();
//   } else if (request.method !== "POST") {
//     response.end("404 error POST request");
//   } else {
//     if (request.url === "/upper") {
//       response.end(JSON.stringify(message.toUpperCase()));
//     }
//     if (request.url === "/lower") {
//       response.end(JSON.stringify(message.toLowerCase()));
//     }
//   }
