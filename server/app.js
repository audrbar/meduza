const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');

// ****************** Create connection *****************
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db6'
});

// ****************** Connect database *****************
con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected ...');
})

const app = express();
const port = 3003;
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// ****************** Use dependencies *****************
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser());

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// ****************** Get, Update, Delete CATEGORIES *****************
// get all categories
app.get('/categories', (req, res) => {
    const sql = ` SELECT id, title, type FROM categories`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json({ data: result });
    });
});

// create a new category
app.post('/categories', (req, res) => {
    const sql = `INSERT INTO categories (title, type) VALUES (?, ?)`;
    con.query(sql, [req.body.title, req.body.type], (err) => {
        if (err) throw err;
        res.json({
            message: { text: 'New category was created.' }
        });
    });
});

// change category type
app.put('/category/:id', (req, res) => {
    const sql = `UPDATE categories SET title = ?, type = ? WHERE cont_id = ?`;
    const params = [req.body.title, req.body.type, req.params.id];
    con.query(sql, params, (err) => {
        if (err) throw err;
        res.json({
            msg: { text: 'The category type was changed.' }
        });
    });
});

// delete category
app.delete('/category/:id', (req, res) => {
    const sql = `DELETE FROM categories WHERE id = ?`;
    con.query(sql, [req.params.cont_id], (err) => {
        if (err) throw err;
        res.json({
            msg: { text: 'The category was deleted.' }
        });
    });
});

// ****************** Get, Update, Delete CONCERTS *****************
// get all concerts
app.get('/concerts', (req, res) => {
    const sql = `SELECT id, title, category, photo, time, place, active FROM concerts ORDER BY time desc`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});
// get one concert by id
app.get('/concerts/:id', (req, res) => {
    const sql = `SELECT iid, title, category, photo, time, place, active FROM concerts WHERE id = ?`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});
// create a new concert
app.post('/concerts', (req, res) => {

    let fileName = null;

    if (req.body.file !== null) {

        let type = 'unknown';
        let file;

        if (req.body.file.indexOf('data:image/png;base64,') === 0) {
            type = 'png';
            file = Buffer.from(req.body.file.replace('data:image/png;base64,', ''), 'base64');
        } else if (req.body.file.indexOf('data:image/jpeg;base64,') === 0) {
            type = 'jpg';
            file = Buffer.from(req.body.file.replace('data:image/jpeg;base64,', ''), 'base64');
        } else {
            file = Buffer.from(req.body.file, 'base64');
        }

        fileName = uuidv4() + '.' + type;

        fs.writeFileSync('./public/' + fileName, file);
    }

    const sql = `INSERT INTO concerts (title, category, photo, place) VALUES (?, ?, ?, ?)`;
    con.query(sql, [req.body.title, req.body.category, fileName, req.body.place], (err) => {
        if (err) throw err;
        res.json({
            message: { text: 'New cargo item was created.' }
        });
    });
});
// edit concert by its id
app.put('/concert/:id', (req, res) => {
    let fileName = null;

    if (req.body.delImg) {
        let sql = `SELECT photo FROM concerts WHERE id = ?`;
        con.query(sql, [req.params.id], (err, result) => {
            if (err) throw err;
            if (result[0].photo) {
                fs.unlinkSync('./public/' + result[0].photo);
            }
        });
    }
    if (req.body.file) {
        let type = 'unknown';
        let file;
        if (req.body.file.indexOf('data:image/png;base64,') === 0) {
            type = 'png';
            file = Buffer.from(req.body.file.replace('data:image/png;base64,', ''), 'base64');
        } else if (req.body.file.indexOf('data:image/jpeg;base64,') === 0) {
            type = 'jpg';
            file = Buffer.from(req.body.file.replace('data:image/jpeg;base64,', ''), 'base64');
        } else {
            file = Buffer.from(req.body.file, 'base64');
        }
        fileName = uuidv4() + '.' + type;
        fs.writeFileSync('./public/' + fileName, file);
    }
    let sql;
    let params;
    if (!req.body.delImg && req.body.file) {
        sql = `UPDATE concerts SET title = ?, place = ?, category = ?, photo, active = ? WHERE id = ?`;
        params = [req.body.title, req.body.place, req.body.category, fileName, req.body.active, req.params.id];
    } else {
        sql = `UPDATE concerts SET title = ?, place = ?, category = ?, active = ? WHERE id = ?`;
        params = [req.body.title, req.body.place, req.body.category, req.body.active, req.params.id];
    }
    con.query(sql, params, (err) => {
        if (err) throw err;
        res.json({
            message: { text: 'The cargo item was updated.' }
        });
    });
});
// load concert on cont
app.put('/loadconcert/:id', (req, res) => {
    let sql = `UPDATE concerts SET category_id = ? WHERE concerts.id = ?`;

    // console.log('req.body: ', req.body);
    // console.log('req.params: ', req.params);

    con.query(sql, [req.body.category_id, req.params.id], (err, result) => {
        if (err) throw err;
        res.json({
            message: { text: 'The cargo was loaded.' }
        });
    });
});
// delete concert
app.delete('/concerts/:id', (req, res) => {
    let sql = `SELECT id, photo FROM concerts WHERE id = ?`;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        if (result[0].photo) {
            fs.unlinkSync('./public/' + result[0].photo)
        };
    });

    sql = `DELETE FROM concerts WHERE id = ?`;
    con.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({
            message: { text: 'The cargo item was deleted.' }
        });
    });
});

