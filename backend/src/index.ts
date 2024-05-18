import express, { Application } from 'express';
import cors from 'cors'
import apiRoutes from './v1/routes/index';
import swaggerDocs from './v1/swagger'

export const app: Application = express();
const port: number = parseInt(process.env.PORT ?? '3000', 10);

app.use(cors());
app.use(express.json());
app.use("/api/v1", apiRoutes);

swaggerDocs(app, port);

app.listen(port, (): void => {
  console.log(`🌐 Server successfully listening on port ${port}`);
  swaggerDocs(app, port);
});

