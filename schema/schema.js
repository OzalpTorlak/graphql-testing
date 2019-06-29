const graphql = require('graphql');
const lodash = require('lodash');

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList} = graphql;

const movies = [
    {
        id: '1',
        title: 'The Godfather',
        description: 'Godfather Description',
        year: 1972,
        directorId : '1'
    },
    {
        id: '2',
        title: 'Scarface',
        description: 'Scarface Description',
        year: 1980,
        directorId : '3'
    },
    {
        id: '3',
        title: 'Pulp Fiction',
        description: 'Pulp Fiction Description',
        year: 1994,
        directorId : '2'
    },
    {
        id: '4',
        title: 'Apocalypse Now',
        description: 'Apocalypse Now Description',
        year: 1979,
        directorId : '1'
    },
    {
        id: '5',
        title: 'Reservoir Dogs',
        description: 'Reservoir Dogs Description',
        year: 1979,
        directorId : '3'
    },
];

const directors = [
    {
        id: '1',
        name: 'Francis Ford Coppola',
        birth : 1939
    },
    {
        id: '2',
        name: 'Brian De Palma',
        birth : 1940
    },
    {
        id: '3',
        name: 'Quentin Tarantino',
        birth : 1963
    },
];

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
                return lodash.find(directors, { id: parent.directorId})
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
                return lodash.filter(movies, {directorId: parent.id});
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
                return lodash.find(movies, { id: args.id })
            }
        },
        director: {
            type : DirectorType,
            args: { id: { type: GraphQLID}},
            resolve(parent,args){
                return lodash.find(directors, {id: args.id}) //id'ye göre data getirdi
            }
        },
        movies: {
            type : new GraphQLList(MovieType),
            resolve(parent, args){
                return movies
            }
        },
        directors: {
            type : new GraphQLList(DirectorType),
            resolve(parent, args){
                return directors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});