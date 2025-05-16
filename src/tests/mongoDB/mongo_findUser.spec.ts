import { getUser, signUp } from "../../../helper/user";

const { MongoClient, Db } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('MongoDB connection', () => {
    let connection: typeof MongoClient;
    let db: typeof Db;
    beforeAll(async () => {
        try {
            connection = await MongoClient.connect(process.env.DATABASE_URL as string, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            db = await connection.db();
            console.error(process.env.DATABASE_URL, 'MongoDB connected');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
        })
        afterAll(async () => {
            await connection.close();
        })
        it('Connect to the collection and find user', async () => {
            const users = db.collection("users");
            console.log(users, "users");       
            //Retrive the document
            const user = await users.findOne({name:'Ethel Turner'})
            console.log(user);
  })
  it('Create new user with imported data', async() => {
    const userImport = getUser("admin");
    console.log(userImport, '-------userImport--------');
    try {
        const res = await signUp(userImport);
        expect(res.statusCode).toBe(201);
        console.log(res.body);
        const users = db.collection("users");
        const userData = await users.findOne({ email: userImport.name});
        console.log(userData, 'userData');
        if(!userData) {
            throw new Error("User not found in the database");
            
        }
        expect(userData.email).toEqual(userImport.email.toLowerCase());
        expect(userData.name).toEqual(userImport.name);
        expect(userData.role).toBe("admin");
        expect(userData._id).toEqual(res.body.data.user._id);
    } catch (error) {
        
    }
    
  });
})