
import app from '@/app';

const PORT = process.env.PORT || 3000;

app.listen({ host: '0.0.0.0', port: Number(PORT) }, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on http://localhost:${PORT}`);
});
