import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import axios from "axios"
import { BASE_URL } from "./constants"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3003, () => {
    console.log("Rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/movie/popular", async (req: Request, res: Response) => {
    try {
        const page = req.query.page || 1

        const apiResponse = await axios.get(
            `${BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
        )

        res.status(200).send({ ...apiResponse.data })

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(400).send({ message: "Erro ao buscar filmes populares" })
        }
    }
})