
const restaurantList = document.querySelector(".restaurant-list");

fetch('./restaurant.json')
    .then(response => {
        if (!response.ok) throw new Error('JSON 파일을 불러올 수 없습니다.');
            return response.json();
    })
    .then(data => {
    // 중복 제거 및 유효성 검사
        restaurant = data;

        restaurant.forEach(element => {
            const nowRestaurant = document.createElement("div");
            nowRestaurant.className = "restaurant-list-item";
            nowRestaurant.onclick = () => { addMenuItemFromList(element.name) };
            nowRestaurant.innerHTML = element.name;
            restaurantList.appendChild(nowRestaurant);
        });
    });