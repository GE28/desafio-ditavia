import * as dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(import.meta.url);

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });