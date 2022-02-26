const express = require("express")
const app = express()
const port = 5000
const { calcDRMBPrice, calcDSGDPrice } = require("./priceRetrieval")
const { getBalance } = require("./getBalance")

app.get("/", (req, res) => { res.sendStatus(200) })

app.get("/retrievePrice/drmb", async (req, res) => {
    let DRMBPrice = await calcDRMBPrice()
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ drmbPrice: DRMBPrice }))
})

app.get("/retrievePrice/drmb", async (req, res) => {
    let DSGDPrice = await calcDSGDPrice()
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ dsgdPrice: DSGDPrice }))
})

app.get("/getBalance", async(req, res) => {
    let balance = await getBalance()
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ balance: balance }))
})

app.listen(port, () => {
    console.debug(`Express is running on port ${port}.`)
})
