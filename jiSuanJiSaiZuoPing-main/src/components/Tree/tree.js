var TreeSvg = d3.select("#ScatterSvg"),
	TreeWidth = svg.attr("width"),
	TreeHeight = svg.attr("height");
Treeg = TreeSvg.append("g").attr("transform", "translate(60,30)");
TreeMarkText = ['挂科风险', '分数排名', '图书馆借阅次数', '消费水平', '去图书馆次数', '门禁次数', '助学金获得情况']
TreeColor = ['rgba(165,42,42,0.5)', 'rgba(255,0,0,0.5)', 'rgba(0,128,0,0.5)', 'rgba(255,255,0,0.5)', 'rgba(128,128,128,0.5)', 'rgba(255,192,203,0.5)', 'rgba(70,130,180,0.5)']
var tree = d3.tree()
	.size([600, 280]);

var stratify = d3.stratify()
// .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });
var TreeMarksCircle = TreeSvg.selectAll('.TreeMarkCircle')
	.data(TreeColor)
	.join('circle')
	.attr('class', 'TreeMarkCircle')
	.attr('r', 8)
	.attr('fill', function (d) { return d })
	.attr('cx', 8)
	.attr('cy', function (d, i) { return 8 + 16 * i })
var TreeMarksCircle = TreeSvg.selectAll('.TreeMarkText')
	.data(TreeMarkText)
	.join('text')
	.attr('class', 'TreeMarkText')
	// .attr('r',8)
	.text(function (d) { return d })
	.attr('x', 16)
	.attr('y', function (d, i) { return 13 + 16 * i })
	.attr('font-size', '12px')
fetch("./src/components/Tree/new_predict_tree_data.json").then(d => d.json())
	.then(d => {

		// console.log(d)

		var root = d3.hierarchy(d)
		//   .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });
		// console.log(root)
		var linkg = Treeg.selectAll('.linkg')
			.data(tree(root).links())
			.enter().append("g")
			.attr("class", "linkg")
		var link = linkg
			.append("path")
			.attr("class", "link")
			.attr("stroke", "#555")
			.attr("d", d3.linkHorizontal()
				.x(function (d) { return d.x; })
				.y(function (d) { return d.y; }));
		var linkText = linkg
			.append('text')
			.text(function (d) { return d.target.data.link })
			.attr("font-size", '10px')
			.attr("transform", function (d) {
				// console.log(d.source.y-d.target.y)
				// console.log(d.source.x-d.target.x)
				if (180 * Math.atan2(d.source.y - d.target.y, d.source.x - d.target.x) / Math.PI < -90) {
				// if(1){
					
					return "translate(" + (d.target.x +4 * (d.source.x - d.target.x) / 6) + "," + ( d.target.y +4 * (d.source.y - d.target.y) / 6 ) + ")" + 'rotate(' + (180 * Math.atan2(d.source.y - d.target.y, d.source.x - d.target.x) / Math.PI + 180)+')'
				}
				else {
					return "translate(" + (d.target.x + 1 * (d.source.x - d.target.x) / 6) + "," +( d.target.y +1 * (d.source.y - d.target.y) / 6 )+ ")" + 'rotate(' + 180 * Math.atan2(d.source.y - d.target.y, d.source.x - d.target.x) / Math.PI + ')'
				}
			})
		// console.log(link)
		var node = Treeg.selectAll(".node")
			.data(root.descendants())
			.enter().append("g")
			.attr("class", function (d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
			.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })

		node.append("circle")
			.attr('fill', function (d, i) {
				if (d.data.name == '偏高' || d.data.name == '低' || d.data.name == '偏低' || d.data.name == '高')
					return TreeColor[0]
				else if (d.data.name == 'score')
					return TreeColor[1]
				else if (d.data.name == 'booking')
					return TreeColor[2]
				else if (d.data.name == 'consume')
					return TreeColor[3]
				else if (d.data.name == 'dorm')
					return TreeColor[4]
				else if (d.data.name == 'library')
					return TreeColor[5]
				else if (d.data.name == 'subsidy')
					return TreeColor[6]
			})
			.attr("r", function (d) {
				if (d.data.name == 'score')
					return 10
				return 7
			});
		// console.log(node)
		node.append("text")
			.attr('class', function (d) {
				if (d.data.name == '偏高' || d.data.name == '低' || d.data.name == '偏低' || d.data.name == '高')
					return 'TreeResultData'
			})
			//   .attr("dy", 10)
			//   .attr("dx", -10)
			.text(function (d) {
				if (d.data.name == '偏高' || d.data.name == '低' || d.data.name == '偏低' || d.data.name == '高')
					return d.data.name
			})
		TreeText = d3.selectAll('.TreeResultData')
			.attr('dx', function (d, i) {
				// console.log(d)
				// console.log(this.innerHTML.length)
				return -5 * (this.innerHTML.length) - 1
			})
			.attr('dy', 14)

	})
function ChangeTree(id) {
	console.log(id)
	fetch('./src/components/Tree/trans_data.json').then(d => d.json())
		.then(d1 => {
			// console.log(d1[id])
			d3.select('.Scatter').selectAll('path')
				.attr('class', function (d, i) {
					// console.log(d)
					// console.log(i)
					// console.log(d.target.data)


					if (d.target.data.link == d1[id][d.source.data.name]) {
						// console.log(1)
						d4 = d.target; d2 = d.source;
						while (d2.parent) {
							if (d4.parent.data.link != d1[id][d2.parent.data.name])
								return 'link'
							d4 = d4.parent; d2 = d2.parent;
						}
						return 'choseLink'
					}
					return 'link'
				})
			// console.log(node)
		})
}
