export interface blogType {
  _id: string;
  title: string;
  content: string;
  authorId: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  featuredImage: string;
  createdAt: string;
  category: String;
}
