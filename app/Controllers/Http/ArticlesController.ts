// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Database from "@ioc:Adonis/Lucid/Database";
import Article from "App/Models/Article";
// import { schema } from '@ioc:Adonis/Core/Validator'
import CreateArticleValidator from "App/Validators/CreateArticleValidator";

export default class ArticlesController {
    public async index({ view }) {
        //fetch data from db
        // const articles = await Database.from('articles').select("*");

        //ORM way
        const articles = await Article.all()
        return view.render("article/view", { articles });
    }

    public async create({ view }) {
        return view.render('article/create');
    }

    public async show({ view, params }) {
        // const article = await Database.from('articles').where('slug', params.slug).first();

        const article = await Article.findBy('slug', params.slug);
        return view.render("article/show", { article });
    }

    public async store({ response, request }) {
        const payload = await request.validate(CreateArticleValidator);
        // await Database.table('articles')
        //     .insert({
        //         ...payload,
        //         // + sign in front of new is mean Number(), used to convert data into number
        //         slug: payload.title.replace(" ", "-") + +new Date(),
        //     });

        await Article.create(payload);
        return response.redirect().back();
    }

    public async edit({ view, params }) {
        // const { slug } = params;
        // const article = await Database.from('articles').where("slug", slug).first();

        const article = await Article.findBy('slug', params.slug);
        return view.render("article/edit", { article });
    }

    public async update({ request, response, params }) {
        const payload = await request.validate(CreateArticleValidator);
        // await Database.from('articles').where('slug', params.slug).update(payload);

        await Article.query().where('slug', params.slug).update(payload);
        return response.redirect().back();
    }

    public async destroy({ params, response }) {
        // await Database.from('articles').where("slug", params.slug).delete();

        const article = await Article.findBy('slug', params.slug);
        if (article) {
            await article.delete();
            return response.redirect().back();
        }

    }
}
