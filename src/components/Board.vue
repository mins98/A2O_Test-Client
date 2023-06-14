<template>
    <div class="container text-center">
        <br>
        <button v-if="side>0" @click="show()" class="btn btn-success btn-sm">Show chessboard result</button>
        <table >
            <tbody>
                
                <tr v-for="(n,index) in side" :key="index">
                    <td :id="index2+','+index" v-for="(n,index2) in side" :key="index2" :style="[(index2+index) % 2 == 0 ? {background: b} : {background: w}]">
                        
                    </td>
                </tr>
            </tbody>

        </table>   
    </div>
</template>
  
  <script>
  export default {
    name: 'HelloWorld',
    data() {
        return {
            color:true,
            b:'#b17c54',
            w:'#eeddd2'
        }
    },
    props: {
      queen: [Array],
      obstacles: [Array],
      side:Number,
      limits: Object,
    }, methods: {
        show(){
            var atackCellValue= "<span class='color-green'><b>O</b></span>";
            var queenCellValue= "<span><b>Q</b></span>";
            var obstCellValue= "<span class='color-red'><b>X</b></span>";
            //AtackZones
            //top
            var topLimit=(this.limits["top"][1]); 
            for (let index = topLimit[1]; index < this.queen[1]; index++) {
                const cell = document.getElementById(topLimit[0]+","+index);
                cell.innerHTML = atackCellValue;   
            }
            //bottom
            var topLimit=(this.limits["bottom"][1]); 
            for (let index = this.queen[1]+1; index <= topLimit[1]; index++) {
                const cell = document.getElementById(topLimit[0]+","+index);
                cell.innerHTML = atackCellValue;   
            }
            //right
            var topLimit=(this.limits["right"][1]); 
            for (let index = this.queen[0]+1; index <= topLimit[0]; index++) {
                const cell = document.getElementById(index+","+topLimit[1]);
                cell.innerHTML = atackCellValue;   
            }
            //left
            var topLimit=(this.limits["left"][1]); 
            for (let index = topLimit[0]; index < this.queen[0]; index++) {
                const cell = document.getElementById(index+","+topLimit[1]);
                cell.innerHTML = atackCellValue;   
            }
            //bottomRight
            var topLimit=(this.limits["bottomRight"][1]); 
            var cellD=topLimit;;
            for (let index = topLimit[0]; index > this.queen[0]; index--) {
                const cell = document.getElementById(cellD[0]+","+cellD[1]);
                cell.innerHTML = atackCellValue;   
                cellD=[cellD[0]-1,cellD[1]-1]
            }
            //bottomLeft
            var topLimit=(this.limits["bottomLeft"][1]); 
            var cellD=topLimit;
            for (let index = topLimit[0]; index < this.queen[0]; index++) {
                const cell = document.getElementById(cellD[0]+","+cellD[1]);
                cell.innerHTML = atackCellValue;   
                cellD=[cellD[0]+1,cellD[1]-1]
            }
            //topRight
            var topLimit=(this.limits["topRight"][1]); 
            var cellD=topLimit;;
            for (let index = topLimit[0]; index > this.queen[0]; index--) {
                const cell = document.getElementById(cellD[0]+","+cellD[1]);
                cell.innerHTML = atackCellValue;   
                cellD=[cellD[0]-1,cellD[1]+1]
            }
            //topLeft
            var topLimit=(this.limits["topLeft"][1]); 
            var cellD=topLimit;
            for (let index = topLimit[0]; index < this.queen[0]; index++) {
                const cell = document.getElementById(cellD[0]+","+cellD[1]);
                cell.innerHTML = atackCellValue;   
                cellD=[cellD[0]+1,cellD[1]+1]
            }

            //Obstables
            this.obstacles.forEach(element => {
                const cell = document.getElementById(element[0]+","+element[1]);
                cell.innerHTML = obstCellValue;       
            });
            //Queen
            const celQueen=this.queen[0]+","+this.queen[1];
            
            const cell = document.getElementById(celQueen);
            cell.innerHTML =queenCellValue;
           
        }
    }
  }
  </script>
  

  <style >

td {
    height: 40px; /* already tried changing values */
    width: 40px; /* doesn't even get squared */
    /* shadow stuff here */
    border: black 2px solid;
}
table {
  
    width: auto;
}
.color-green{
    color: green;
}
.color-red{
    color: #F00;
}
  </style>
  