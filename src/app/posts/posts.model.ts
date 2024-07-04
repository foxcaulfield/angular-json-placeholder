/* https://jsonplaceholder.typicode.com */
// export interface ExternalPostModel {
//     userId: number;
//     id: number;
//     title: string;
//     body: string;
// }

export interface ExternalPostModel {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
}

export interface PostsModel {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
}

export interface PostCreateDto extends Omit<PostsModel, "id" | "reactions" | "views"> {}

// export class PostCreateDto
//     implements Omit<PostsModel, "id" | "reactions" | "views">
// {
//     public constructor(
//         public body: string,
//         public title: string,
//         public userId: number,
//         public tags: string[]
//     ) {}
// }
