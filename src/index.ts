import app from './app';

/**
 * Inicia el servidor
 */
function main() {
  app.listen(app.get('port'));
  console.log(`Server running on port ${app.get('port')}`);
}

main();
