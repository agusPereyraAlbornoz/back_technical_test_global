import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import requestLogger from './middlewares/requestLogger';
import routes from './routes/dataRoutes';
import swaggerUi from 'swagger-ui-express';
import specs from '../swaggerConfig';

const app = express();
const port = 3001;

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:8001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Middleware para analizar el cuerpo JSON de las solicitudes POST
app.use(bodyParser.json());

// Middleware para todas loggear solicitudes
app.use(requestLogger);

// Documentacion Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Montar las rutas
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

export default app
