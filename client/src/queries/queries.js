import { gql } from 'apollo-boost';

export const getMoviesQuery = gql`
    {
        movies{
            id,
            title,
            description
        }
    }
`;

export const getDirectorsQuery = gql`
    {
        directors{
            name,
        }
    }
`;

export const newMovieMutation = gql `

    mutation(
        $title:String!, 
        $description:String, 
        $year:Int!, 
        $directorId:ID!){
        addMovie(
            title:$title, 
            description:$description, 
            year:$year, 
            directorId:$directorId)
            {
            title
        }
    }
`;
