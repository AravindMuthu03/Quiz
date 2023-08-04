const mysql = require("mysql2");
const express = require("express");
const bodyparser = require("body-parser");
const cors =require('cors');
// const encoder = bodyparser.urlencoded();
// const express = require('express');


const app = express();
app.use(cors());  
app.use(bodyparser.json());

//database connection
 const pool = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'root123',
     database: 'quiz1',
     port:'3306'
 });

//check the connection
pool.connect(function(err){
    if (err) {
        throw err;
    }
        console.log("Connected to database successfully!")
});

//get all data form database
app.get("/quiz", function(req,res){
    // console.log('get all users');
    let qrr=`SELECT * FROM quizes`;
    pool.query(qrr,(err,results)=>{
        if (err){
            console.log(err,'errs');
        }
        if(results.length>0){
            res.send({
                message:'all users data',
                data:results
            });
        };
    });
});


//get single data  by id
app.get('/quiz/:id', (req, res) => {
    // console.log(req.params.id);
    let qrId = req.params.id;
    let qr = `SELECT * FROM quizes where id = ${qrId} `;

    pool.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"get data by id",
                data:results
            })
        }else{
            res.send({
                message:"data not found"
            })
        }
    })
});

app.get('/updatedquiz/:id',(req,res)=>{
    
    let Id = req.params.id
    let qrr = `SELECT q.question,q.DIFFID,
    q.id,q.image,o.option,
    o.option_id,o.answer FROM quizes q 
    JOIN options o ON q.id = o.question_id where q.CID = ${Id}
    order by DIFFID desc`;
    pool.query(qrr,(err,results)=>{
        if(err){
            console.log(err,'error');
        }
        else{
                const questionData = [];
               
                let currentQuestion = null;
                let currentQues_id = null;
                let currentOptions = null;
                let Image = null;
                let DIFFID = null;
                for (const result of results) {
                    if (result.question !== currentQuestion) {
                        if (currentQuestion !== null) {
                            questionData.push({
                            ques: currentQuestion,
                            ques_id:currentQues_id,
                            options: currentOptions,
                            image : Image,
                            DIFFID:DIFFID
                            });
                        }
                        currentQuestion = result.question;
                        currentQues_id = result.id;
                        Image = result.image;
                        DIFFID=result.DIFFID;
                        currentOptions = [];
                    }
                    currentOptions.push({
                    option_id:result.option_id,
                    option: result.option,
                    answer: result.answer
                    })
                }
              
                questionData.push({
                    ques: currentQuestion,
                    ques_id:currentQues_id,
                    options: currentOptions,
                     image : Image,
                     DIFFID : DIFFID
                  })

                    res.send({
                        data:questionData
                })
        }
    })
})

app.get('/updatedquiz/:id/:did',(req,res)=>{
    // console.log('Get works')
    let Id = req.params.id
    let ids=req.params.did
    let qrr = `SELECT q.question,
    q.id,q.image,o.option,
    o.option_id,o.answer FROM quizes q 
    JOIN options o ON q.id = o.question_id where q.CID = ${Id} && q.DIFFID = ${ids}`;
    pool.query(qrr,(err,results)=>{
        if(err){
            console.log(err,'error');
        }
        else{
                const questionData = [];
                // Loop through the results and group the options by question
                let currentQuestion = null;
                let currentQues_id = null;
                let currentOptions = null;
                let Image = null;
                for (const result of results) {
                    if (result.question !== currentQuestion) {
                        if (currentQuestion !== null) {
                            questionData.push({
                            ques: currentQuestion,
                            ques_id:currentQues_id,
                        
                            options: currentOptions,
                            image : Image
                            });
                        }
                        currentQuestion = result.question;
                        currentQues_id = result.question_id;
                        Image = result.image
                        currentOptions = [];
                    }
                    currentOptions.push({
                    option_id:result.option_id,
                    option: result.option,
                    answer: result.answer
                    })
                }
                // Add the final question and options to the array
                questionData.push({
                    ques: currentQuestion,
                    ques_id:currentQues_id,
                    options: currentOptions,
                     image : Image
                  })
                    res.send({
                        data:questionData
                })
        }
    })
})