// ****************** Get, Update, Delete USERS *****************
// user register
app.post('/register', (req, res) => {
    const sql = `INSERT INTO users (name, psw) VALUES (?, ?)`;
    const hashedPsw = md5(req.body.psw);
    con.query(sql, [req.body.name, hashedPsw], (err, result) => {
        if (err) throw err;
        res.json({
            status: 'ok',
        });
    });
});
// login user
app.post('/login', (req, res) => {
    const sessionId = uuidv4();
    const sql = `UPDATE users SET session = ? WHERE name = ? AND psw = ?`;
    con.query(sql, [sessionId, req.body.name, md5(req.body.psw)], (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.cookie('CargoSession', sessionId);
            res.json({
                status: 'ok',
                name: req.body.name,
            });
        } else {
            res.json({
                status: 'error',
            });
        }
    });
});
// get logged user
app.get('/login', (req, res) => {
    const sql = `SELECT name, role FROM users WHERE session = ?`;
    con.query(sql, [req.cookies.CargoSession || ''], (err, result) => {
        if (err) throw err;
        if (result.length) {
            res.json({
                status: 'ok',
                name: result[0].name,
                role: result[0].role,
            });
        } else {
            res.json({
                status: 'error',
            });
        }
    });
});
// logout user
app.post('/logout', (req, res) => {
    res.clearCookie('CargoSession');
    res.json({
        status: 'logout',
    });
});

// ****************** Get, Update, Delete MANAGERS *****************
// get all managers
app.get('/managers', (req, res) => {
    const sql = `SELECT id, name, role FROM users`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// edit manager
app.put('/manager/:id', (req, res) => {
    let sql = `UPDATE users SET name = ?, role = ? WHERE id = ?`;
    con.query(sql, [req.body.name, req.body.role, req.params.id], (err, result) => {
        if (err) throw err;
        res.json({
            message: { text: 'The manager data was updated.' }
        });
    });
});
// delete manager
app.delete('/manager/:id', (req, res) => {
    const sql = `SELECT id FROM users WHERE id = ?`;
    con.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        const sql = `DELETE FROM users WHERE id = ?`;
        con.query(sql, [req.params.id], (err) => {
            if (err) throw err;
            res.json({
                message: { text: 'The manager was deleted.' }
            });
        });
    })
});

// ****************** App Listen On Port *****************
app.listen(port, () => {
    console.log(`LN is on port number: ${port}`);
});