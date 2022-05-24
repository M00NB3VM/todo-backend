# To do list API

![To do list](https://media4.giphy.com/media/QrpVwPDGmJEIvHwKEc/200w.webp?cid=ecf05e4788lvvy6431jg2h5lnl0a6lrpvawukym7f6wyfhbe&rid=200w.webp&ct=s)

A simple, small node server for a to do list.  
The todos are saved in a .JSON file.

My front-end application built for this can be found [here](https://github.com/M00NB3VM/todo-frontend).

This server is running locally on port 5001 and this will be used as the reference for the endpoints throughout this documentation.

## How

The todo-object contains the following information:

- Id - a new todo gets a random three-digit _number_ as an id
- Text - the task (_string_) to be performed
- Completed - _boolean_ value of true or false, set to false on added

Sample todo (JSON format):  
{ "id": 858,  
"text": "Sunshine",  
"completed": false }

### Get all todos

**GET** http://localhost:5001/todos

Example: fetch("http://localhost:5001/todos")
.then(response => response.json())

Response:  
Statuscode 200 \- OK  
{  
"todolist": [
&nbsp; { "id": 1, "text": "A beautiful test to do", "completed": false },
&nbsp; { "id": 2, "text": "Rainbows and butterflies", "completed": false },
&nbsp; { "id": 918, "text": "Hello, gorgeous", "completed": false },
&nbsp; { "id": 858, "text": "Sunshine", "completed": true },
&nbsp; { "id": 439, "text": "Summer", "completed": false }
]  
}

### Get a single todo

**GET** http://localhost:5001/todod/:id

Example: fetch("http://localhost:5001/todos/439")
.then(response => response.json())

Response:
Statuscode 200 \- OK  
{
"id": 439,  
"text": "Summer",  
"completed": false
}

### Add new todo

**POST** http://localhost:5001/todos

Example: fetch("http://localhost:5001/todos", {  
 method: "POST",  
 data: {  
"id": _number_,  
"text": "_User input_",  
"completed": false  
}  
})  
 .then(response => response.json())

Response:  
Statuscode 201 \- created  
{
"id": _number_,  
"text": "_User input_",  
"completed": false
}

### Change existing todo

**PUT** http://localhost:5001/todod/:id

Example: fetch("http://localhost:5001/todos/439", {  
 method: "PUT",  
 data: {  
"id": 439,  
"text": "Summer",  
"completed": false  
}  
})  
 .then(response => response.json())

Response:
Statuscode 200 \- OK  
{  
"id": 439,  
"text": "Summer",  
"completed": false  
}

Overwrites old values and removes properties not included in the post request.

**PATCH** http://localhost:5001/todod/:id

Example: fetch("http://localhost:5001/todos/439", {  
 method: "PATCH",  
 data: {  
"completed": true  
}  
})  
 .then(response => response.json())

Response:
Statuscode 200 \- OK  
{ "completed": true }

Returns the updated value only, other properties of the object stays unchanged.

### Remove todo

**DELETE** http://localhost:5001/todod/:id

Example: fetch("http://localhost:5001/todos/579", {  
 method: "DELETE",  
})  
 .then(response => response.json())

Response:
Statuscode 200 \- OK  
{"id": 579}

Returns the id of the deleted todo.

&nbsp;
&nbsp;

![Hardworking hamster](https://i.giphy.com/media/7nC1EZYhGa19X2hprq/200w.webp)
**_Let's write those todos, check them off and be productive!_**
![Hardworking cat](https://i.giphy.com/media/1m74tPnrcfw0gMyTel/200.webp)

&nbsp;
&nbsp;
