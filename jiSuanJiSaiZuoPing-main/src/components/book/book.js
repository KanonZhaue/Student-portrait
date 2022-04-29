t = 9//初始化为9
ChangeBooks(9)

var personHead = document.getElementById('personHead')

personHead.innerHTML = t + '号学院读书情况'



function ChangeBooks(index) {
    console.log(CollegeId)
    d3.selectAll(".PersonText").remove()
    fetch("./src/components/book/data/college_book_borrow.json").then(d => d.json())
        .then(d => {
            let data = []
            // console.log(d)
            // console.log(index)
            d1 = d[CollegeId]
            console.log(d1)
            // console.log(d1[1].name)
            for (let i = 0; i < d1.length; i++) {
                if (d1[i].name.indexOf("研修室") != -1) {
                    d1.splice(i, 1)
                    i--;
                    continue;
                }
                data.push(d1[i].value)
            }
            // console.log(d1)
            //console.log(d3.min(data))
            //console.log(d3.max(data))
            ValueToSizeScale = d3.scaleLinear()
                .domain([d3.min(data), d3.max(data)])
                .range([6, 50])
            var words_list = d1
            // console.log(words_list)
            var fill = ['#333', '#999', '#990', '#239', '#333', '#999', '#990', '#239', '#333', '#999', '#990', '#239', '#333', '#999', '#990', '#239', '#999', '#990', '#239', '#333', '#999', '#990', '#239', '#333', '#999', '#990', '#239'];  //输出20种类别的颜色 ---颜色比例尺
            var layout = d3.layout.cloud()
                .size([380, 250])  //size([x,y]) 词云显示的大小                wda
                .words(d1.map(function (d) {
                    //console.log(d)
                    return { 'text': d.name, 'size': ValueToSizeScale(d.value) }
                }))
                // .padding(5)
                .rotate(function () { return (Math.floor(Math.random() * 4 - 2) * 45); })
                // .rotate(function() { return ~~(Math.random() * 2) * 90; })

                .font("Impact")
                .fontSize(function (d) { return d.size })
                .on("end", draw)
                .start();

            function draw(words) {

                
                    // .style('visibility', 'hidden')   // 是否可见（一开始设置为隐藏）
                    // .attr("transform", "translate(190,140)")


                console.log(words)
                d3.select("#PersonSvg")
                    .append("g")
                    .attr("transform", "translate(190,140)")
                    .selectAll("text")
                    .data(words)
                    .join("text")
                    .attr("class", "PersonText")
                    .style("font-size", function (d) { return d.size + "px"; })
                    .style("font-family", "Impact")
                    .style("fill", function () {
                        return 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
                    })
                    .style('opacity', '1')
                    // .style("fill", function(d, i) { return fill[i]; })
                    .attr("text-anchor", "middle")
                    .attr("transform", function (d) {
                        // console.log(d)
                        // console.log(d['x'])
                        return "translate(" + d.x + ',' + d.y + ")rotate(" + d.rotate + ")";
                    })
                    .text(function (d) { return d.text; })
                    .attr('transition', '0.5s')


                    
                    //   .on('mousemove', function (d, i) {
                    //     return tooltip.style('top', (event.pageY-10)+'px').style('left',(event.pageX+10)+'px')
                    //   })
                    .on('mouseout', function (d, i) {
                        var BookTexts = document.getElementsByClassName("PersonText")
                        for (let i = 0; i < BookTexts.length; i++) {
                            BookTexts[i].style.opacity = 1;
                        }
                        var TextTooltip = document.getElementById('textTooltip')

                        TextTooltip.style.visibility = 'hidden'
                    })
                    .on('mouseover', function (d, i) {
                        var BookTexts = document.getElementsByClassName("PersonText")
                        for (let i = 0; i < BookTexts.length; i++) {
                            BookTexts[i].style.opacity = 0.2;
                        }
                        i.style.opacity = 1;
                        d.path[0].style.opacity = 1;
                        var TextTooltip = document.getElementById('textTooltip')
                        // var TextTooltipSvg = document.getElementById('textTooltipSvg')
                        var TextTooltipSvg = d3.select("#textTooltipSvg")
                        // var textTooltipName=TextTooltipSvg.selectAll('.Nametext')
                        //     .data(new Array(1))
                        //     .join('text')
                        //     .attr('class','Nametext')
                        //     .text(function(){return i.text})
                        //     .attr('transform','translate(30,20)')
                        var BookValue;
                        for (let j = 0; j < d1.length; j++) {
                            if (d1[j].name==i.text) {
                                BookValue = d1[j].value;
                                break;
                            }
                        }
                        console.log(BookValue)
                        var textCircle = TextTooltipSvg.select('circle')
                            .attr('fill',d.path[0].style.fill)
                        var textTooltipValue=TextTooltipSvg.selectAll('.Valuetext')
                            .data(new Array(1))
                            .join('text')
                            .attr('class','Valuetext')
                            .text(i.text+'    '+BookValue)
                            .attr('transform','translate(40,20)')    
                        TextTooltip.style.visibility = 'visible'
                        // TextTooltip.style.innerHTML = 'visible'
                        
                        TextTooltip.style.left = `${d.pageX}px`
                        TextTooltip.style.top = `${d.pageY}px`
                        // TextTooltipSvg.
                        // TextTooltip.style.innerHTML = i.text
                        console.log(d)
                        console.log(i)
                        console.log(i.text)


                    })
            }
        })
}


