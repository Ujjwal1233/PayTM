const mongoose=require('mongoose');

//const uri = "mongodb://127.0.0.1:27017/Paytm,mongodb://a-PC:27017,a-PC:27018,a-PC:27019/Paytm?"+"replicaSet=rs";

//mongoose.connect("mongodb://127.0.0.1:27017/Paytm");
//mongoose.connect("mongodb://localhost:27017,localhost:27018,localhost:27019/Paytm1?replicaSet=rs");
//mongodb+srv://<username>:<password>@cluster0.mtaa3ai.mongodb.net/?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://pranav:147plmokn@cluster0.mtaa3ai.mongodb.net/?retryWrites=true&w=majority");

//mongoose.connect(uri);

const userSchema = mongoose.Schema({
    // firstName: String,
    // lastNmae: String,
    // username: String,
    // password: String

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password : {
        type: String,
        required: true,
        minLength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const User = mongoose.model('User',userSchema);

const accountsSchema = mongoose.Schema({
    // userId:mongoose.Schema.Types.ObjectId,
    // balance:number
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account',accountsSchema);

module.exports={
    User,
    Account
}