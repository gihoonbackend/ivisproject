// 실시간 시간
function updateTime(){
    var d = new Date();
    var date = d.toLocaleDateString();
    var time = d.toLocaleTimeString();
    document.getElementById("date").innerHTML = date + " " + time;
    setTimeout(updateTime, 1000);
  }
  updateTime();



// 지도
var mapContainer = document.getElementById('map'),
    mapOption = { 
        center: new kakao.maps.LatLng(37.29964798270139, 127.04561185324106),
        level: 3
    };  
var map = new kakao.maps.Map(mapContainer, mapOption);


// Vehicle 1
document.querySelector("#v1").addEventListener("click", function() {
document.querySelector("#car-space").innerHTML = '<img src="blue.png" /><br />VEHICLE 1';

fetch("Vehicle1.txt")
  .then(response => response.text())
  .then(data => {
    let rows = data.split("\n");
    let linePath = [];
  
    rows.forEach(row => {
      let coords = row.split(", ");
      let lat = parseFloat(coords[0]);
      let lng = parseFloat(coords[1]);
      linePath.push(new kakao.maps.LatLng(lat, lng));
    });
    
              // 지도에 표시할 선을 생성합니다
              var polyline = new kakao.maps.Polyline({
                path: linePath, // 선을 구성하는 좌표배열 입니다
                strokeWeight: 7, // 선의 두께 입니다
                strokeColor: '#84a0e1', // 선의 색깔입니다
                strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid' // 선의 스타일입니다
            });
            // 지도에 선을 표시합니다 
            
            var a = 0;
            let intervalId;
            var table = document.querySelector("#table");

            document.querySelector("#btn_go").addEventListener("click", function() {
              
                intervalId = setInterval(function() {
                    if (a < linePath.length) {
                        polyline.setMap(map);
                        polyline.setPath(linePath.slice(0, a + 1));
                        var position = linePath[a]; 
                        var markerImage = new kakao.maps.MarkerImage(
                            "bluecar.png", 
                            new kakao.maps.Size(30, 15),
                            new kakao.maps.Point(10, 10)
                        );
                        var marker = new kakao.maps.Marker({
                            position: position,
                            image: markerImage
                        });
                        marker.setMap(map); 
                        if (a < linePath.length) {
                            setTimeout(function() {
                                marker.setMap(null);
                            }, 100);
                        }
                        var row = table.insertRow();
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        cell1.innerHTML = position.getLat();
                        cell2.innerHTML = position.getLng();
                        a++;
                    } else {
                        clearInterval(intervalId);
                    }
                }, 100);
                
            });
            
            document.querySelector("#btn_stop").addEventListener("click", function() {
                clearInterval(intervalId);
            });
            document.querySelector("#btn_re").addEventListener("click", function() {
              a = 0;
              while (table.rows.length > 0) {
                table.deleteRow(0);}
              clearInterval(intervalId);
              polyline.setMap(null); 
              marker.setMap(null);
              a = 0;
      });
    });
});


document.querySelector("#v2").addEventListener("click", function() {
document.querySelector("#car-space").innerHTML = '<img src="red.png" /><br/>VEHICLE 2';

//Vehicle2
fetch("Vehicle2.txt")
  .then(response => response.text())
  .then(data => {
    let rows = data.split("\n");
    let linePath2 = [];
    rows.forEach(row => {
      let coords = row.split(", ");
      let lat = parseFloat(coords[0]);
      let lng = parseFloat(coords[1]);
      linePath2.push(new kakao.maps.LatLng(lat, lng));
    });
    // linePath 배열을 이용하여 지도에 경로 표시
    // 지도에 표시할 선을 생성합니다
        var polyline2 = new kakao.maps.Polyline({
          path: linePath2, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 7, // 선의 두께 입니다
          strokeColor: '#ff8686', // 선의 색깔입니다
          strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid' // 선의 스타일입니다
          });
          
          var b = 0;
          let intervalId2;
          var table = document.querySelector("#table");

          
          document.querySelector("#btn_go").addEventListener("click", function() {
          intervalId2 = setInterval(function() {
          if (b < linePath2.length) {
          polyline2.setMap(map);
          polyline2.setPath(linePath2.slice(0, b + 1));
          var position = linePath2[b];
          var markerImage = new kakao.maps.MarkerImage(
          "redcar.png",
          new kakao.maps.Size(30, 15),
          new kakao.maps.Point(10, 10)
          );
          var marker = new kakao.maps.Marker({
          position: position,
          image: markerImage
          });
          marker.setMap(map);
          if (b < linePath2.length) {
          setTimeout(function() {
          marker.setMap(null);
          }, 100);
          }
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          cell1.innerHTML = position.getLat();
          cell2.innerHTML = position.getLng();
        b++;
          } else {
          clearInterval(intervalId2);
          }
          }, 100);
          });
          
          document.querySelector("#btn_stop").addEventListener("click", function() {
          clearInterval(intervalId2);
          });
          
          document.querySelector("#btn_re").addEventListener("click", function() {
            b = 0;
            while (table.rows.length > 0) {
              table.deleteRow(0);}
            clearInterval(intervalId2);
            polyline2.setMap(null);
            marker.setMap(null);
            b = 0;
        });
  });
});

