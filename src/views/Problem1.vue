<template >
    <div class="container py-2">
        <h2>Problem 1</h2>  
        <div class="row border py-4">
            
            <form class="mt-3" action="" @submit.prevent="send()">
                <h5>Instructions</h5>
                <textarea v-model="text" name="input-1" id="input-1" cols="30" rows="10"></textarea>
                <div>
                    <p style="color:red;"><b>{{error}}</b></p>
                </div>
               
                <div >
                <button type="submit" class="btn btn-success btn-lg" >Send</button>
            </div>
            </form>
        </div>
        <br>
        <div class="row border py-4">
            <div class="col-sm-12">
                <h5>Result</h5>
                <pre name="output-1" id="output-1">{{mov}}</pre>
                <h5>Result explained</h5>
                <Board :side="side" :queen="queen" :obstacles="obstacles" :limits="limits"/>               
            </div> 
        </div>  
    </div>
</template>
<script>
import axios from "axios";

import Board from '@/components/Board.vue'
export default {
    
    data() {
        return {
            text:"",
            mov:"",
            error:"",
            resultE:"",

            queen:[0,0],
            obstacles:[],
            side:0,
            limits:[],
        }
    },

    methods: {
        transformTextArea(){
            this.text=this.clearBlank(this.text);
            var linesArray = this.text.split('\n');
            let arrayFinal={};
            for (let index = 0; index < linesArray.length; index++) {
                var element = linesArray[index];
                element= this.clearBlank(element);
                console.log(element);
                let newArray = element.split(' ');
                if(index==0){
                    arrayFinal["n"]=newArray[0];
                    arrayFinal["k"]=newArray[1];
                   }
                else if(index==1){
                    arrayFinal["rq"]=newArray[0];
                    arrayFinal["cq"]=newArray[1];
                   }
            }
            linesArray.splice(0, 2); 
            if(linesArray.length==arrayFinal["k"]){
                let obstables=[arrayFinal["k"]];
                for (let index = 0; index < linesArray.length; index++) {
                    var element = linesArray[index];
                    element= this.clearBlank(element);
                    let newArray = element.split(' ');
                    if(newArray[0]== arrayFinal["rq"]&& newArray[1]==arrayFinal["cq"]){
                        return [false,"There must not be an obstacle in the position of the queen"];
                    }
                    obstables[index]=[newArray[0],newArray[1]];
                }
                arrayFinal["obstacles"]=obstables;
            }
            else
                return [false,"The number of obstacles and the number of coordinates of obstacles do not match"];
            return [true,arrayFinal];
        },

        async send(){
            try {
                this.queen=[0,0];
                this.obstacles=[];
                this.side=0;
                this.limits=[];
                var coords=this.transformTextArea();
                var send=(coords[1]);
                if(coords[0]){
                    const res=await axios.post(process.env.VUE_APP_API_URL+'queensAttack', {
                        "n":send["n"], 
                        "k":send["k"], 
                        "rq":send["rq"], 
                        "cq":send["cq"], 
                        "obstacles":send["obstacles"]
                    });
                    let trad=res.data[0];
                    console.log(trad);
                    this.mov=trad["total"];
                    this.renderBoard(trad);
                    this.error="";
            
                }
                else{
                    this.error=coords[1];
                    this.mov="";
                }
            }
            catch (error) {
                console.log(error);
            }
            
        },
        renderBoard(trad){
            this.side=trad["side"]+1;
            this.queen=[trad["queenX"],trad["queenY"]]
            this.obstacles=trad["obstacles"];
            this.limits=trad["limits"];
            
        },
        clearBlank(noProccesText){
            var result= noProccesText.toString();
            result =result.split(/\r?\n/).filter(line => line.trim() !== "").join("\n");
            result = result.replace(/  +/g, ' ');
            result = result.trim();
            return result;
        }

    }, 
    computed: {
    },
    components: {
        Board
    }
}
</script>
<style >
     textarea {
        resize: none;
    }
</style>