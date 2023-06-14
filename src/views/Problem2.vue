<template >
    <div class="container py-2">
        <h2>Problem 2</h2>  
        <div class="row border py-4">
            
            <form class="mt-3" action="" @submit.prevent="send()">
                <h5>Text to analyze</h5>
                <textarea v-model="text" name="input-2" id="input-2" cols="30" rows="2"></textarea>
                <div >
                    <p ><b>Note:</b> All uppercase character will be converted to lowercase and all whitespace will be removed</p>
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
                <pre name="output-2" id="output-2">{{max}}</pre>
                <h5>Result explained</h5>
               
                    <li v-for="(value, index) in resultE">
                        f("{{index}}") = {{value}}
                    </li>
                  
            </div>
            
                    
        </div>
        
    </div>
</template>
<script>
import axios from "axios";
export default {
    
    data() {
        return {
            text:"",
            max:"",
            resultE:"",         
        }
    },

    methods: {
        async send(){
            try {
                this.text=this.text.toLowerCase();
                this.text = this.text.replace(/\s+/g, '')  
                const res=await axios.post(process.env.VUE_APP_API_URL+'stringValues', {
                    text: this.text,
                });
                let trad=res.data[0];
                console.log(trad);
                this.max=trad["max"];
                this.resultE=trad["allCharacters"];
                
            }
            catch (error) {
                console.log(error);
            }
            
        },

    }, 
    computed: {
    },
    components: {
    }
}
</script>
<style >
    textarea {
        resize: none;
    }

</style>