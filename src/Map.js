import React, { useEffect, useState, useRef } from 'react'

const { kakao, position } = window;

const Map = () => {
  const initMap = () => {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.56851724054563, 126.9744523105797), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    console.log(map.getBounds())

    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        
        let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용입니다
      
      // 마커와 인포윈도우를 표시합니다
      displayMarker(locPosition, message);

      var ps = new kakao.maps.services.Places(); 
      let location = new kakao.maps.LatLng(lat, lon)
      let radius=3000
      // 키워드로 장소를 검색합니다
      ps.keywordSearch('치킨', placesSearchCB, {location, radius}); 
    });

    console.log(map.getBounds())


    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status) {
        if (status === kakao.maps.services.Status.OK) {
            console.log(data[0].place_url)

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();

            for (var i=0; i<data.length; i++) {
                searchDisplayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            // map.setBounds(bounds);
        } 
    }

    // 지도에 마커를 표시하는 함수입니다
    function searchDisplayMarker(place) {
        
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            console.log(place)
            infowindow.open(map, marker);
        });
    }
    

    function displayMarker(locPosition, message) {

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
          map: map, 
          position: locPosition
      }); 
      
      var iwContent = message, // 인포윈도우에 표시할 내용
          iwRemoveable = true;
  
      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
          content : iwContent,
          removable : iwRemoveable
      });
      
      // 인포윈도우를 마커위에 표시합니다 
      infowindow.open(map, marker);
      
      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);      
  }    

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
        infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다


    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    // kakao.maps.event.addListener(map, 'idle', function() {
    //     searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    // });

    function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    }

    function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    // function displayCenterInfo(result, status) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     var infoDiv = document.getElementById('centerAddr');

    //     for(var i = 0; i < result.length; i++) {
    //         // 행정동의 region_type 값은 'H' 이므로
    //         if (result[i].region_type === 'H') {
    //             infoDiv.innerHTML = result[i].address_name;
    //             break;
    //         }
    //     }
    //   }    
    // }

    

  };

  useEffect(() => {
    initMap();
  }, []);
  
  return (
      <React.Fragment>
      <div id="map" style={{width:"100%", height:"100vh"}}></div>
      {/* <div id="centerAddr"></div> */}
      </React.Fragment>
  );
}


export default Map;