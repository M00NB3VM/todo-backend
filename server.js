const http = require("http");
const fs = require("fs");

const port = 5001;
const error = "Something went wrong";

const app = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
  }

  const path = req.url.split("/");

  // GET

  if (req.method === "GET") {
    const id = parseInt(path[2]);

    if (path.length === 2) {
      if (path[1] !== "todos") {
        res.statusCode = 404;
        res.end();
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        fs.readFile("todo.JSON", (err, data) => {
          if (err) throw error;
          const info = data.toString();

          res.end(JSON.stringify(info));
        });
      }
    } else if (path.length === 3) {
      fs.readFile("todo.JSON", (err, data) => {
        if (err) throw error;
        const info = JSON.parse(data);
        const checkId = info.todolist.find((e) => e.id === id);

        if (checkId === undefined) {
          res.statusCode = 404;
          res.end("Could not find a todo with this id");
        } else if (id) {
          res.statusCode = 200;

          fs.readFile("todo.JSON", (err, data) => {
            if (err) throw error;
            const info = data.toString();
            const newInfo = JSON.parse(info);

            const item = newInfo.todolist.filter(
              (item) => parseInt(item.id) === id
            );
            res.end(JSON.stringify(item));
          });
        }
      });
    }
  }

  // POST

  if (req.method === "POST") {
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");

    req.on("data", (chunk) => {
      const data = chunk.toString();
      const newData = JSON.parse(data);

      fs.readFile("todo.JSON", (err, data) => {
        if (err) throw error;

        const info = JSON.parse(data);
        info.todolist.push(newData);

        fs.writeFile("todo.JSON", JSON.stringify(info), (err) => {
          if (err) throw error;

          res.end(JSON.stringify(newData));
        });
      });
    });
  }

  // PUT

  if (req.method === "PUT") {
    if (path.length !== 3) {
      res.statusCode = 400;
      res.end("Wrong path");
    } else if (path.length === 3) {
      const id = parseInt(path[2]);

      fs.readFile("todo.JSON", (err, data) => {
        if (err) throw error;
        const info = JSON.parse(data);
        const checkId = info.todolist.find((e) => e.id === id);

        if (checkId === undefined) {
          res.statusCode = 404;
          res.end("Could not find todo with this id");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");

          req.on("data", (chunk) => {
            const data = chunk.toString();
            const newData = JSON.parse(data);

            fs.readFile("todo.JSON", (err, data) => {
              if (err) throw error;

              const info = JSON.parse(data);
              const newInfo = info.todolist.map((item) =>
                parseInt(item.id) !== id ? item : newData
              );
              const newTodolist = { todolist: newInfo };

              fs.writeFile("todo.JSON", JSON.stringify(newTodolist), (err) => {
                if (err) throw error;

                res.end(JSON.stringify(newData));
              });
            });
          });
        }
      });
    }
  }

  // PATCH

  if (req.method === "PATCH") {
    if (path.length !== 3) {
      res.statusCode = 400;
      res.end("Wrong path");
    } else if (path.length === 3) {
      const id = parseInt(path[2]);

      fs.readFile("todo.JSON", (err, data) => {
        if (err) throw error;
        const info = JSON.parse(data);
        const checkId = info.todolist.find((e) => e.id === id);

        if (checkId === undefined) {
          res.statusCode = 404;
          res.end("Could not find todo with this id");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");

          req.on("data", (chunk) => {
            const data = chunk.toString();
            const newData = JSON.parse(data);

            fs.readFile("todo.JSON", (err, data) => {
              if (err) throw error;

              const info = JSON.parse(data);

              const newInfo = info.todolist.map((item) => {
                if (parseInt(item.id) === id) {
                  if (newData.text) {
                    item.text = newData.text;
                    return item;
                  }

                  if (typeof newData.completed === "boolean") {
                    item.completed = newData.completed;
                    return item;
                  }
                } else {
                  return item;
                }
              });

              const newTodolist = { todolist: newInfo };

              fs.writeFile("todo.JSON", JSON.stringify(newTodolist), (err) => {
                if (err) throw error;

                res.end(JSON.stringify(newData));
              });
            });
          });
        }
      });
    }
  }

  // DELETE

  if (req.method === "DELETE") {
    if (path.length !== 3) {
      res.statusCode = 400;
      res.end("Wrong path");
    } else if (path.length === 3) {
      const id = parseInt(path[2]);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      fs.readFile("todo.JSON", (err, data) => {
        if (err) throw error;
        const info = JSON.parse(data);
        const checkId = info.todolist.find((e) => e.id === id);

        if (checkId === undefined) {
          res.statusCode = 404;
          res.end("Could not find todo with this id");
        } else {
          fs.readFile("todo.JSON", (err, data) => {
            if (err) throw error;

            const info = JSON.parse(data);
            const newInfo = info.todolist.filter(
              (item) => parseInt(item.id) !== id
            );

            const newTodolist = { todolist: newInfo };

            fs.writeFile("todo.JSON", JSON.stringify(newTodolist), (err) => {
              if (err) throw error;
              res.end(JSON.stringify(id));
            });
          });
        }
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
