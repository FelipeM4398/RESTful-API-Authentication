import app from './app';

/**
 * Inicia el servidor
 */
app.listen(app.get('port'));
console.log(`Server running on port ${app.get('port')}`);
