var SelectLine = 1;
function getId_line() {
    StudentId = document.getElementById("id").value;
    if (StudentId == "") {
        return;
    }
    d3.json("./src/data/u_college_id.json").then(d => {
        var all_student = d['data']
        if (all_student.hasOwnProperty(StudentId))
            ChangeCollegeLines(StudentId)

    })
}

function collegenal() {
    SelectLine = 1;
    d3.selectAll('.StudentBorrowLines').remove()
    d3.selectAll('.StudentLibraryLines').remove()
    d3.selectAll('.TimeAxis').remove()
    d3.selectAll(".line_labels").remove()
    d3.selectAll(".lineTitleText").remove()
    d3.selectAll(".lineTitle").remove()
    d3.selectAll(".line_labels_text").remove()

    ChangeCollegeLines(CollegeId)
    BTN1 = document.getElementById('BTN1')
    BTN1.style.background = 'none';

    BTN2 = document.getElementById('BTN2')
    BTN2.style.background = 'rgb(216, 216, 216)'

}

function personal() {
    d3.selectAll('.StudentBorrowLines').remove()
    d3.selectAll('.StudentLibraryLines').remove()
    d3.selectAll('.TimeAxis').remove()
    d3.selectAll(".lineColorBar").remove()
    d3.selectAll(".axis").remove()
    d3.selectAll(".lineScaleText").remove()
    SelectLine = 0;
    ChangeStudentLines(StudentId)
    
    BTN1 = document.getElementById('BTN1')
    BTN1.style.background = 'rgb(216, 216, 216)'

    BTN2 = document.getElementById('BTN2')
    BTN2.style.background = 'none';


}

var BookRectY1, BookRectY2, ConsumeRectY1, ConsumeRectY2, DormRectY1, DormRectY2, LibraryRectY1, LibraryRectY2, RankRectY1, RankRectY2, SubsidyRectY1, SubsidyRectY2;
var scaleLength = 250
var scaleSpace = 120
var scaleTop = 60
var colorBarWidth = 40;
var LineSvg = d3.select('#ChangeSvg')
    .attr('width', 600)
    .attr('height', 300)
    .on('mousedown', (e) => {
        if (e.offsetX > colorBarWidth + scaleSpace * 0 && e.offsetX < colorBarWidth + scaleSpace * 1) {
            BookRectY1 = e.offsetY;
        }
        else if (e.offsetX > colorBarWidth + scaleSpace * 1 && e.offsetX < colorBarWidth + scaleSpace * 2) {
            ConsumeRectY1 = e.offsetY;
        }
        else if (e.offsetX > colorBarWidth + scaleSpace * 2 && e.offsetX < colorBarWidth + scaleSpace * 3) {
            DormRectY1 = e.offsetY;
        }
        else if (e.offsetX > colorBarWidth + scaleSpace * 3 && e.offsetX < colorBarWidth + scaleSpace * 4) {
            LibraryRectY1 = e.offsetY;
        }
        else if (e.offsetX > colorBarWidth + scaleSpace * 4 && e.offsetX < colorBarWidth + scaleSpace * 5) {
            RankRectY1 = e.offsetY;
        }
        else if (e.offsetX > colorBarWidth + scaleSpace * 5 && e.offsetX < colorBarWidth + scaleSpace * 6) {
            SubsidyRectY1 = e.offsetY;
        }

    })
    .on('mouseup', (e) => {
        // console.log(e.offsetX)
        if (e.offsetX > colorBarWidth + scaleSpace * 0 && e.offsetX < colorBarWidth + scaleSpace * 1) {
            BookRectY2 = e.offsetY;
        }
        else if (e.offsetX > colorBarWidth + scaleSpace * 1 && e.offsetX < colorBarWidth + scaleSpace * 2) {
            ConsumeRectY2 = e.offsetY;
        }
        else if (e.offsetX > colorBarWidth + scaleSpace * 2 && e.offsetX < colorBarWidth + scaleSpace * 3) {
            DormRectY2 = e.offsetY;
        }
        else if (e.offsetX > colorBarWidth + scaleSpace * 3 && e.offsetX < colorBarWidth + scaleSpace * 4) {
            LibraryRectY2 = e.offsetY;
        }
        else if (e.offsetX > colorBarWidth + scaleSpace * 4 && e.offsetX < colorBarWidth + scaleSpace * 5) {
            RankRectY2 = e.offsetY;
        }
        else if (e.offsetX > colorBarWidth + scaleSpace * 5 && e.offsetX < colorBarWidth + scaleSpace * 6) {
            SubsidyRectY2 = e.offsetY;
        }
        console.log(SubsidyRectY2)
    })

