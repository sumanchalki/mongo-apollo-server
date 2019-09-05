# Mongo Apollo Server
Apollo GraphQL Server is created with Express.js. MongoDB data is being provided through GraphQL

<h4>Example data in MongoDB:</h4>
<h5>db.user.find().pretty()</h5>

```
{ "_id" : 1, "firstName" : "Suman", "lastName" : "Chalki", "phone" : 9765 }
{ "_id" : 2, "firstName" : "Peter", "lastName" : "Parker", "phone" : 2222 }
{ "_id" : 3, "firstName" : "John", "lastName" : "Nash", "phone" : 1111 }
{ "_id" : 4, "firstName" : "Peter", "lastName" : "Pan", "phone" : 1234 }
```

<h5>db.contact.find().pretty()</h5>

```
{ "_id" : 1, "user1" : 1, "user2" : 2 }
{ "_id" : 2, "user1" : 1, "user2" : 3 }
```

<h4>Example queries:</h4>

```
{
  allUsers {
    id
    name
    lastName
  }
}
```

```
{
  allUsers (orderBy: firstName_ASC, skip: 1, first: 2) {
    name
  }
}
```

```
query {
  userById(id: 2) {
    name
  }
}
```

```
{
  filterUsers (input: {firstName: "Peter"}) {
    name
  }
}
```

```
mutation {
  addUser (
    firstName: "John"
    lastName: "Resig"
    phone: 4444
  ) {
    id
    name
  }
}
```
