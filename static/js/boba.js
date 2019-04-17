$(function () {
    let hash = location.hash.substr(1) || 0;
    let pageNo = +hash;
    let pageSize = 1;

    let temp = [{"duration":"0小时16分","id":256,"name":"老车主已“哭晕” 长安CS75改的很彻底"},{"duration":"0小时16分","id":129,"name":"《萝卜报告》大元体验全新宝马5系Li"},{"duration":"0小时16分","id":1,"name":"30多万买奔驰大S！还是高配！你受得了吗 | 萝卜小报告"},{"duration":"0小时16分","id":1,"name":"30多万买奔驰大S！还是高配！你受得了吗 | 萝卜小报告"}];

    let total = temp.length;
    let totalPage = Math.ceil(total / pageSize);

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
                                生成
                            </button>
                        </div>
                    </div>
                </td>
            </tr>`;

            tempStr += row;
        });
        $(body).html('').append(tempStr);
    }

    tb_render(temp.slice(pageNo * pageSize, (pageNo + 1) * pageSize));
    page_render(pageNo);

    new ClipboardJS('.genBtn');

    window.addEventListener("hashchange", function(){
        let hash = location.hash.substr(1) || 0;
        let pageNoTemp = +hash;
        tb_render(temp.slice(pageNoTemp * pageSize, (pageNoTemp + 1) * pageSize));
        if(pageNoTemp > pageNo){
            pageNo++;
        }else{
            pageNo--;
        }
        page_render(pageNo);
        
    }, false);

    function page_render(pageNo){
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