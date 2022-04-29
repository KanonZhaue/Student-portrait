var id=1
function getId_pie(){
    id = document.getElementById("id").value;
    if (id == "") {
        return 
    }


    d3.json("./src/data/u_college_id.json").then(d => {
        var all_student = d['data']
        if (all_student.hasOwnProperty(id))
            {
        d3.selectAll(".pie_path").remove()
        d3.selectAll(".pie_label").remove()
        d3.selectAll(".pie_label_lines").remove()
        
        const pieData = [],labels_ever = [];

d3.json("./src/data/id_card_consume.json").then(d => {
    
    for(let key  in d[id]){
        labels_ever.push(key)
        pieData.push(d[id][key]);
    }

////
const radius = width*0.7 /2 +30
var outerArc = d3.arc()
    .innerRadius(1.15 * radius)
    .outerRadius(1.15 * radius);
    var oArc = d3.arc()
    .innerRadius(1.1 * radius)
    .outerRadius(1.1 * radius);

const pie = d3.pie()
const arc = d3.arc().innerRadius(0).outerRadius(radius)
// .log(arc);
const svg_piemain = d3.select(".pie")
                .append("g")
                .attr("transform", `translate(${width/2+30},${height/2+120})`)

const arcs = svg_piemain.selectAll("arc")
                .data(pie(pieData))
                .enter()
                .append("g");
// 绘制每个扇形
arcs.append("path")
        .attr("class","pie_path")
        .transition()
        .duration((data,i)=>{
            return i * 100;
        })
        .attr("fill",(data,i)=>{
            return d3.schemeSet3[i+1];
        })
        .attr("opacity",0.80)
        .attr("stroke", "white")
        .attr("d",arc);
// 添加每部分对应的文字
arcs.append("text")
        .attr("class","pie_label")
        // .attr("transform",(d)=>{
        //     const x =  arc.centroid(d)[0] * 2
        //     const y =  arc.centroid(d)[1] * 2
        //     return `translate(${x},${y})`;
        // })
        .attr('transform', function(d, i) {
            // 找出外弧形的中心点
            const pos = outerArc.centroid(d);
            pos[0] = radius * (midAngel(d)<Math.PI ? 1.2 : -1.2);
            return 'translate(' + pos + ')';
        })
        .text((d,i)=>{
            if(Math.abs(d.startAngle - d.endAngle) < Math.PI / 27){
                return ""
            }else{
                return (Math.abs(d.startAngle - d.endAngle)/Math.PI / 2*100).toFixed(1)+"%" ;
            }
        })
        .attr("font-size","10px")

// 绘制标签的连线
svg_piemain.append("g").attr("class","pie_label_lines")
        .selectAll(".pie_label_lines")
        .data(pie(pieData))
        .enter()
        .append("polyline")
        .attr("class","pie_label_lines")
        .attr("points",(d)=>{
            const pos = outerArc.centroid(d);
            pos[0] = radius * (midAngel(d)<Math.PI ? 1.2 : -1.2);
            return [oArc.centroid(d), outerArc.centroid(d), pos];
        })
        .style("opacity",(d)=>{
            return Math.abs(d.startAngle - d.endAngle) < Math.PI / 27 ? 0 : 0.7;
        })
        .attr("fill","none")
        .attr("stroke","rgb(199, 167, 126)")

function midAngel(d) {
    return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

//给每个图元添加交互效果
const piePath = document.querySelectorAll(".pie_path")
for (let i = 0; i < piePath.length; i++){
    piePath[i].addEventListener("mouseover",function(e) {
        piePath[i].style.opacity = 1;
    })
    piePath[i].addEventListener("mouseout",function(e) {
        piePath[i].style.opacity = 0.8;
    })
}


////
    })

            }

        
        
        ////
            
                
                

                

        
        else {
            
            return;
            }
        })
    }




    let height_pie = document.querySelector(".pie").clientHeight;
    let width_pie = document.querySelector(".pie").clientWidth;
    let label_position = width_pie - 30;
    const colors = [];
    for (let i=1;i<=8;i++){
        colors.push(d3.schemeSet3[i])
    }

//     var labels_pie = [];
// d3.json("./src/data/id_card_consume.json").then(d => {
//      console.log(d[id])
//     for(let key  in d[id]){
       
//         labels_pie.push(key);
//     }
    
//     console.log(labels_pie)
// })

// 绘制图例的图形
const svg_pie = d3.select(".pie")
        svg_pie.append("g")
            .attr("transform", "translate("+ [label_position - 25] +",5)")
            .selectAll(".pie_labels")
            .data(colors)
            .enter()
            .append("rect")
            .attr("class", "pie_labels")
            .attr("fill",(d,i)=>{
                return d3.schemeSet3[i+1];
            })
            .attr("y", (d,i)=>{
                return i * 10+"px";
            })
            .attr("width", "20px")
            .attr("height","10px")
            .attr("stroke","rgb(233, 160, 26)")
        
            const labels_pie=[];
            d3.json("./src/data/id_card_consume.json").then(d => {
               
                for(let key  in d[id]){
                
                    labels_pie.push(key);
                }
                
                // console.log(labels_pie)
                svg_pie.append("g")
                    .attr("transform", "translate("+ [label_position ] +",12)")
                    .selectAll(".pie_label_text")
                    .data(labels_pie)
                    .enter()
                    .append("text")
                    .attr("y",(d,i)=>{
                        return i * 10+"px";
                    })
                    .attr("class", "pie_label_text")
                    .attr("font-size", "8px")
                    .text((d)=>{return d})
            })

/////
const pieData = [],labels_ever = [];

d3.json("./src/data/id_card_consume.json").then(d => {
    
    for(let key  in d[id]){
        labels_ever.push(key)
        pieData.push(d[id][key]);
    }

////
const radius = width*0.7 /2 +30
var outerArc = d3.arc()
    .innerRadius(1.15 * radius)
    .outerRadius(1.15 * radius);
    var oArc = d3.arc()
    .innerRadius(1.1 * radius)
    .outerRadius(1.1 * radius);

const pie = d3.pie()
const arc = d3.arc().innerRadius(0).outerRadius(radius)
// console.log(arc);
const svg_piemain = d3.select(".pie")
                .append("g")
                .attr("transform", `translate(${width/2+30},${height/2+120})`)

const arcs = svg_piemain.selectAll("arc")
                .data(pie(pieData))
                .enter()
                .append("g");
// 绘制每个扇形
arcs.append("path")
        .attr("class","pie_path")
        .transition()
        .duration((data,i)=>{
            return i * 100;
        })
        .attr("fill",(data,i)=>{
            return d3.schemeSet3[i+1];
        })
        .attr("opacity",0.80)
        .attr("stroke", "white")
        .attr("d",arc);
// 添加每部分对应的文字
arcs.append("text")
        .attr("class","pie_label")
        // .attr("transform",(d)=>{
        //     const x =  arc.centroid(d)[0] * 2
        //     const y =  arc.centroid(d)[1] * 2
        //     return `translate(${x},${y})`;
        // })
        .attr('transform', function(d, i) {
            // 找出外弧形的中心点
            const pos = outerArc.centroid(d);
            pos[0] = radius * (midAngel(d)<Math.PI ? 1.2 : -1.2);
            return 'translate(' + pos + ')';
        })
        .text((d,i)=>{
            if(Math.abs(d.startAngle - d.endAngle) < Math.PI / 27){
                return ""
            }else{
                return (Math.abs(d.startAngle - d.endAngle)/Math.PI / 2*100).toFixed(1)+"%" ;
            }
        })
        .attr("font-size","10px")

// 绘制标签的连线
svg_piemain.append("g").attr("class","pie_label_lines")
        .selectAll(".pie_label_lines")
        .data(pie(pieData))
        .enter()
        .append("polyline")
        .attr("class","pie_label_lines")
        .attr("points",(d)=>{
            const pos = outerArc.centroid(d);
            pos[0] = radius * (midAngel(d)<Math.PI ? 1.2 : -1.2);
            return [oArc.centroid(d), outerArc.centroid(d), pos];
        })
        .style("opacity",(d)=>{
            return Math.abs(d.startAngle - d.endAngle) < Math.PI / 27 ? 0 : 0.7;
        })
        .attr("fill","none")
        .attr("stroke","rgb(199, 167, 126)")

function midAngel(d) {
    return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

//给每个图元添加交互效果
const piePath = document.querySelectorAll(".pie_path")
for (let i = 0; i < piePath.length; i++){
    piePath[i].addEventListener("mouseover",function(e) {
        piePath[i].style.opacity = 1;
    })
    piePath[i].addEventListener("mouseout",function(e) {
        piePath[i].style.opacity = 0.8;
    })
}


////
    })

