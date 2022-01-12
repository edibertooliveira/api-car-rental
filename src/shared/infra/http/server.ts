import 'dotenv/config';
import 'reflect-metadata';
import server from '../app';
import { logger } from '@config/loggerConfig';

const PORT = process.env.PORT || 3334;

server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
