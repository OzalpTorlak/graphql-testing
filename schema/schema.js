const graphql = require('graphql');
const lodash = require('lodash');

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLNonNull} = graphql;

//MongoDB Models

const Movie = require ('../models/Movie.js');
const Director = require ('../models/Director.js');

const MovieType = new GraphQLObjectType({
    name : 'Movie',
    fields : () => ({
        id : { type: GraphQLID},
        title : { type: GraphQLString},
        description: { type: GraphQLString},
        year: { type: GraphQLInt},
        director: { 
            type: DirectorType,
            resolve(parent, args){
                //return lodash.find(directors, { id: parent.directorId})
                return Director.findById(paren.directorId)
            }
        }
    })
});

const DirectorType = new GraphQLObjectType ({
    name : 'Director',
    fields : () => ({
        id: { type: GraphQLID},
        name : { type: GraphQLString},
        birth : { type: GraphQLInt},
        movies: {
            type : new GraphQLList(MovieType),
            resolve(parent,args){
                //return lodash.filter(movies, {directorId: parent.id});
                return Movie.find( {directorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType ( {
    name : 'RootQueryType',
    fields: {
        movie: { // api'de çağırılacak isim
            type: MovieType,
            args: { id: { type : GraphQLID }}, //bir dataya erişirken hangi argüman üzerinden ulaşacağını söylüyorsun. (Örn: id gibi )
            resolve(parent, args){ // veriyi bize getirecek fonksiyon
                //return lodash.find(movies, { id: args.id })
                return Movie.findById(args.id)
            }
        },
        director: {
            type : DirectorType,
            args: { id: { type: GraphQLID}},
            resolve(parent,args){
                // return lodash.find(directors, {id: args.id}) //id'ye göre data getirdi
                return Director.findById(args.id)
            }
        },
        movies: {
            type : new GraphQLList(MovieType),
            resolve(parent, args){
                return Movie.find({})
            }
        },
        directors: {
            type : new GraphQLList(DirectorType),
            resolve(parent, args){
                return Director.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie : {
            type : MovieType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString},
                year: { type: new GraphQLNonNull(GraphQLInt)},
                directorId : { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                const movie = new Movie({
                    title: args.title,
                    description : args.description,
                    year : args.year,
                    directorId : args.directorId
                });
                return movie.save();
            }
        },
        addDirector : {
            type : DirectorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                birth: { type: GraphQLInt},
            },
            resolve(parent, args){
                const director = new Director({
                    name: args.name,
                    birth : args.birth,
                });
                return director.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});