import express from 'express';
import { Server }  from 'socket.io';
import { createClient } from 'redis';
const app = express();
const pub = createClient({url: "redis://redisq:6379"});
const sub = pub.duplicate();
import { dirname } from 'path';
import { fileURLToPath } from 'url';
await Promise.all([
  pub.connect(),
  sub.connect()
]);
import { createAdapter } from "@socket.io/redis-adapter";
const server = app.listen(3000, () => {
  console.log('Socket server running on port 3000');
})
const io = new Server(server, { adapter: createAdapter(pub,sub) });
import cors from 'cors';
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
app.get('/',(req,res) => {
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('message', (msg) => {
    console.log("message sent");
    io.emit('message',msg);
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});



