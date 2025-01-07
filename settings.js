import dotenv from 'dotenv';

dotenv.config();

const settings = {
    app:{
        name: 'Swaply',
        version: '1',
        port: process.env.PORT || 8000,
    },
    cors: {
        origin: true,
        methods: 'GET, POST',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: false,
    }
}

export default settings;