$(function () {
    let pageNo = Number(qs().pageNo) || 0;
    let pageSize = 50;

    function getData(type) {
        return new Promise(function (resolve, reject) {
            $.getJSON(`http://boba.video/static/data/${type}.json`, function (res) {
                resolve(res)
            })
        })
    }

    let name = qs().name;

    if (name == "" || name == null || name == undefined) {
        name = "data_car";
    }else if(name == "cv"){
        name = "data_car_video";
    }else if(name == "cnv"){
        name = "data_cn_video";
    }else if(name == "env"){
        name = "data_en_video";
    }


    getData(name).then(res => {
        let temp = res;
        let k = qs().k && decodeURIComponent(qs().k);
        if (k) {
            document.getElementById('k').value = k;
            temp = temp.filter(item => {
                return item.name.includes(k)
            });
        }
        let total = temp.length;
        let totalPage = Math.ceil(total / pageSize);

        tb_render(temp.slice(pageNo * pageSize, (pageNo + 1) * pageSize));
        page_render(pageNo, totalPage);
    })

    function tb_render(data) {
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

    new ClipboardJS('#qq-btn, .genBtn');

    function page_render(pageNo, totalPage) {
        let body = document.getElementById('page');
        let page = '';
        let next = null,
            prev = null;
        if (pageNo < totalPage - 1) {
            if (pageNo <= 0) {
                prev = 0;
                next = 1;
            } else {
                prev = pageNo - 1;
                next = pageNo + 1;
            }
        } else {
            if (pageNo <= 0) {
                prev = 0;
                next = totalPage - 1;
            } else {
                prev = pageNo - 1;
                next = totalPage - 1;
            }
        }
        page = `${pageNo <= 0 ? '' : `<li class="am-pagination-prve"><a href="?pageNo=${prev}">&laquo; 上一页</a></li>`}
                ${pageNo >= totalPage - 1 ? '' : `<li class="am-pagination-next"><a href="?pageNo=${next}">下一页 &raquo;</a></li>`}`;
        $(body).html('').append(page);
    }

    function qs() {
        let result = {};
        if (location.search) {
            let str = location.search.substr(1);
            let param = str.split('&');
            param.forEach(item => {
                let arg = item.split('=');
                result[arg[0]] = arg[1];
            })
        }
        return result;
    }

});