app.post('/createquiz',(req,res)=>{
    // console.log(req.body)
    let Question = req.body.question;
    let Images=req.body.image;
    let Cid=req.body.CID;
    let Diffid=req.body.DIFFID;

    let qrr = `insert into quizes(question,image,CID,DIFFID) values('${Question}','${Images}','${Cid}','${Diffid}')`;
    pool.query(qrr,(err,result)=>{
    if(err){
        console.log(err);
    }
    else{

        let question_id = result.insertId
        let Options = req.body.options
        let answer = req.body.ans

        for(let i of Options){
            if(i === answer){
                let Query1 = `insert into options (\`option\`,answer,question_id) values('${i}','1',${question_id})`
                pool.query(Query1,(err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    })
            }else{
                let Query2 = `insert into options (\`option\`,answer,question_id) values('${i}','0',${question_id})`
                pool.query(Query2,(err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    })
            }
            }
           res.send({
                        message:"Data created",
                        // data:result
                    })
        }
    })
})


app.put('/update/:id', (req, res) => {
    let uId = req.params.id;

    // let Opt=req.body.option;
    let Question=req.body.ques;
    let Image=req.body.image;
    // let Ans=req.body.answer;
    let CatId=req.body.CID;
    let DiffID=req.body.DIFFID;   
    


    let qr = `UPDATE quizes SET question ='${Question}', CID ='${CatId}',DIFFID ='${DiffID}', image ='${Image}' WHERE id ='${uId}'`;

    pool.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.send({
                message: "something wrong"
            });
        }
        
        else {

            res.send({
                message: "Data updated successfully",
                data: results
            });

        }
    });
})  


app.get('/updated/:id',(req,res)=>{
    let Id = req.params.id
    let qrr = `SELECT q.question,
    q.id,q.image,q.DIFFID,o.option,
    o.option_id,o.answer FROM quizes q 
    JOIN options o ON q.id = o.question_id where q.id = ${Id}`;
    pool.query(qrr,(err,results)=>{
        if(err){
            console.log(err,'error');
        }
        else{
                const questionData = [];
            
                let currentQuestion = null;
                let currentQues_id = null;
                let currentOptions = null;
                let Image = null;
                let DIFFID =null;
                for (const result of results) {
                    if (result.question !== currentQuestion) {
                        if (currentQuestion !== null) {
                            questionData.push({
                            ques: currentQuestion,
                            ques_id:currentQues_id,
                           options: currentOptions,
                            image : Image,
                            DIFFID:DIFFID
                            });
                        }
                        currentQuestion = result.question;
                        currentQues_id = result.question_id;
                        Image = result.image;
                        DIFFID=result.DIFFID;
                        currentOptions = [];
                    }
                    currentOptions.push({
                    option_id:result.option_id,
                    option: result.option,
                    answer: result.answer,
                    DIFFID:result.DIFFID
                    })
                }
               
                questionData.push({
                    ques: currentQuestion,
                    ques_id:currentQues_id,
                    options: currentOptions,
                     image : Image,
                     DiffID:DIFFID,
                  })
                    res.send({
                            data:questionData
                    })
            }
        })
    })





app.delete('/deletequiz',(req,res)=>{
    let ques_id = req.body.id;
    let options_id = req.body.options;
    // console.log(ques_id, options_id)
    for(let i of options_id){
        let qrr = `delete from options where option_id = '${i}'`;
        pool.query(qrr,(err,result)=>{
            if(err){
                console.log(err,'error');
            }
        })
    }
    let Querry = `delete from quizes where id = '${ques_id}'`   
        pool.query(Querry,(err,result)=>{
            if(err){
                console.log(err,'error');
            }
        })  
        res.send({
            msg:"Deleted"
        })

})


// app.get('/question/:id', (req, res) => {
//     let id = req.params.id;
//     let qr = `SELECT d.difficulty AS diff
//     FROM quizes u
//     JOIN courses c ON u.CID = c.id
//     JOIN diff d ON u.DIFFID = d.did
//     WHERE c.id = ? `;


//     pool.query(qr,[id],(err,results)=>{
//         if(err){
//             console.log(err);
//         }
//         if(results.length>0){
//             res.send({
//                 message:"get data by id",
//                 data:results
//             })
//         }
//         else{
//             res.send({
//                 message:"data not found"
//             })
//         }
//     })
// }); 

