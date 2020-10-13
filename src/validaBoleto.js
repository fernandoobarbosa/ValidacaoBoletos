export const validaBoleto =(parametro)=>{
    
    
    //divisão do parametro em blocos 
    const camposDoBoleto =  {
        bloco1 : parametro.slice(0,9),
        digitoVer1: parametro.slice(9,10),
        bloco2 : parametro.slice(10,20),
        digitoVer2: parametro.slice(20,21),
        bloco3 : parametro.slice(21,31),
        digitoVer3: parametro.slice(31,32),
        digitoBoleto: parametro.slice(32,33),
        bloco4: parametro.slice(33,47),
        fatorVencimento:parametro.slice(33,37),
        valorBoleto:parametro.slice(37,47),
        codigoBanco:parametro.slice(0,3),
        codigoMoeda:parametro.slice(3,4),
        
    }
    
    const camposConvenio = {
        idProduto: parametro.slice(0,1),
        idSegmento: parametro.slice(1,2),
        idValorReal:parametro.slice(2,3),
        digitoVerificadorConv:parametro.slice(3,4),
        digitosParaCalculo:parametro.slice(4,44),
        valorBoleto:parametro.slice(4,15),
        fatorVencimento:parametro.slice(19,29)
        
    }
    
    //cálculo do digito verificador
    
    var digitoVerificador1 =  calculoDigitoVerificador(camposDoBoleto.bloco1)
    
    var digitoVerificador2 = calculoDigitoVerificador2e3(camposDoBoleto.bloco2)
    
    var digitoVerificador3 = calculoDigitoVerificador2e3(camposDoBoleto.bloco3)    
    
    var linhaParaCalculoConvenio = camposConvenio.idProduto + camposConvenio.idSegmento +
    camposConvenio.idValorReal + camposConvenio.digitosParaCalculo
    
    var digitoVerificadorConvenio = calculoDigitoVerificadorConvenio(linhaParaCalculoConvenio)
    
    
    if(parametro.length === 47){
        //checagem dos digitos verificadores
        if(digitoVerificador1===parseInt(camposDoBoleto.digitoVer1)&&digitoVerificador2===parseInt(camposDoBoleto.digitoVer2)&&
            digitoVerificador3===parseInt(camposDoBoleto.digitoVer3)){
                
                //Json com os campos solicitados e status http 200
                var resposta = {
                    barCode:codigoDeBarras(camposDoBoleto),
                    amount:valorDoBoleto(camposDoBoleto),
                    expirationDate:dataVencimento(camposDoBoleto)
                }
                
                return resposta
            }
            
            else{
                //json com mensagem e status 400
                throw new Error ('Digito verificador incorreto')
                
            }
            
        }
        else{
            
            if(digitoVerificadorConvenio === parseInt(camposConvenio.digitoVerificadorConv)){
                
                var respostaConv = {
                    
                    amount:valorDoBoleto(camposConvenio),
                    barCode:parametro,
                }
                
                return respostaConv
            }
            else{
                
                throw new Error ('Digito verificador incorreto')
            }
            
        }}
        
        
        function calculoDigitoVerificador2e3(array){
            
            var somaTotal = 0
            for(var i=0;i<array.length;i++){
                
                if(i%2===0){
                    somaTotal = parseInt(somaTotal) + parseInt(array[i])
                    
                }
                
                else{
                    var mult = parseInt(array[i])*2
                    if(mult>9){
                        var digitos = (""+mult).split("");
                        somaTotal = parseInt(somaTotal) + parseInt(digitos[0])+ parseInt(digitos[1])}
                        
                        else{
                            somaTotal = parseInt(somaTotal) + mult
                        }     
                    }
                    
                }
                return 10 - somaTotal%10
            }
            
            function calculoDigitoVerificador(array){
                var somaTotal = 0;
                for (var i = 0; i < array.length; i++) {
                    
                    if(i%2===0){
                        var mult = parseInt(array[i])*2
                        if(mult>9){
                            var digitos = (""+mult).split("");
                            somaTotal = parseInt(somaTotal) + parseInt(digitos[0])+ parseInt(digitos[1])}
                            
                            else{
                                somaTotal = parseInt(somaTotal) + mult
                            }
                            
                        }
                        else{
                            somaTotal = parseInt(somaTotal) + parseInt(array[i])
                            
                        }
                    }
                    
                    return 10 - somaTotal%10
                    
                }
                
                function calculoDigitoVerificadorConvenio(array){
                    var somaTotal = 0;
                    for (var i = 0; i < array.length; i++) {
                        
                        if(i%2===0){
                            var mult = parseInt(array[i])*2
                            if(mult>9){
                                var digitos = (""+mult).split("");
                                somaTotal = parseInt(somaTotal) + parseInt(digitos[0])+ parseInt(digitos[1])}
                                
                                else{
                                    somaTotal = parseInt(somaTotal) + mult
                                }
                                
                            }
                            else{
                                somaTotal = parseInt(somaTotal) + parseInt(array[i])
                                
                            }
                        }
                        
                        if(somaTotal%10===0){
                            return 0
                        }else{
                            return 10 - somaTotal%10}
                            
                            
                        }
                        
                        function valorDoBoleto(camposDoBoleto) {
                            
                            var valorFormatado = camposDoBoleto.valorBoleto.slice(0,8) + '.' +camposDoBoleto.valorBoleto.slice(8,10)
                            var valorFormatadoFloat = parseFloat(valorFormatado)
                            var valorDecimal = valorFormatadoFloat.toFixed(2)  
                            
                            return valorDecimal
                        }
                        
                        function dataVencimento(camposDoBoleto){
                            var data = parseInt(camposDoBoleto.fatorVencimento) - 1000
                            var date = new Date('07/03/2000');
                            date.setDate(date.getDate()+data);
                            var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )) .toISOString() .split("T")[0];
                            
                            return dateString
                            
                        }
                        
                        function codigoDeBarras(camposDoBoleto){
                            
                            var code = camposDoBoleto.codigoBanco + camposDoBoleto.codigoMoeda +
                            camposDoBoleto.digitoBoleto + camposDoBoleto.fatorVencimento + camposDoBoleto.valorBoleto
                            +camposDoBoleto.bloco1.slice(4,9) + camposDoBoleto.bloco2 + camposDoBoleto.bloco3 
                            
                            return code 
                        }
                        
                        
                    