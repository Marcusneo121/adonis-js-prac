import Route from '@ioc:Adonis/Core/Route'
// import ArticlesController from 'App/Controllers/Http/ArticlesController';

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// })

// Route.get('/news', ({ view }) => {
//   return view.render('news/view')
// })


// Route.get('/news', async (ctx) => {
//   return new ArticlesController().view(ctx);
// }).as('news_view');

// Route.post('/news', ({ request, response }) => {
//   // const { email, password } = request.body();
//   // return { email, password };
//   return response.redirect('/news');
// }).as('news.create');

// Route.patch('/news/:id', ({ params }) => {
//   return { params };
// }).where("id", {
//   match: /^[0-9]+$/,
//   cast: (id) => Number(id)
// }).as('news.update');

// Route.delete('/news/:id', ({ params }) => {
//   return { params };
// }).where("id", {
//   match: /^[0-9]+$/,
//   cast: (id) => Number(id)
// }).as('news.delete');

//Middleware
Route.on("/").render("welcome");

Route.resource('news', "ArticlesController")
  .paramFor('news', "slug")
  .middleware({
    create: ["auth"],
    store: ["auth"],
    destroy: ["auth"],
    edit: ["auth"],
  })
// .as("articles")
// .apiOnly();


Route.on('/login').render('auth.login').as('auth.login');
Route.post('/login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  await auth.use('web').attempt(email, password)
  return response.redirect('/news');
})

Route.post('/logout', async ({ auth, response }) => {
  await auth.use('web').logout()
  response.redirect('/login')
}).as('auth.logout');

// Route.get('/news', "ArticlesController.view").as('news_view');
// Route.get('/news/create', 'ArticlesController.create').as('news_create');
// Route.post('/news', 'ArticlesController.store').as('news_store');
// Route.get('/news/:slug', 'ArticlesController.edit').as('news_edit');
// Route.patch('/news/:slug', 'ArticlesController.update').as('news_update');
// Route.delete('/news/:slug', 'ArticlesController.destroy').as('news_delete');