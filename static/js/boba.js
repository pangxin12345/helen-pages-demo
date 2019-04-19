$(function () {
    let hash = location.hash.substr(1) || 0;
    let pageNo = +hash;
    let pageSize = 50;

    function getData(type){
        if(type === "data_car"){
            return new Promise(function(resolve, reject){
                $.getJSON('http://boba.video/static/data/data_car.json', function(res){
                    resolve(res)
                })
            })
        }
        if(type === "data_car_video"){
            return new Promise(function(resolve, reject){
                $.getJSON('http://boba.video/static/data/data_car_video.json', function(res){
                    resolve(res)
                })
            })
        }
        if(type === "data_cn_video"){
            return new Promise(function(resolve, reject){
                $.getJSON('http://boba.video/static/data/data_cn_video.json', function(res){
                    resolve(res)
                })
            })
        }
        if(type === "data_en_video"){
            return new Promise(function(resolve, reject){
                $.getJSON('http://boba.video/static/data/data_en_video.json', function(res){
                    resolve(res)
                })
            })
        }

    }
    
    getData("data_car").then(res => {
        let temp = res;

        let total = temp.length;
        let totalPage = Math.ceil(total / pageSize);

        tb_render(temp.slice(pageNo * pageSize, (pageNo + 1) * pageSize));
        page_render(pageNo, totalPage);

        window.addEventListener("hashchange", function(){
            let hash = location.hash.substr(1) || 0;
            let pageNoTemp = +hash;
            tb_render(temp.slice(pageNoTemp * pageSize, (pageNoTemp + 1) * pageSize));
            if(pageNoTemp > pageNo){
                pageNo++;
            }else{
                pageNo--;
            }
            page_render(pageNo, totalPage);
            
        }, false);
    })

    function tb_render(data){
        let body = document.getElementById('videoContent');
        let tempStr = '';
        data.forEach(item => {
            let row = `<tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.duration}</td>
                <td>
                    <div class="am-btn-toolbar">
                        <div class="am-btn-group am-btn-group-xs">
                            <button data-clipboard-text="#${item.id}" class="am-btn am-btn-default am-btn-xs am-text-primary genBtn">
                                复制编号
                            </button>
                        </div>
                    </div>
                </td>
            </tr>`;

            tempStr += row;
        });
        $(body).html('').append(tempStr);
    }

    new ClipboardJS('.genBtn');

    

    function page_render(pageNo, totalPage){
        let body = document.getElementById('page');
        let page = '';
        let next = null,
            prev = null;
        if(pageNo < totalPage - 1){
            if(pageNo <= 0){
                prev = 0;
                next = pageNo + 1;
            }else{
                prev = pageNo - 1;
                next = pageNo + 1;
            }
        }else{
            if(pageNo <= 0){
                prev = 0;
                next = totalPage - 1;
            }else{
                prev = pageNo - 1;
                next = totalPage - 1;
            }
        }
        page = `<li class="am-pagination-prve"><a href="#${prev}">&laquo; 上一页</a></li>
                        <li class="am-pagination-next"><a href="#${next}">下一页 &raquo;</a></li>`;
        $(body).html('').append(page);
    }

});