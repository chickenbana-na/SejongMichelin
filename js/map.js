// 지도 초기화
const map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.550848, 127.074607),
    zoom: 16
});

function loadMap(y, x) {
    map.setCenter(new naver.LatLng(y,x));
}

// JSON 파일 불러오기
fetch('./restaurant.json')
    .then(response => {
        if (!response.ok) throw new Error('JSON 파일을 불러올 수 없습니다.');
            return response.json();
    })
    .then(data => {
    // 중복 제거 및 유효성 검사
        const unique = new Map();
        const filtered = data.filter(place =>
        place.name && !unique.has(place.name) && unique.set(place.name, true)
    );

    filtered.forEach(place => {
        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(place.position[0], place.position[1]),
            map: map,
            title: `${place.name} (${place.type})`
        });

        const infoWindow = new naver.maps.InfoWindow({
                        content: `<div style="padding:5px;"><strong>${place.name}</strong><br>${place.type}</div>`
        });

        naver.maps.Event.addListener(marker, 'click', () => {
            infoWindow.open(map, marker);
        });
    });
})
.catch(error => {
    console.error('마커 로딩 실패:', error);
});