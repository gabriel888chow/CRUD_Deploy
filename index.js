
// const loginurlRouter = require('./src/routes/controllers/api/loginurl')

// const express = require('express');
// const cors = require("cors");
// const mysql = require('mysql2');

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
// import loginurlRouter from './src/routes/controllers/api/loginurl';
// import { getAuthCodeUrl } from './src/utilities/polyusso.js';
// import { createApiResponse } from './src/models/model.js';

const app = express();
// const router = express.Router();


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    // port: 3306,
    user: 'root',
    host: 'localhost',
    password: 'Ar082246',
    database: "namecard",
    // useConnectionPooling: true,
});


app.post('/create', (req, res) => {
    console.log(req.body);
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const department = req.body.department;
    const jobtitle = req.body.jobtitle;
    const email = req.body.email;
    const officephonenumber = req.body.officephonenumber;
    const mobilephonenumber = req.body.mobilephonenumber;
    // const organization = req.body.organization;
    // const urladdress = req.body.urladdress;
    const address = req.body.address;
    const language = req.body.language;
    // const orcid = req.body.orcid;


    db.query(
        "INSERT INTO namecard_data (firstname, lastname, department, jobtitle, email, officephonenumber, mobilephonenumber, address, language) VALUES (?,?,?,?,?,?,?,?,?)",
        [firstname, lastname, department, jobtitle, email, officephonenumber, mobilephonenumber, address, language],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                // res.send("Values Inserted")
                res.status(200).send({ firstname, lastname, department, jobtitle, email, officephonenumber, mobilephonenumber, address, language })
            }
        }
    );
});

app.get('/data', (req, res) => {
    db.query("SELECT * FROM namecard_data", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/edit', (req, res) => {
    const id = req.body.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const department = req.body.department;
    const jobtitle = req.body.jobtitle;
    const email = req.body.email;
    const officephonenumber = req.body.officephonenumber;
    const mobilephonenumber = req.body.mobilephonenumber;
    const address = req.body.address;
    // console.log(firstname, "backEnd firstname")
    // console.log(req, "reqqq")

    db.query("UPDATE namecard_data SET firstname = ?, lastname = ?, department = ?, jobtitle = ?, email = ?, officephonenumber = ?, mobilephonenumber = ?, address = ? WHERE id = ?",
        [firstname, lastname, department, jobtitle, email, officephonenumber, mobilephonenumber, address, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    // const { id } = req.params;
    // console.log(req.params, "params11111111111")
    const sqlDelete = "DELETE FROM namecard_data WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted Request!!");
        }
    })
    res.status(200).send({ isSuccess: true })
})

// -------------------------------------------------------orcid_data table------------------------------------------------
app.post('/create/orcid', (req, res) => {
    console.log(req.body);
    const orcidURL = req.body.orcidURL;


    db.query(
        "INSERT INTO orcid_data (orcidURL) VALUES (?)",
        [orcidURL],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send({ orcidURL })
            }
        }
    );
});

app.get('/data/orcid', (req, res) => {
    db.query("SELECT * FROM orcid_data", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/edit/orcid', (req, res) => {
    const id = req.body.id;
    const orcidURL = req.body.orcidURL;

    db.query("UPDATE orcid_data SET orcidURL = ? WHERE id = ?",
        [orcidURL, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.delete('/delete/orcid/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM orcid_data WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted Request!!");
        }
    })
    res.status(200).send({ isSuccess: true })
})
// -------------------------------------------------------orcid_data table------------------------------------------------

// app.use('/api/loginurl', loginurlRouter);

// router.post('/api/loginurl', async (req, res, next) => {
//     try {
//         const originUrl = !!req.body?.originUrl ? String(req.body?.originUrl) : "/";

//         return res.status(200).send(createApiResponse(null, { url: await getAuthCodeUrl(originUrl) }));
//     } catch (err) {
//         console.log(`Unknown error cought from /polyusso/loginurl: ${err}`);
//         return next(err);
//     }
// });

app.listen(8080, () => {
    console.log("server is running on port 8080");
})

