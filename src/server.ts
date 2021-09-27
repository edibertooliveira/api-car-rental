import 'dotenv/config';
import 'reflect-metadata';
import server from './shared/app';

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => console.log(`running at ${PORT}`));
