const express = require("express");
const app = express();
const port = 3000;
const db = require("./src/db");
const { QueryTypes } = require("sequelize");
const session = require("express-session");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploadImage/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
});
app.set("view engine", "hbs");
app.set("views", "views");
app.set("trust proxy", 1);
app.use("/image", express.static("image"));
app.use("/uploadImage", express.static("uploadImage"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: "alexa",
    resave: false,
    saveUninitialized: true,
    store: new session.MemoryStore(),
    cookie: {
      maxAge: 3600000,
      secure: false,
      httpOnly: true,
    },
  })
);
app.use((req, res, next) => {
  res.locals.isLogin = req.session.isLogin || false;
  res.locals.user = req.session.user || {};
  next();
});

app.get("/", renderIndex);
app.get("/detail/:id", renderDetail);
app.get("/add-heroes", renderAddHeroes);
app.post("/add-heroes", upload.single("image"), postAddHeroes);

async function renderIndex(req, res) {
  const query = `SELECT *
	FROM public."Hero";`;
  const result = await db.query(query, {
    type: QueryTypes.SELECT,
  });
  res.render("index", {
    data: result,
  });
}

async function renderDetail(req, res) {
  const id = req.params.id;
  const query = `SELECT *
	FROM public."Hero" WHERE id = $1;`;

  const result = await db.query(query, {
    type: QueryTypes.SELECT,
    bind: [id],
  });
  res.render("detail", {
    hero: result[0],
  });
}

async function renderAddHeroes(req, res) {
  res.render("add-heroes");
}

async function postAddHeroes(req, res) {
  const value = [req.body.name, req.body.type, req.file.filename];
  const heroes = `INSERT INTO "Hero" (hero_name, hero_type, image) VALUES($1, $2, $3)`;

  await db.query(heroes, {
    type: QueryTypes.INSERT,
    bind: value,
  });
  res.redirect("/");
}

app.listen(port, () => {
  console.log(`Server berjalan di port${port}`);
});
