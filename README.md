My GraphQL Schema:
```type Post {
  id: ID
  title: String
  content: String
  categories: [PostCategory]
  createdAt: Float
  createdBy: Author
}

type Author {
  id: String
  firstName: String
  lastName: String
  dob: Float
}

input PostInput {
  title: String!
  content: String!
  categories: [PostCategory]!
}

enum PostCategory {
  PROMOTIONAL
  CONTROVERSIAL
  LIFESTYLE
  PERSONAL
}


input AuthorInput {
  firstName: String!
  lastName: String!
  dob: Float!
}

type Query {
  author(authorID: String!): Author
  post(postID: String!): Post
}

type Mutation {
  createPost(postInput: PostInput!): Post
  createAuthor(author: AuthorInput!): Author
}

```

## Endpoint localhost:4000/graphql GraphQL Playground
# Mutation createPost:
Create author using mutation createAuthor: provide: firstName,lastName,dob.  Must resolve _id_ to get _authorID_
Use jwt.io to generate jwt token, hash object : {authorID:_your author id_}, secret:**s3cr3t**.
Then provide Header: "Authorization":"Bearer token" to use **createPost**