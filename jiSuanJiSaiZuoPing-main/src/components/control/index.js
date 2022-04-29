var StudentId = 1
var CollegeId = 9
//初始化   1号学生
const labels = ["booking", "card", "dorm", "library", "score", "subsidy"]
const my_labels = ["借书数", "卡消费", "门禁总次数", "进出图书馆次数", "分数排名", "助学金"]
var start_avg = {
    "booking": 0,
    "card": 6182.69,
    "dorm": 312,
    "library": 2,
    "score": 2,
    "subsidy": 0,
    "college_id": "9"
}
var student_obj = document.getElementsByName('avg_student')
for (var i = 0; i < 6; i++) {
    var t = labels[i]
    student_obj[i].innerText = start_avg[t]
}

var start_college_avg = {
    "booking": 23.716,
    "card": 10117.443,
    "dorm": 253.505,
    "library": 114.803,
    "score": 1444.125,
    "subsidy": 220.588
}
var avg_co_obj = document.getElementsByName('avg_college')

for (var j = 0; j < 6; j++) {
    var t = labels[j]
    avg_co_obj[j].innerText = start_college_avg[t]
}


//查询的事件
function getId() {
    StudentId = document.getElementById("id").value;
    if (StudentId == "") {
        alert("未输入内容");
        return;
    }


    d3.json("./src/data/u_college_id.json").then(d => {
        var all_student = d['data']
        if (all_student.hasOwnProperty(StudentId)){}
        else {
            alert("未查询到内容")
            return;
        }


        avg = d['data'][`${StudentId}`]
        CollegeId = avg['college_id']
        var student_obj = document.getElementsByName('avg_student')
        for (var i = 0; i < 6; i++) {
            var t = labels[i]
            student_obj[i].innerText = avg[t]
        }
        var t = avg['college_id']
        change_college(CollegeId)
        // console.log(t)
        var collegeHead = document.getElementById('collegeHead')
        // console.log(collegeHead)
        collegeHead.innerHTML = `${CollegeId}号学院平均`
        var idHead = document.getElementById('idHead')
        idHead.innerHTML = `${StudentId}号学生数据`
        // console.log(document.getElementById('idHead'))
        console.log(t)
        console.log(CollegeId)        
        ChangeCollegeLines(CollegeId)
        console.log(CollegeId)        
        ChangeBooks(CollegeId)
        ChangeStudentLines(StudentId)
        ChangeTree(StudentId)
        var personHead = document.getElementById('personHead')

        personHead.innerHTML = t + '号学院读书情况'
    })


}

var svg = d3.select('#bar_svg')

var all_college = []

all_college = [128, 126, 751, 836, 933, 499, 328, 900, 1054, 266, 225, 177, 913, 211, 208, 119, 618, 54, 784]

const xScale = d3.scaleBand()
    .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
    .range([0, 420]);

const width = 290
const height = 112
const margin = { top: 0, left: 10, right: 10, bottom: 30 }
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom;

const g = svg.append("g").attr("id", "maingroup")
    .attr('transform', `translate(${margin.left},${margin.top})`)

const xAxis = d3.axisBottom(xScale);
g.append("g").call(xAxis).attr('transform', `translate(23,${innerHeight+5})`);

let rang = 70 / 950;
svg.append("g")
    .selectAll(".bar_rect")
    .data(all_college)
    .enter().append("rect")
    .attr("class", "bar_rect")
    .attr("width", "10")
    .transition()
    .duration((data, i) => {
        return i * 200;
    })
    .attr("height", (d, i) => {
        let rect_height = d * rang;
        return rect_height;
    })
    .attr("x", (d, index) => {
        return 40 + index * 22 + "px"
    })
    .attr("y", (d, index) => {
        let rect_height = d * rang;
        return 9 + 1054 * rang - rect_height
    })
    .attr("fill", "#FFCC99")

svg.append("g")
    .selectAll(".bar_rect")
    .data(all_college)
    .enter()
    .append('text')  //生成text元素。注意，这里就不要再加.enter()了
    .attr("x", (d, index) => {
        return 38 + index * 22 + "px"
    })
    .attr("y", (d, index) => {
        let rect_height = d * rang;
        return 9 + 1054 * rang - rect_height
    })
    .text(function (d, i) { //添加文字描述
        return d
    })
    .style("font-size", "70%")

var rects = svg.selectAll(".bar_rect")
rects.on("mouseover", function (d, i) {
    if (this.getAttribute('fill') == '#FF0000')
        return;
    d3.select(this)
        .attr("fill", "#009966");
})
    .on("mouseout", function (d, i) {
        // console.log(this)
        if (this.getAttribute('fill') == '#FF0000')
            return;
        d3.select(this)
            .attr("fill", "#FFCC99")
    })
//初始AVG给校平均赋值
var avg = {
    "booking": 26.28,
    "card": 9673.424,
    "dorm": 231.661,
    "library": 110.924,
    "score": 1065.256,
    "subsidy": 234.995
}




var co_obj = document.getElementsByName('college')

for (var i = 0; i < 6; i++) {
    var t = labels[i]
    co_obj[i].innerText = avg[t]
}




//点击柱状图的事件，也可用在点击查询事件中
function change_college(i) {
    // console.log(i)
    d3.json("./src/data/college_avg_data.json").then(d => {

        avg = d[`${i}`]["avg"]         //jnjn
        // console.log(avg)
        var avg_co_obj = document.getElementsByName('avg_college')
        // console.log(avg_co_obj)
        for (var j = 0; j < 6; j++) {
            var t = labels[j]
            avg_co_obj[j].innerText = avg[t]
        }
    })





}
rects
    .on("click", (e, d) => {
        bar_rects = document.getElementsByClassName('bar_rect')
        console.log(bar_rects)
        console.log(all_college.indexOf(d)+1)
        for(i=0;i<19;i++){
            bar_rects[i].style.fill = '#FFCC99'
        }
        bar_rects[all_college.indexOf(d)].style.fill = '#FF0000'
        ChangeBooks(all_college.indexOf(d) + 1)

        ChangeCollegeLines(all_college.indexOf(d) + 1)
        // console.log(i)

        // ChangeBooks(i+1)
        var t = all_college.indexOf(d) + 1
        console.log(t)
        console.log(d)

        CollegeId = all_college.indexOf(d)+1
        change_college(t)
        var collegeHead = document.getElementById('collegeHead')

        collegeHead.innerHTML = t + '号学院平均'

        var idHead = document.getElementById('idHead')
        idHead.innerHTML = StudentId + '号学生数据'

        var personHead = document.getElementById('personHead')

        personHead.innerHTML = t + '号学院读书情况'
    })

