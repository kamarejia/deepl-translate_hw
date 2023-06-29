document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();

  let message = document.getElementById("textbox").value;
  const url = "http://127.0.0.1:5000/api/text_processing";

  if (message) {
    console.log(message);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: message
    })
      .then(response => {
        if (response.ok) {
          console.log("リクエストが成功しました");
          return response.json(); 
        } else {
          console.log("リクエストが失敗しました");
          throw new Error("リクエストが失敗しました");
        }
      })
      .then(data => {
        console.log("バックエンドからのデータ:", data.processed_data);
        document.getElementById("textbox").value = "";
        const wordList = document.getElementById("word-list");
        //wordlistを空に
        wordList.innerHTML = ""; 

        //wordlist作成
        const ul = document.createElement("ul"); 
        data.processed_data.forEach(word => {
          const li = document.createElement("li"); 
          li.textContent = word; 
          ul.appendChild(li); 
        });
        wordList.appendChild(ul); 
      })
      .catch(error => {
        console.log("リクエストエラー:", error);
      });
  } else {
    alert("メッセージが入力されていません");
  }
});

//コピー機能
document.getElementById("copy-button").addEventListener("click",function(){
  let list=document.getElementById("word-list");
  let items=list.getElementsByTagName("li");
  let content="";

  for(let i=0;i<items.length;i++){
    content +=items[i].innerText+"\n";
  }
  
  navigator.clipboard.writeText(content)
});