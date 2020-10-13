import express from 'express'
import bodyParser from 'body-parser'
import {validaBoleto} from '../src/validaBoleto'



const app = express()
app.use(bodyParser.json())

app.get("/boleto/:codigo",verificarTextoNoParametro,verificarTamanho,(req,res)=>{
    
    var parametro = req.params.codigo

    try{const values = validaBoleto(parametro)
        res.status(200).send(values)
    }catch(error){
        res.status(400).send(error.message)
    }
    
})
    function verificarTextoNoParametro(req, res, next){
        //json com mensagem e status 400
        if (isNaN(req.params.codigo)) return res.status(400).send({mensagem:"São permitidos apenas números" });
        
        next();
    };
    
    function verificarTamanho(req,res,next){
        //json com mensagem e status 400
        if(req.params.codigo.length!==47){
            
            if(req.params.codigo.length===44){
                
            }
            else{
                return res.status(400).send({mensagem:"tamanho de boleto incorreto"})
            }
        } 
        
        next()
    }
    

export default app