const app=require('./app.js');

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
