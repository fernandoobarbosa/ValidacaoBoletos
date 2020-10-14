import app from './src/routes'

var port = process.env.PORT || 8080

app.listen(port,()=>{

     console.log(`Example app listening at ${port}`)
})
