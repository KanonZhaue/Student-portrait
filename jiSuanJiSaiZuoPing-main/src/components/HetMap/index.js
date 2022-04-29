var week_labels = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]
var id=1
var student_week
function getId_Het(){
    id = document.getElementById("id").value;
    if (id == "") {
        return 
    }


    d3.json("./src/data/u_college_id.json").then(d => {
        var all_student = d['data']
        if (all_student.hasOwnProperty(id))
            {
            var sum = 0;
            var count = 0;
                
            d3.json("./src/data/library_week.json").then(data => {
                student_week=data[id]
                    
                for(let item of week_labels){
                        count += student_week[item] ;
                        sum += 1.2**(student_week[item]/1.5);
                    }
                if (count>=50){
                        sum = 0;
                    for(let item of week_labels){
                        sum += 1.05**(student_week[item]/1.2);
                    }
                }
                // console.log(sum)
                // console.log(count)

                
                week_labels.map((data,i)=>{

                    var rect_fill = "rgb(188,202,177)"
                    if (count !==0){
                        var k = 1;
                        if(count >=50){
                            k =  1.05**(student_week[data]/1.2) / sum;
                        }else{
                            k = 1.2**(student_week[data]/1.5) / sum;
                        }
                        const r1  = 227 -  151 * k - student_week[data] /2;
                        const r2 = 241 - 85 * k - student_week[data]/2;
                        const r3 = 218 - 188 * k - student_week[data]/2;
                        rect_fill = `rgb(${r1},${r2},${r3})`;
                        // console.log(rect_fill)
                        
                        
                    }
                   d3.select(`#${data}`).attr('fill',rect_fill)
                })
                })
                
                
            
                

            }
        else { 
            return;
            }
        })
    }

    