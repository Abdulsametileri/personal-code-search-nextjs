### Motivation

If you are preparing tech interviews you should solve the algorithm problems in 
hackerrank, leetcode and so on (what platform you prefer). Some questions and solutions 
gives you really good point. Also you may learn new things to use by looking the other 
solutions. Sometimes you want to remember the code snippets seen before. 

**This project may give you a solution.**

### Tech Stack

- Next js
- Firebase Authentication (Gmail)
- Heroku
- MongoDB Atlas (Mongoose for ORM)
- Amazon S3 (via CloudFront)

### Demo

All snippets in the site uploaded by me. Possibly you don't interested in.
So you can fork the project build on your own.

[Demo](https://personal-code-search.herokuapp.com)

You can search `bitwise`, `tree` or `sql` for see filtering functionality.

Code snippets is displayed `perPage = 5` as default. 
You can use pagination functionality at the bottom of the page.

**You cannot add the code snippet with `Add Code Snippets` link because 
you don't have authentication. This is just a demo for you.** 

`Add Code Snippets` is a basic post page. This is what its look like.
![](images/addCodeSnippet.png)

### Build on your own

You can follow to `.env.example` set your own credentials.

``` 
PCS_AWS_ACCESS_KEY=
PCS_AWS_SECRET_KEY=
PCS_AWS_REGION=
PCS_AWS_BUCKET_NAME=

MONGODB_USER_NAME=
MONGODB_PASSWORD=
MONGODB_DATABASE=

PCS_MONGODB_URI=mongodb+srv://$MONGODB_USER_NAME:$MONGODB_PASSWORD@cluster0.jew2r.mongodb.net/$MONGODB_DATABASE?retryWrites=true&w=majority

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Allowed email list for the google authentication
# You must split with ',' like email@gmail.com,email2@gmail.com
NEXT_PUBLIC_ALLOW_EMAILS=
```

Meaning of `PCS_` prefix is abbrevation of Personal Code Search.

### Model

```javascript
const CodeSchema = new mongoose.Schema({
  imageUrl: {
    /* The snippet image url of the specified code in s3 */
    type: String,
  },
  rawText: {
    /* The snippet raw text of the specified code */
    type: String,
  },
  tag: {
    /* Snippet tag for searching purposes */
    type: String,
    required: [true, 'Tag can\'t be empty']
  },
  description: {
    /* Snippet description to understand better */
    type: String,
  },
})

export default mongoose.models['Code'] || mongoose.model('Code', CodeSchema);
```

The main idea of 
the `tag` field is searching and 
the `description` field is to provide better understanding 
for the snippet.

If you want to upload the code as `rawText` not the image you can leave blank the
`imageUrl` and fill `rawText`.

You can look the paginaton and filtering at pages/api/paginateCodeSnippets.js

``` javascript
let filter = {}

if (keyword !== "") {
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(keyword);
  filter = {
    $or: [
      {tag: {$regex: searchRgx, $options: "i"}},
      {description: {$regex: searchRgx, $options: "i"}},
    ],
  }
}

const codeSnippets = await Code.find(filter)
  .skip((curPage - 1) * perPage)
  .limit(perPage)
  .sort({"_id": -1})
```