// app.get('/updated/:id/:did', (req, res) => {
//     let id = req.params.id;
//     let did=req.params.did;
//     let qr = `SELECT u.question,u.image,u.options,u.answer,d.difficulty AS diff
//     FROM quizes u
//     JOIN courses c ON u.CID = c.id
//     JOIN diff d ON u.DIFFID = d.did
//     WHERE c.id = ? AND d.did = ?`;

//     pool.query(qr,[id,did],(err,results)=>{
//         if(err){
//             console.log(err);
//         }
//         if(results.length>0){
//             res.send({
//                 message:"get data by id",
//                 data:results
//             })
//         }
//         else{
//             res.send({
//                 message:"data not found"
//             })
//         }
//     })
// });
                                
app.get('/read/:id', (req, res) => {
    console.log(req.params.id);
    let qrId = req.params.id;
    let qr = `SELECT * FROM quizes where CID = ${qrId} `;

    pool.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"get data by id",
                data:results
            })
        }
        else{
            res.send({
                message:"data not found"
            })
        }
    })

});

// app.get('/create/:id', (req, res) => {
//     console.log(req.params.id);
//     let qrId = req.params.id;
//     let qr = `SELECT * FROM quizes where CID = ${qrId} `;

//     db.query(qr,(err,results)=>{
//         if(err){
//             console.log(err);
//         }
//         if(results.length>0){
//             res.send({
//                 message:"get data by id",
//                 data:results
//             })
//         }
//         else{
//             res.send({
//                 message:"data not found"
//             })
//         }
//     })
    
// });


  

// post data 
app.post("/quiz",function(req,res){
    // console.log(req.body,'post data success');
    let Question=req.body.question;
    let Image=req.body.image;
    let CatId=req.body.CID;
    let DiffID=req.body.DIFFID;   

    let qr= `insert into quizes (question,image,CID,DIFFID) 
    value('${Question}','${Image}','${CatId}','${DiffID}')`;
    pool.query(qr,(err,results)=>{
        if(err){
            console.log(err)
        }
        res.send ({
            message :"data added successfully",
            data:results
        })

    })


})
//update data
app.put('/quiz/:id', (req, res) => {
    let uId = req.params.id;
    let Question=req.body.question;
    let Image=req.body.image;
    let CatId=req.body.CID;
    let DiffID=req.body.DIFFID;   
    


    let qr = `UPDATE quizes SET question='${Question}',CID='${CatId}',DIFFID='${DiffID}', image='${Image}' WHERE id='${uId}'`;

    pool.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.send({
                message: "something wrong"
            });
        } else {
            res.send({
                message: "Data updated successfully",
                data: results
            });

        }
    });
}) 
//delete data
app.delete('/quiz/:id', (req, res) => {
    let uId = req.params.id;
    let qr = `DELETE FROM quizes WHERE id='${uId}'`;

    pool.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.send({
                message: "something wrong"
            });
        } else {
            res.send({
                message: "Data deleted successfully"
            });
        }
    });
});

// app.get("/diffs", function(req,res){
    // console.log('get all users');
//     let qrr=`SELECT * FROM diff`;
//     db.query(qrr,(err,results)=>{
//         if (err){
//             console.log(err,'errs');
//         }
//         if(results.length>0){
//             res.send({
//                 message:'all users data',
//                 data:results
//             });
//         };
//     });
// });

app.get("/diffs/:id", function(req,res){
    let qrId = req.params.id;
    let qr = `SELECT d.difficulty,d.did 
    FROM diff d
    JOIN quizes u ON u.DIFFID = d.did where u.CID=${qrId}
    GROUP BY d.difficulty, d.did`;
    pool.query(qr,(err,results)=>{
        if (err){
            console.log(err,'errs');
        }
        if(results.length>0){
            res.send({
                message:'all users data',
                data:results
            });
        };
    });
})

//get single data  by id
app.get('/diffs/:id', (req, res) => {
    // console.log(req.params.id);
    let qrId = req.params.id;
    let qr = `SELECT * FROM diff where id = ${qrId} `;


    pool.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"get data by id",
                data:results
            })
        }else{
            res.send({
                message:"data not found"
            })
        }
    })
}); 

//login

