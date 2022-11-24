const express = require("express"):

spatiRouter.route("/")
.get((req, res, next) => {
    //retrieve spätis 
    //ordered by distance?
})
.post(
    //verifyUser
    (req, res, next) => {
        //create späti
    }
)
.put(
    //not supported
)
.delete(
    //verifyUser

)

spatiRouter
 .route("/:spatiId")
 .get((req, res, next) => {
    //get spati + indications + tags
 })
 .post(
    //not supported
 )
 .put(
    //verify user matches author
 )
 .delete(
    //verify if user matches author 
 )


