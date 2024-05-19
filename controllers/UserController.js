const DB = require('../models')
const bcrypt = require("bcrypt");


exports.userCreate = async function (req, res){
    const body = req.body
    
    try{
        console.log(body)
        const hashpassword = await bcrypt.hash(body.password, 10);
        const newUser = await DB.user({
            username: body.username,
            firstname: body.firstname, 
            email: body.email, 
            lastname: body.lastname, 
            password: hashpassword,
        })
        await newUser.save();

        return res.status(201).json({
            message: 'New user registered',
            record: newUser
        })
    
    } catch (error){
        console.log(error)
        return res.status(400).json({
            message: 'Error on registering.',
            error: error
        })
        
    }

}


// POST
exports.createActivity = async function (req, res){

    console.log('test');

    const data = req.body;
    const userProfile = req.user
    
    const userData = await DB.user.findOne({ _id: userProfile._id }).select('-password');    

    const activty = await DB.activity({
        username: userData._id,
        activity: data.newActivity
    })
    await activty.save();
    return res.status(201).json({
        message: `Activity Created!`,
        activty: activty.activity
    });
}

// GET user Activity Created
exports.getUserActivity = async function (req, res){
    const userProfile = req.user;
    
    const userData = await DB.user.findOne({ _id: userProfile._id }).select('-password');
    const userActivity = await DB.activity.find({username: userData._id}).populate({
        path: "username",
        model: DB.user,
        select: userOnly
    });
    
    // console.log(userData);
     return res.status(200).json({
        Activity: userActivity,
     });

}

// DELETE user Activity Created
exports.deleteUserActivity = async function (req, res){
    const userProfile = req.user;
    const body = {_id: req.params.id}
    const userActivity = await DB.activity.findOneAndDelete(body);
    console.log(body)
    // STATUS OKAY FOR DELETION
    return res.status(200).json({
    message: `Activty Deleted!`
    });

}
// UPDATE user Activity Created
exports.updateUserActivity = async function (req, res){
    const body = {_id: req.params.id}
    const data = {
        information: req.body.information,
        complete: req.body.complete
    }
    console.log(data)
    const userActivity = await DB.activity.findOneAndUpdate(body,data);

    // console.log(userActivity)
    // STATUS OKAY FOR UPDATE
    return res.status(200).json({
    message: `Activty Updated!`,
    update: userActivity

    });

}
const userOnly = "firstname lastname username";
// GET ALL ACTIVITY HERE
exports.getAllUserActivity = async function (req, res){

    try{
        const userActivity = await DB.activity.find()
        .populate({
            path: "username",
            model: DB.user,
            select: userOnly
        });
        
        return res.status(200).json({
            message: `All Activity`,
            Activities: userActivity
        })
    } catch (err){
        console.log(err)
        return
    }
}

// UPDATE CLICKS

exports.updateViewActivity = async function (req, res){
    const body = req.params
   
    try {

        const clickUpdate = await DB.activity.findOneAndUpdate(
            { _id: body.id }, { $inc: { view: 1 } },{ new: true }
        )


          console.log(clickUpdate)

          return res.status(200).json({
            message: `Updated Successfully`,
            Activies: clickUpdate,
          })
    } catch (err){
        return res.status(400).json({
            message: `Error Updating Successfully`,
        })
    }
}



// CRUDE COMMENT

exports.getComment = async function (req, res){
    
    const commentInfo = req.params
    const getComment = await DB.comment.find({activityId: commentInfo.id})
    .populate({
        path: "username",
        model: DB.user,
        select: userOnly
    });
    const commentCount = await DB.comment.countDocuments({activityId: commentInfo.id});
    
    return res.status(200).json({
        message: `List of Comments!`,
        comment: getComment,
        count: commentCount
    })
}
exports.createComment = async function (req, res){
    const userProfile = req.user;
    const body = req.body   

  
    const createComment = await DB.comment({
        username: userProfile._id,
        activityId: body.id,
        comment: body.comment,
    });
    createComment.save();

    return res.status(201).json({
        message: 'Comment Created Successfully.',
        comment: createComment
    })

}
exports.updateComment = async function (req, res){

    const activityId = {_id : req.params.id}
    const body = {
        comment: req.body.comment
    }

    const updateComment = await DB.comment.findOneAndUpdate(activityId, body);
    
    return res.status(200).json({
        message: `Updated Successfully`,
        comment: updateComment
    })  


}
exports.deleteComment = async function (req, res){
    
    const activityId = {_id : req.params.id}

    const updateComment = await DB.comment.findOneAndDelete(activityId);
    
    return res.status(200).json({
        message: `Delete Successfully`,
    })

}

// GET METHOD Progress Analytics

exports.progressAnalytics = async function (req, res){

    const userProfile = req.user;
    console.log(userProfile);
    
    const userProgressCount = await DB.activity.countDocuments({ username: userProfile._id, complete: true });
    const userTotalActivities = await DB.activity.countDocuments({ username: userProfile._id });

    const percentage = userTotalActivities > 0 ? (userProgressCount / userTotalActivities) * 100 : 0;

    return res.status(200).json({
        message: `User Activity.`,
        Analytics: percentage.toFixed()
    })
}

exports.getUserProfile = async function (req, res){
    const userId = {_id:req.user._id};
    // console.log(userId);

    const user = await DB.user.findOne(userId).select('-password');

    return res.status(200).json({
        message: `User Profile.`,
        user: user
    })

}