app.get("/logins", function(req,res){
    // console.log('get all users');
        let qrr=`SELECT * FROM login`;
        pool.query(qrr,(err,results)=>{
            if (err){
                console.log(err,'errs');
            }
            if(results.length>0){
                res.send({
                    message:'all users data',
                    data:results
                });
            };
        });
});


//get single data  by id
app.get('/logins/:id', (req, res) => {
    
    let qrId = req.params.id;
    let qr = `SELECT * FROM login where id = ${qrId} `;


    pool.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"get data by id",
                data:results
            })
        }else{
            res.send({
                message:"data not found"
            })
        }
    })
}); 
app.get('/userlog/:id', (req, res) => {
    let qrId = req.params.id;
  
    // Query to retrieve marks data
    let qrMarks = `SELECT category, points, difficulty FROM marks WHERE userid = ${qrId}`;
  
    pool.query(qrMarks, (err, results) => {
      if (err) {
        console.log(err);
        res.send({
          message: "An error occurred while retrieving data.",
          error: err
        });
      } else if (results.length > 0) {
        // User found, retrieve classroom information
        let classroomIdQuery = `SELECT classroom_id FROM classroom_user WHERE user_id = ${qrId}`;
  
        pool.query(classroomIdQuery, (err, classroomIdResults) => {
          if (err) {
            console.log(err);
            res.send({
              message: "An error occurred while retrieving classroom information.",
              error: err
            });
          } else if (classroomIdResults.length > 0) {
            let classroomId = classroomIdResults[0].classroom_id;
  
            // Query to retrieve classname based on classroom ID
            let classNameQuery = `SELECT classname FROM classroom WHERE id = ${classroomId}`;
  
            pool.query(classNameQuery, (err, classNameResults) => {
              if (err) {
                console.log(err);
                res.send({
                  message: "An error occurred while retrieving classroom name.",
                  error: err
                });
              } else if (classNameResults.length > 0) {
                let className = classNameResults[0].classname;
                
                res.send({
                  message: "Data retrieved successfully.",
                  data: results,
                  className: className
                });
              } else {
                res.send({
                  message: "Classroom name not found.",
                  data: results
                });
              }
            });
          } else {
            res.send({
              message: "Classroom ID not found for the user.",
              data: results
            });
          }
        });
      } else {
        res.send({
          message: "Data not found for the user."

        });
      }
    });
  });
  
  

  
  

// post data 
app.post("/logins",function(req,res){
    // console.log(req.body,'post data success');
    // let Id=req.body.id
    let Username=req.body.username
    // console.log(Username)
    let qr= `insert into login (username) value('${Username}')`;
    pool.query(qr,(err,results)=>{
        if(err){
            console.log(err)
        }
        res.send ({
            message :"data added successfully",
            data:results
        })
    })
})
// //delete data
app.delete('/logins/:id', (req, res) => {
    let uId = req.params.id;
    let qr = `DELETE FROM login WHERE id='${uId}'`;

    pool.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.send({
                message: "something wrong"
            });
        } else {
            res.send({
                message: "Data deleted successfully"
            });
        }
    });
});

app.get("/lo/:username", function(req,res){
    // console.log(req.body)
    // console.log('get all users');
    let name = req.params.username;
    let qrr=`SELECT id FROM login where username = '${name}'`;
    pool.query(qrr,(err,results)=>{
        if (err){
            console.log(err,'errs');
        }

        else{
            res.send({
                data:results
            });
        }
    });
});


// user name and mark


app.get("/mark", function(req,res){
    // console.log('get all users');
    let qrr=`SELECT * FROM marks`;
    pool.query(qrr,(err,results)=>{
        if (err){
            console.log(err,'errs');
        }
        if(results.length>0){
            res.send({
                message:'all users data',
                data:results
            });
        };
    });
});

//for getting specific data

app.get("/usermark/:username", function(req,res){
    // console.log(req.body)
    // console.log('get all users');
    let name = req.params.username;
    let qrr=`SELECT id,categoryid,difficulty FROM marks where username = '${name}'`;
    pool.query(qrr,(err,results)=>{
        if (err){
            console.log(err,'errs');
        }
        else{
            res.send({
                data:results
            });
        }
    });
});

