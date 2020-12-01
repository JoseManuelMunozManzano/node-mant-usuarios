// Entorno
// En Heroku cogerá en NODE_ENV y en local el 'dev'
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let DB_URL;

// En mi caso no tengo local,
// Esto lo pongo para mostrar como sería.
if (process.env.NODE_ENV === 'dev') {
  DB_URL =
    'mongodb+srv://vant:passwordVant1@neimerccluster.7sldx.mongodb.net/cafe?retryWrites=true&w=majority';
} else {
  DB_URL =
    'mongodb+srv://vant:passwordVant1@neimerccluster.7sldx.mongodb.net/cafe?retryWrites=true&w=majority';
}

module.exports = {
  DB_URL,
};
