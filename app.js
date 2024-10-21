const express = require('express');
const bodyparser= require('body-parser');
const userRouter= require("./routes/userRouter");
const router = require("./routes/router");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req, res)=>{
    res.json({data:"home"});
});


app.use("/main/auth", userRouter);
app.use("/main/booking", router);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, ()=>{
    console.log(`server running on port ${3000}`);
})