import express, {Express, Request, Response} from 'express';

const port: number | string = process.env.PORT || 8081;
const app: Express = express();

app.use(express.static(__dirname + '/dist/'));
app.get(/.*/, (req: Request, res: Response) => {
  res.sendFile(__dirname + '/dist/index.html')
});
app.listen(port);

console.log('Server started...')
