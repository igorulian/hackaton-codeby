import { Router } from 'express'
import { requestData } from './requests.js'

const routes = Router()

routes.post('/accessibility', async (req,res) => {
    try {
        let { site } = req.body
        
        if(!site)
        site = JSON.parse(site)
        
        console.log(site)
        const data = await requestData(site)

        if(!data)
            return res.status(400).send({ error: '[#1] Erro ao buscar parametros ' })

        return res.status(200).send(data)
    } catch {
        return res.status(400).send({ error: '[#2] Erro ao buscar parametros' })
    }
})

export default routes