var LineScaleText = ['借书本', '卡消费', '晚归次数', '进出图书馆次数', '分数排名', '奖学金']

function ChangeCollegeLines(id) {


    if (!SelectLine)
        return;

    fetch('./src/components/Line/data/college_date.json').then(d => d.json())
        .then(Lined => {

            LineSvg.selectAll('.axis').remove()
            LineSvg.selectAll('.LineSvgRect').remove()
            LineSvg.selectAll('.LineScaleText').remove()
            BookRectY1 = BookRectY2 = ConsumeRectY1 = ConsumeRectY2 = DormRectY1 = DormRectY2 = LibraryRectY1 = LibraryRectY2 = RankRectY1 = RankRectY2 = SubsidyRectY1 = SubsidyRectY2 = null;
            LineSvg.on('mousedown', (e) => {

                if (!SelectLine)
                    return;
                if (e.offsetX > colorBarWidth + scaleSpace * 0 && e.offsetX < colorBarWidth + scaleSpace * 1) {
                    BookRectY1 = e.offsetY;
                }
                else if (e.offsetX > colorBarWidth + scaleSpace * 1 && e.offsetX < colorBarWidth + scaleSpace * 2) {
                    ConsumeRectY1 = e.offsetY;
                }
                else if (e.offsetX > colorBarWidth + scaleSpace * 2 && e.offsetX < colorBarWidth + scaleSpace * 3) {
                    DormRectY1 = e.offsetY;
                }
                else if (e.offsetX > colorBarWidth + scaleSpace * 3 && e.offsetX < colorBarWidth + scaleSpace * 4) {
                    LibraryRectY1 = e.offsetY;
                }
                else if (e.offsetX > colorBarWidth + scaleSpace * 4 && e.offsetX < colorBarWidth + scaleSpace * 5) {
                    RankRectY1 = e.offsetY;
                }
                else if (e.offsetX > colorBarWidth + scaleSpace * 5 && e.offsetX < colorBarWidth + scaleSpace * 6) {
                    SubsidyRectY1 = e.offsetY;
                }

            })

                .on('mouseup', (e) => {
                    if (!SelectLine)
                        return;

                    if (e.offsetX > colorBarWidth + scaleSpace * 0 && e.offsetX < colorBarWidth + scaleSpace * 1) {
                        BookRectY2 = e.offsetY;
                        if (BookRectY1 > BookRectY2) { BookRectY1 = BookRectY1 + BookRectY2; BookRectY2 = BookRectY1 - BookRectY2; BookRectY1 = BookRectY1 - BookRectY2 }
                    }
                    else if (e.offsetX > colorBarWidth + scaleSpace * 1 && e.offsetX < colorBarWidth + scaleSpace * 2) {
                        ConsumeRectY2 = e.offsetY;
                        if (ConsumeRectY1 > ConsumeRectY2) { ConsumeRectY1 = ConsumeRectY1 + ConsumeRectY2; ConsumeRectY2 = ConsumeRectY1 - ConsumeRectY2; ConsumeRectY1 = ConsumeRectY1 - ConsumeRectY2 }
                    }
                    else if (e.offsetX > colorBarWidth + scaleSpace * 2 && e.offsetX < colorBarWidth + scaleSpace * 3) {
                        DormRectY2 = e.offsetY;
                        if (DormRectY1 > DormRectY2) { DormRectY1 = DormRectY1 + DormRectY2; DormRectY2 = DormRectY1 - DormRectY2; DormRectY1 = DormRectY1 - DormRectY2 }
                    }
                    else if (e.offsetX > colorBarWidth + scaleSpace * 3 && e.offsetX < colorBarWidth + scaleSpace * 4) {
                        LibraryRectY2 = e.offsetY;
                        if (LibraryRectY1 > LibraryRectY2) { LibraryRectY1 = LibraryRectY1 + LibraryRectY2; LibraryRectY2 = LibraryRectY1 - LibraryRectY2; LibraryRectY1 = LibraryRectY1 - LibraryRectY2 }
                    }
                    else if (e.offsetX > colorBarWidth + scaleSpace * 4 && e.offsetX < colorBarWidth + scaleSpace * 5) {
                        RankRectY2 = e.offsetY;
                        if (RankRectY1 > RankRectY2) { RankRectY1 = RankRectY1 + RankRectY2; RankRectY2 = RankRectY1 - RankRectY2; RankRectY1 = RankRectY1 - RankRectY2 }
                    }
                    else if (e.offsetX > colorBarWidth + scaleSpace * 5 && e.offsetX < colorBarWidth + scaleSpace * 6) {
                        SubsidyRectY2 = e.offsetY;
                        if (SubsidyRectY1 > SubsidyRectY2) { SubsidyRectY1 = SubsidyRectY1 + SubsidyRectY2; SubsidyRectY2 = SubsidyRectY1 - SubsidyRectY2; SubsidyRectY1 = SubsidyRectY1 - SubsidyRectY2 }

                    }
                    CreateLines()
                    CreateRectSelection()
                })

            var maxList = [0, 0, 0, 0, 0, 0]

            for (i = 0; i < Lined[CollegeId].length; i++) {
                for (j = 0; j < 6; j++) {

                    if (Lined[CollegeId][i][j] > maxList[j]) {
                        maxList[j] = Lined[CollegeId][i][j]
                    }
                }
            }

            var LineBookScale = d3.scaleLinear()
                .domain([0, Math.ceil(maxList[0] / 100) * 100])
                .range([scaleLength, 0])

            var LineConsumeScale = d3.scaleLinear()
                .domain([0, Math.ceil(maxList[1] / 5000) * 5000])
                .range([scaleLength, 0])


            var LineDormScale = d3.scaleLinear()
                .domain([0, Math.ceil(maxList[2] / 200) * 200])
                .range([scaleLength, 0])


            var LineLibraryScale = d3.scaleLinear()
                .domain([0, Math.ceil(maxList[3] / 200) * 200])
                .range([scaleLength, 0])


            var LineScoreScale = d3.scaleLinear()
                .domain([0, Math.ceil(maxList[4] / 100) * 100])
                .range([scaleLength, 0])


            var LineSubsidyScale = d3.scaleLinear()
                .domain([0, 2000])
                .range([scaleLength, 0])

            var LineColorScaleAlpha = d3.scaleLinear()
                .domain([0, Math.ceil(maxList[0] / 100) * 50, Math.ceil(maxList[0] / 100) * 100])
                .range(['rgba(0,255,0,0.1)', 'rgba(255,140,0,0.1)', 'rgba(255,215,0,0.1)'])
            var LineColorScale = d3.scaleLinear()
                .domain([0, Math.ceil(maxList[0] / 100) * 50, Math.ceil(maxList[0] / 100) * 100])
                .range(['rgba(0,255,0,1)', 'rgba(255,140,0,1)', 'rgba(255,215,0,1)'])
            var LineBookAxis = d3.axisRight(LineBookScale);
            var LineConsumeAxis = d3.axisRight(LineConsumeScale);
            var LineDormAxis = d3.axisRight(LineDormScale);
            var LineLibraryAxis = d3.axisRight(LineLibraryScale);
            var LineScoreAxis = d3.axisRight(LineScoreScale);
            var LineSubsidyAxis = d3.axisRight(LineSubsidyScale);


            d3.selectAll('.LinePath').remove()

            var gLineBookAxis = LineSvg.append('g')
                .attr('class', 'axis')
                .attr('transform', `translate(${colorBarWidth + scaleSpace * 0},${scaleTop})`)
                .call(LineBookAxis)
            var gLineConsumeAxis = LineSvg.append('g')
                .attr('class', 'axis')
                .attr('transform', `translate(${colorBarWidth + scaleSpace * 1},${scaleTop})`)
                .call(LineConsumeAxis)
            var gLineDormAxis = LineSvg.append('g')
                .attr('class', 'axis')
                .attr('transform', `translate(${colorBarWidth + scaleSpace * 2},${scaleTop})`)
                .call(LineDormAxis)
            var gLineLibraryAxis = LineSvg.append('g')
                .attr('class', 'axis')
                .attr('transform', `translate(${colorBarWidth + scaleSpace * 3},${scaleTop})`)
                .call(LineLibraryAxis)
            var gLineScoreAxis = LineSvg.append('g')
                .attr('class', 'axis')
                .attr('transform', `translate(${colorBarWidth + scaleSpace * 4},${scaleTop})`)
                .call(LineScoreAxis)
            var gLineSubsidyAxis = LineSvg.append('g')
                .attr('class', 'axis')
                .attr('transform', `translate(${colorBarWidth + scaleSpace * 5},${scaleTop})`)
                .call(LineSubsidyAxis)
            CreateLines();


            var LineScaleTexts = LineSvg.selectAll('.LineScaleText')
                .data(LineScaleText)
                .join('text')
                .attr('class', 'LineScaleText')

                .text(function (d) { return d })
                .attr('transform', function (d, i) {
                    return `translate(${colorBarWidth + scaleSpace * i},20)`
                })

            var LineBarWidth = scaleLength / (Math.ceil(maxList[0] / 100) * 100)

            //颜色条的呈现
            var LineColorBar = LineSvg.selectAll('.LineColorBar')
                .data(new Array(Math.ceil(maxList[0] / 100) * 100))
                .join('line')
                .attr('class', 'LineColorBar')
                .attr('x1', 5)
                .attr('x2', 35)
                .attr('y1', function (d, i) {
                    return i * LineBarWidth + scaleTop
                })
                .attr('y2', function (d, i) {
                    return i * LineBarWidth + scaleTop
                })
                // .attr('')
                .attr('stroke', function (d, i) {
                    return LineColorScale(i)
                })
            function CreateLines() {
                if (!SelectLine)
                    return;
                var LinePath = LineSvg.selectAll('.LinePath')
                    .data(Lined[CollegeId])
                    .join('path')
                    .attr('class', 'LinePath')
                    .attr('d', function (d, i) {
                        return `M${colorBarWidth + scaleSpace * 0} ${LineBookScale(d[0]) + scaleTop} L${colorBarWidth + scaleSpace * 1} ${LineConsumeScale(d[1]) + scaleTop} L${colorBarWidth + scaleSpace * 2} ${LineDormScale(d[2]) + scaleTop} L${colorBarWidth + scaleSpace * 3} ${LineLibraryScale(d[3]) + scaleTop} L${colorBarWidth + scaleSpace * 4} ${LineScoreScale(d[4]) + scaleTop} L${colorBarWidth + scaleSpace * 5} ${LineSubsidyScale(d[5]) + scaleTop}`
                    })
                    .attr('stroke-width', 1)
                    .attr('fill', 'none')
                    .attr('stroke', function (d, i) {
                        if (BookRectY1 && BookRectY2 && (LineBookScale(d[0]) + scaleTop < BookRectY1 || LineBookScale(d[0]) + scaleTop > BookRectY2)) {
                            return LineColorScaleAlpha(d[0])
                        }
                        if (ConsumeRectY1 && ConsumeRectY2 && (LineConsumeScale(d[1]) + scaleTop < ConsumeRectY1 || LineConsumeScale(d[1]) + scaleTop > ConsumeRectY2)) {
                            return LineColorScaleAlpha(d[0])
                        }
                        if (DormRectY1 && DormRectY2 && (LineDormScale(d[2]) + scaleTop < DormRectY1 || LineDormScale(d[2]) + scaleTop > DormRectY2)) {
                            return LineColorScaleAlpha(d[0])
                        }
                        if (LibraryRectY1 && LibraryRectY2 && (LineLibraryScale(d[3]) + scaleTop < LibraryRectY1 || LineLibraryScale(d[3]) + scaleTop > LibraryRectY2)) {
                            return LineColorScaleAlpha(d[0])
                        }
                        if (RankRectY1 && RankRectY2 && (LineScoreScale(d[4]) + scaleTop < RankRectY1 || LineScoreScale(d[4]) + scaleTop > RankRectY2)) {
                            return LineColorScaleAlpha(d[0])
                        }
                        if (SubsidyRectY1 && SubsidyRectY2 && (LineSubsidyScale(d[5]) + scaleTop < SubsidyRectY1 || LineSubsidyScale(d[5]) + scaleTop > SubsidyRectY2)) {
                            return LineColorScaleAlpha(d[0])
                        }
                        if (BookRectY1 || BookRectY2 || ConsumeRectY1 || ConsumeRectY2 || DormRectY1 || DormRectY2 || LibraryRectY1 || LibraryRectY2 || RankRectY1 || RankRectY2 || SubsidyRectY1 || SubsidyRectY2) {
                            return LineColorScale(d[0])

                        }
                        else {
                            return LineColorScaleAlpha(d[0])
                        }
                    })
                    .on('mouseover', (e, i) => {
                        LineSvg.append('circle')
                            .attr("cx", 20)
                            .attr("cy", LineBookScale(e.srcElement.__data__[0]) + scaleTop)
                            .attr('r', 5)
                            .attr('fill', 'none')
                            .attr('stroke', 'black')
                            .attr('class', 'LineTooltipCircle')


                        LineSvg.append('text')
                            .attr('x', 7.5)
                            .attr('y', scaleTop - 5)
                            .attr('class', 'LineTooltipText')
                            .text(function () {
                                return e.srcElement.__data__[0]
                            })

                    })
                    .on('mouseout', (e, i) => {
                        d3.selectAll('.LineTooltipCircle').remove()
                        d3.selectAll('.LineTooltipText').remove()
                    })
            }
            function CreateRectSelection() {
                if (!SelectLine)
                    return;
                var LineSvgRect = LineSvg.selectAll('.LineSvgRect')
                    .data(new Array(6))
                    .join('rect')
                    .attr('class', 'LineSvgRect')
                    .attr('x', function (d, i) {
                        // console.log(LineBarWidth)
                        return (scaleSpace * i + colorBarWidth)
                    })
                    .attr('y', function (d, i) {
                        if (i == 0)
                            return (BookRectY1 < BookRectY2 ? BookRectY1 : BookRectY2)
                        if (i == 1)
                            return (ConsumeRectY1 < ConsumeRectY2 ? ConsumeRectY1 : ConsumeRectY2)
                        if (i == 2)
                            return (DormRectY1 < DormRectY2 ? DormRectY1 : DormRectY2)
                        if (i == 3)
                            return (LibraryRectY1 < LibraryRectY2 ? LibraryRectY1 : LibraryRectY2)
                        if (i == 4)
                            return (RankRectY1 < RankRectY2 ? RankRectY1 : RankRectY2)
                        if (i == 5)
                            return (SubsidyRectY1 < SubsidyRectY2 ? SubsidyRectY1 : SubsidyRectY2)
                        return 0
                    })
                    .attr('width', 10)
                    .attr('height', function (d, i) {
                        if (i == 0 && BookRectY1 && BookRectY2)
                            return Math.abs(BookRectY1 - BookRectY2)
                        if (i == 1 && ConsumeRectY1 && ConsumeRectY2)
                            return Math.abs(ConsumeRectY1 - ConsumeRectY2)
                        if (i == 2 && DormRectY1 && DormRectY2)
                            return Math.abs(DormRectY1 - DormRectY2)
                        if (i == 3 && LibraryRectY1 && LibraryRectY2)
                            return Math.abs(LibraryRectY1 - LibraryRectY2)
                        if (i == 4 && RankRectY1 && RankRectY2)
                            return Math.abs(RankRectY1 - RankRectY2)
                        if (i == 5 && SubsidyRectY1 && SubsidyRectY2)
                            return Math.abs(SubsidyRectY1 - SubsidyRectY2)

                    })
                    .attr('fill', 'rgba(70,130,180,0.3)')

            }
        })
}
ChangeCollegeLines(CollegeId)

