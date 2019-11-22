define(["jquery","jquery-cookie"],function($){
    function download(){
        $.ajax({
            type: "get",
            url: "data/index.json",
            success: function (data) {
                var arr = data.hotListBox;
                for(var i = 0; i < arr.length; i++){
                    // alert(arr.length);
                    var node = $(`<li class="detail" id="${arr[i].id}">
                            <div class="imgBox">
                                <a href="goods.html?id=${arr[i].id}">
                                <img src="${arr[i].img}" alt=""></a>
                            </div>
                            <p class="title">${arr[i].title}</p>
                            <p class="info">${arr[i].model}</p>
                            <p class="mon">
                                <span class="price">${arr[i].price}</span>
                                <span class="time">限时</span>
                            </p>
                            <div class="bottomList">
                                <a href="" id="">对比</a>
                                <a href="">2171人评价</a>
                                <a href="shoppingCar.html">加入购物车</a>
                            </div>
                        </li>`);
                    node.appendTo(".detailList");
                }
            }
        });
    }


    return{
        download:download,
    }
})