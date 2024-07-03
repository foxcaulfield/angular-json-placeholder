export interface ExternalPostModel {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface PostsModel {
    userId: string;
    id: string;
    title: string;
    body: string;
}

export interface PostCreateDto extends Omit<PostsModel, "id"> {}
