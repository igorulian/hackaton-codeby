import { Router } from 'express'
import { requestData } from './requests.js'

const routes = Router()

routes.get('/accessibility/:site', async (req,res) => {
    try {
        const { site } = req.params
        console.log(site)
    
        const data = await requestData(site)

        if(!data)
            return res.status(400).send({ error: 'Erro ao buscar parametros' })

        return res.status(200).send(data)
    } catch {
        return res.status(400).send({ error: 'Erro ao buscar parametros' })
    }
})

export default routes
