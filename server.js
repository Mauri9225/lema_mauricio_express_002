const express = require('express');
const app = express();
const port = 4000;
const productRoutes = require("./routes/productRoutes")

app.use(express.json());

app.get('/', (req, res) => {
    res.send('test')
})

app.use("/api/products", productRoutes)

app.listen(port, () => {
    console.log(`StaRTED SERVER IN PORT ${port}`)

})