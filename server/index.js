require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select
      "name",
      "productId",
      "price",
      "image",
      "shortDescription"
    from "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: 'productId must be a positive integer'
    });
  }
  const sql = `
    select *
      from "products"
     where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        next();
      } else {
        res.status(200).json(product);
      }
    })
    .catch(err => { next(err); });
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.status(200).json([]);
  } else {
    const sql = `
    select "c"."cartItemId",
           "c"."price",
           "p"."productId",
           "p"."image",
           "p"."name",
           "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using("productId")
     where "c"."cartId" = $1
    `;
    const params = [req.session.cartId];
    db.query(sql, params)
      .then(result => {
        res.status(200).json(result.rows);
      })
      .catch(err => next(err));
  }
  // db.query('select * from "carts"')
  //   .then(result => {
  //     res.json(result.rows);
  //   })
  //   .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: 'productId must be a positive integer'
    });
  }
  const sql = `
    select "price"
      from "products"
     where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const price = result.rows[0];
      if (!price) {
        throw next(new ClientError('That product doesn\'t exist. Please enter a different productId', 404));
      } else if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: price.price
        };
      } else {
        const cartSQL = `
          insert into "carts" ("cartId", "createdAt")
            values (default, default)
            returning "cartId"
        `;
        return db.query(cartSQL)
          // .then(result => res.json(result))
          .then(result => {
            const cartId = result.rows[0].cartId;
            return {
              cartId,
              price: price.price
            };
          })
          .catch(err => next(err));
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const cartItemSQL = `
        insert into "cartItems" ("cartId", "productId", "price")
          values ($1, $2, $3)
          returning "cartItemId"
      `;
      const params = [req.session.cartId, productId, result.price];
      return db.query(cartItemSQL, params)
        .then(result => result.rows[0].cartItemId)
        .catch(err => next(err));
    })
    .then(result => {
      const cartItemId = result;
      const productInfoSQL = `
        select "c"."cartItemId",
               "c"."price",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
         where "c"."cartItemId" = $1
      `;
      const params = [cartItemId];
      return db.query(productInfoSQL, params)
        .then(result => res.status(201).json(result.rows[0]))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// serverside error handling
app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