function ChangeStudentLines(id) {
    d3.selectAll('.StudentBorrowLines').remove()
    d3.selectAll('.StudentLibraryLines').remove()
    d3.selectAll('.LineTitleText').remove()
    if (SelectLine) {
        return;
    }
    d3.selectAll('.LinePath').remove()
    d3.selectAll('.LineColorBar').remove()
    LineSvg.selectAll('.axis').remove()
    LineSvg.selectAll('.LineScaleText').remove()
    d3.selectAll(".lineTitle").remove()
    d3.selectAll(".line_labels_text").remove()
    d3.selectAll(".line_labels").remove()
    d3.selectAll(".LineSvgRect").remove()
    d3.selectAll(".TimeAxis").remove()
    const innerWidth1 = document.getElementById("ChangeSvg").clientWidth;
    const innerHeight1 = document.getElementById("ChangeSvg").clientHeight;
    d3.json("./src/components/Line/data/borrow.json").then(da => {
        let i = 0;
        data = da[`${id}`]

        if (!data) {

            var NoDataText = LineSvg.append('text')
                .attr('class', 'lineTitle')
                .text('借阅和去图书馆次数过少')
                .attr('font-size', '40px')
                .attr('dx', innerWidth1 / 6)
                .attr('dy', innerHeight1 / 2)
                .attr('fill', 'red')
        }
        else {
            const svg_line = d3.select("#ChangeSvg");
            const labelColors = ["#e0861a", "#9b95c9"]
            const labelText = ["借书", "图书馆"]
            // 绘制折线图的标题
            svg_line.append("g").attr("transform", `translate(${innerWidth1 * 12 / 13},${innerHeight1 * 7 / 20 - 5})`)
                .append("rect")
                .attr("class", "lineTitle")
                .attr("fill", "#e5e7e5")
                .attr("height", "165px")
                .attr("width", "35px")
            // 绘制折线图的标题的文字
            svg_line.append("g").attr("transform", `translate(${innerWidth1 * 12 / 13 + 18},${innerHeight1 * 7 / 20})`)
                .append("text")
                .attr("class", "lineTitleText")
                .attr("fill", "#77787b")
                .text("图书借阅变化趋势")
                .attr("font-size", "15px")
            //绘制图例图形
            svg_line.append("g")
                .attr("transform", `translate(${innerWidth1 * 12 / 13},${innerHeight1 / 20})`)
                .selectAll(".line_labels")
                .data(labelColors)
                .enter().append("rect")
                .attr("class", "line_labels")
                .attr("fill", (d) => {
                    return d;
                })
                .attr("x", (d, i) => {
                    return 20 * i + "px"
                })
                .attr("width", "10px")
                .attr("height", "35px")
            // 绘制图例的文字
            svg_line.append("g")
                .attr("transform", `translate(${innerWidth1 * 12 / 13},${innerHeight1 / 20 + 45})`)
                .selectAll(".line_labels_text")
                .data(labelText)
                .enter().append("text")
                .attr("class", "line_labels_text")
                .text((d) => { return d })
                .attr("font-size", "10px")
                .attr("x", (d, i) => { return 5 + 20 * i + "px" })
            d3.selectAll(".lineErrorText").remove();
            d3.selectAll('#svgline #Line #path_borrow').remove()
            d3.selectAll('#svgline #Line .scale').remove()
            // window.innerWidth: 当前整个窗口的宽度
            // const innerWidth1 = 0.69 * window.innerWidth;
            // const innerHeight1 = 0.33 * window.innerHeight;

            const innerWidth2 = document.getElementById("ChangeSvg").clientWidth;
            const innerHeight2 = document.getElementById("ChangeSvg").clientHeight;

            // const width = 0.9 * innerWidth2;
            // const height = 0.8 * innerHeight2;
            // const svg_line1 = d3.select('#svgline');
            var YLineHeight = 250;
            var XLineWidth = 600;
            var YLineTop = innerHeight2 * 0.9 - YLineHeight
            // const merge = {top:0.07 * innerHeight1, left:0.07 * innerWidth1, bottom:0.1 * innerHeight1, right:0.05 * innerWidth1};
            // 设置比例尺全局变量
            
            var Time = ["2013年第三季度", "2013年第四季度", "2014年第一季度", "2014年第二季度", "2014年第三季度", "2014年第四季度", "2015年第一季度", "2015年第二季度", "2015年第三季度"]
            var StudentTimeScale = d3.scaleBand()
                .domain(Time)
                .range([0, XLineWidth])

            var StudentTimeAxis = d3.axisBottom(StudentTimeScale);


            var gStudentTimeAxis = LineSvg.append('g')
                .attr('class', 'TimeAxis')
                .attr('transform', `translate(30,${innerHeight2 * 0.9})`)
                .call(StudentTimeAxis)

            d3.select('.TimeAxis').selectAll('text')
                .attr('font-size', '9px')

            fetch('./src/components/Line/data/library.json').then(d => d.json())
                .then(libData => {
                    studentLibData = libData[StudentId]
                    fetch('./src/components/Line/data/borrow.json').then(d => d.json())
                        .then(borrowData => {
                            studentBorrowData = borrowData[StudentId]
                            var bothMax = d3.max(studentLibData) > d3.max(studentBorrowData) ? d3.max(studentLibData) : d3.max(studentBorrowData)
                            var StudentYScale = d3.scaleLinear()
                                .domain([0, bothMax])
                                .range([YLineHeight, 0])

                            var StudentYAxis = d3.axisLeft(StudentYScale)
                            var gStudentYAxis = LineSvg.append('g')
                                .attr('class', 'TimeAxis')
                                .attr('transform', `translate(30,${YLineTop})`)
                                .call(StudentYAxis)


                            console.log((30 + StudentTimeScale(Time[1])))
                            console.log((YLineTop+StudentYScale(studentLibData[i+1])))
                            var StudentLibraryLines = LineSvg.selectAll('.StudentLibraryLines')
                                .data(new Array(8))
                                .join('line')
                                .attr('class', 'StudentLibraryLines')
                                .attr('x1',function(d,i){
                                    // console.log(30+StudentTimeScale(Time[i]))
                                    return (65+StudentTimeScale(Time[i]))
                                }).attr('x2',function(d,i){
                                    // console.log(30+StudentTimeScale(Time[i]))
                                    return (65+StudentTimeScale(Time[i+1]))
                                })
                                .attr('y1',function(d,i){
                                    return (YLineTop+StudentYScale(studentLibData[i]))
                                }).attr('y2',function(d,i){
                                    return (YLineTop+StudentYScale(studentLibData[i+1]))
                                })
                                .attr('stroke','#9b95c9')
                                .attr('stroke-width','4px')

                            console.log(studentLibData)
                            console.log(studentBorrowData)
                            var StudentLibraryLines = LineSvg.selectAll('.StudentBorrowLines')
                                .data(new Array(8))
                                .join('line')
                                .attr('class', 'StudentBorrowLines')
                                .attr('x1',function(d,i){
                                    // console.log(30+StudentTimeScale(Time[i]))
                                    return (65+StudentTimeScale(Time[i]))
                                }).attr('x2',function(d,i){
                                    // console.log(30+StudentTimeScale(Time[i]))
                                    return (65+StudentTimeScale(Time[i+1]))
                                })
                                .attr('y1',function(d,i){
                                    return (YLineTop+StudentYScale(studentBorrowData[i]))
                                }).attr('y2',function(d,i){
                                    return (YLineTop+StudentYScale(studentBorrowData[i+1]))
                                })
                                .attr('stroke','#e0861a')
                                .attr('stroke-width','4px')
                        })
                })
        }
    })
}