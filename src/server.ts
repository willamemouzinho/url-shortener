import dns from 'node:dns/promises'
import bodyParser from 'body-parser'
import cors from 'cors'
import express, { type Request, type Response } from 'express'

import { createURLShortener } from './routes/create-urlshortener'
import { redirectToOriginalURL } from './routes/redirect-to-original-url'
const app = express()

// Basic Configuration
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', (req: Request, res: Response) => {
	res.sendFile(`${process.cwd()}/views/index.html`)
})

app.post('/api/shorturl', createURLShortener)
app.get('/api/shorturl/:id', redirectToOriginalURL)

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