//get single data  by id
app.get('/mark/:id', (req, res) => {
    // console.log(req.params.id);
    let qrId = req.params.id;
    let qr = `SELECT * FROM marks where id = ${qrId} `;


    pool.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"get data by id",
                data:results
            })
        }else{
            res.send({
                message:"data not found"
            })
        }
    })
}); 

  
  

// post data 
app.post("/mark",function(req,res){
    // console.log(req.body,'post data success');
    let Username=req.body.username;
    let Points=req.body.points;
    let Category_id=req.body.category;
    let Difficulty=req.body.difficulty;
    let userID=req.body.userid;


    let Query = `select category from courses where id = ${Category_id}`
    pool.query(Query,(err,results)=>{
        if(err){
            console.log(err)
        }
        let category_name = results[0].category
        let qr= `insert into marks (username,points,category,difficulty,categoryid,userid) 
        value('${Username}','${Points}','${category_name}','${Difficulty}','${Category_id}','${userID}')`;
        pool.query(qr,(err,results)=>{
            if(err){
                console.log(err)
            }
            res.send ({
                message :"data added successfully",
                data:results
            })

        })
    })
})

//update data
app.put('/updatemark', (req, res) => {
    let uId = req.body.id;
    let Points=req.body.points;
    let qr = `UPDATE marks SET  points='${Points}' WHERE id='${uId}'`;

    pool.query(qr, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send({
                message: "Data updated successfully",
            });
        }
    });
})

// //delete data
app.delete('/mark/:id', (req, res) => {
    let uId = req.params.id;
    let qr = `DELETE FROM marks WHERE id='${uId}'`;

    pool.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.send({
                message: "something wrong"
            });
        } else {
            res.send({
                message: "Data deleted successfully"
            });
        }
    });
});


//category table

app.get("/course", function(req,res){
    let qrr=`SELECT * FROM courses`;
  pool.query(qrr,(err,results)=>{
      if (err){
          console.log(err,'errs');
      }
      if(results.length>0){
          res.send({
              message:'all users data',
              data:results
          });
      };
  });
});



// app.get("/co", function(req,res){
//     let qr = `SELECT c.category
//     FROM courses c
//     JOIN quizes u ON u.CID = c.id group by c.category`;
//     pool.query(qr,(err,results)=>{
//         if (err){
//             console.log(err,'errs');
//         }


//         if(results.length>0){
//             const courses = []
//             for(let i of results){
//                 courses.push(i.category)
//             }
//             res.send({
//                 message:'all users data',
//                 data:courses
//             });
//         };
//     });
// });

app.get("/co", function(req,res){
    

    let qr = `SELECT c.category
    FROM courses c
    JOIN quizes u ON u.CID = c.id group by c.category`;
    pool.query(qr,(err,results)=>{
        if (err){
            console.log(err,'errs');
        }


        if(results.length>0){
            const courses = []
            for(let i of results){
                courses.push(i.category)
            }
            res.send({
                message:'all users data',
                data:courses
            });
        };
    });
});


app.get("/cor/:id", function(req, res) {
  let qrId = req.params.id;
  let qr = `SELECT classroom_id
            FROM classroom_user
            WHERE user_id=${qrId}`;

  pool.query(qr, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results.length > 0) {
      let classroomId = results[0].classroom_id;

      let courseQuery = `SELECT *
                        FROM  courses  
                        WHERE classroom_id=${classroomId}`;

      pool.query(courseQuery, (err, courseResults) => {
        if (err) {
          console.log(err);

        }

    

        res.send({
          message: "get data by id",
          data: courseResults
        });
      });
    }
  });
});





// get single data  by id
app.get('/course/:id', (req, res) => {
    // console.log(req.params.id);
    let qrId = req.params.id;
    let qr = `SELECT category FROM courses where id = ${qrId} `;


    pool.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"get data by id",
                data:results
            })
        }
    })

}); 


app.put('/course/:id', (req, res) => {
    let uId = req.params.id;
    let Category=req.body.category;
    let Image=req.body.image;  
    


    let qr = `UPDATE courses SET category='${Category}', image='${Image}' WHERE id='${uId}'`;

    pool.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.send({
                message: "something wrong"
            });
        } else {
            res.send({
                message: "Data updated successfully",
                data: results
            });

        }
    });
})

