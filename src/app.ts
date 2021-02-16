import express from 'express'
import path from 'path'
import { Producto } from './producto'
import {CommonRoutesConfig} from './rutas/common.route.config'
import {UsersRoutes} from './rutas/users.route.config'
import handlebars from 'express-handlebars'

const PORT = 8080
const routes: Array<CommonRoutesConfig> = []
const app = express()

let productos: Producto [] = []
routes.push(new UsersRoutes(app, productos))

app.use(express.static('public'))

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "visualizar.hbs",
        layoutsDir: path.join(__dirname, '..', 'views', 'layouts'),
        partialsDir: path.join(__dirname, '..', 'views', 'partials')
    })
)

app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'hbs')

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
}).on('error', console.log);