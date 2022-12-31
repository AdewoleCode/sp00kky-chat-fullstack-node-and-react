const express = require('express');
const app = express();
require('dotenv').config();

const userRouter = require('./routes/userRoutes')
const messageRouter = require('./routes/messageRoute')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const connectDB = require('./DB/connect');

const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())





//routes
app.use('/api/auth', userRouter)
app.use('/api/messages', messageRouter )


app.get('/', (req, res) => {
    res.send('homepage')
    console.log("hello");
})


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);





const port = process.env.PORT || 3030;


//conect to mongodb and start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('connected');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};



start();