// post data 
app.post("/course", function(req, res) {
    let Category = req.body.category;
    let Image = req.body.image;
    let Name = req.body.name;
    
    let qr = `INSERT INTO courses (category, image, classroom_id) 
              VALUES ('${Category}', '${Image}', (SELECT id FROM classroom WHERE classname = '${Name}'))`;
    
    pool.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Error occurred while adding data",
                error: err
            });
        } else {
            res.status(200).send({
                message: "Data added successfully",
                data: results
            });
        }
    });
});




app.delete('/course/:id', (req, res) => {
    let uId = req.params.id;
    let qr = `DELETE FROM courses WHERE id='${uId}'`;

    pool.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.send({
                message: "something wrong"
            });
        } else {
            res.send({
                message: "Data deleted successfully"
            });
        }
    });
});



app.get("/classroom", function(req,res){
    let qrr=`SELECT * FROM classroom`;
  pool.query(qrr,(err,results)=>{
      if (err){
          console.log(err,'errs');
      }
      if(results.length>0){
          res.send({
              message:'all users data',
              data:results
          });
      };
  });
});

// get single data  by id
app.get('/classroom/:id', (req, res) => {
    // console.log(req.params.id);
    let qrId = req.params.id;
    let qr = `SELECT category,id  FROM courses where classroom_id = ${qrId} `;

    pool.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"get data by id",
                data:results
            })
        }
    })

}); 
app.delete('/classroom/:id', (req, res) => {
    let uId = req.params.id;
    let qr = `DELETE FROM classroom WHERE id='${uId}'`;

    pool.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.send({
                message: "something wrong"
            });
        } else {
            res.send({
                message: "Data deleted successfully"
            });
        }
    });
});

app.get('/class/:id', (req, res) => {
    // console.log(req.params.id);
    let qrId = req.params.id;
    let qr = `select login.id ,login.username 
    from login  
    join classroom_user on login.id = classroom_user.user_id 
    where classroom_user.classroom_id= ${qrId} `;


    pool.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"get data by id",
                data:results
            })
        }
    })

}); 



app.post("/con", function(req, res) {
    let Name = req.body.username;
    let qrId = req.body.q_id;
    let qr = `INSERT INTO classroom_user (user_id, classroom_id)
              VALUES (
                (SELECT id FROM login WHERE username = '${Name}' LIMIT 1),
                (SELECT id FROM classroom WHERE id = ${qrId} LIMIT 1)
              )`;
    pool.query(qr, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Error occurred",
          error: err
        });
      } else {
        res.send({
          message: "Data added successfully",
          data: results
        });
      }
    });
  });


  app.post("/classroom", function(req, res) {
    let Classname = req.body.classname;
    
    let qr = `INSERT INTO classroom (classname) 
              VALUES ('${Classname}')`;
    
    pool.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Error occurred while adding data",
                error: err
            });
        } else {
            res.status(200).send({
                message: "Data added successfully",
                data: results
            });
        }
    });
});



app.delete('/con/:id', (req, res) => {
    let uId = req.params.id;
    let qr = `DELETE FROM classroom_user WHERE user_id='${uId}'`;

    pool.query(qr, (err, results) => {
        if (err) {
            console.log(err);
            res.send({
                message: "something wrong"
            });
        } else {
            res.send({
                message: "Data deleted successfully"
            });
        }
    });
});



app.get("/mar/:username", function(req, res) { 
    let name = req.params.username;
    let qrr=`SELECT id FROM login where username = '${name}'`;
    pool.query(qrr, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (results.length > 0) {
            let usname =results[0].id;
    let qr = `SELECT classroom_id
              FROM classroom_user
              WHERE user_id=${usname}`;
  
    pool.query(qr, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.length > 0) {
        let classroomId = results[0].classroom_id;
  
        let courseQuery = `select m.username,m.points,m.category,m.difficulty from marks m 
join classroom_user c on c.user_id=m.userid where classroom_id = ${classroomId}  order by points desc`;
  
        pool.query(courseQuery, (err, courseResults) => {
          if (err) {
            console.log(err);
  
          }
    
          res.send({
            message: "get data by id",
            data: courseResults
          });
        });
      }
    
    });
}
    });
  });
  
app.listen(3500,()=>{
    console.log("server is running on 3500 Port")
})