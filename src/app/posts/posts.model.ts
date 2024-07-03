export interface PostsModel {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface PostCreateDto extends Omit<PostsModel, "id"> {}
