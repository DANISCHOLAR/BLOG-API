const BlogModel = require("../model/blog");

function decryptToken(req, res) {
  const { authorization } = req.headers;
  const [_, token] = authorization.split(" ");
  const decryptToken = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );

  return decryptToken.user;
}

// logged in and not logged in can get all published blog displayed in the Home page
async function homeRoute(req, res) {
  try {
    const { page = 1, limit = 20, state, author, title, tags } = req.query;

    const sort = [];

    for (const param in req.query) {
      if (["read_count", "createdAt", "reading_time"].includes(param)) {
        const direction = req.query[param];
        const sort_direction = direction == "asc" ? 1 : -1;
        const row_sort = [param, sort_direction];
        sort.push(row_sort);
      }
    }
    const filter = { state: "published" };

    if (author) {
      filter.author = author;
    }

    if (title) {
      filter.title = title;
    }

    if (tags) {
      filter.tags = tags;
    }

    const blogs = await BlogModel.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    return res.json({
      message: "Welcome Home to the Blog API",
      published_blogs: blogs,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

// logged in and not logged in can get a publishedBlog
const getAPublishedBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id).populate("author", {
      state: "published",
    });

    if (blog.state !== "published") {
      return res.status(403).json({
        message: "false",
        error: "requested article is not published",
      });
    }

    // update blog read count

    blog.read_count += 1;
    await blog.save();

    return res.send(blog);
  } catch (err) {
    err.source = "get published blog controller";
    next(err);
  }
};

// logged in user creating blog
async function createBlog(req, res) {
  const newBlog = req.body;

  const user = decryptToken(req, res);
  const fullName = user.first_name + " " + user.last_name;

  //  ---- Calculate the Reading Time ----

  const reading_time = function () {
    const blogWords = newBlog.body.split(" ");
    const blogLength = blogWords.length;
    const estimatedTimeInMinutes = blogLength / 250;
    return `${estimatedTimeInMinutes} minutes`;
  };

  try {
    // ----- Save to the Db ---
    const blog = await BlogModel.create({
      title: newBlog.title,
      description: newBlog.description,
      author: fullName,
      tags: newBlog.tags,
      reading_time: reading_time(),
      body: newBlog.body,
      author_id: user._id,
    });

    res.status(201).json({ message: "Blog created Successfully", blog });
  } catch (err) {
    res.status(400);
    console.log(err);
    res.send(err.message);
  }
}

// The owner of the blogs should be able to get a list of the blogs
async function getAllBlogs(req, res) {
  // Get the request param
  const page = req.query.page || 0;
  const state = req.query.state;
  const booksPerPage = 20;

  // Get User Details from Token
  const user = decryptToken(req, res);

  if (state) {
    await BlogModel.find({ state: state })
      .skip(page * booksPerPage)
      .limit(booksPerPage)
      .then((blogs) => {
        return res.status(200).send(blogs);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err.message);
      });
  } else {
    await BlogModel.find({})
      .skip(page * booksPerPage)
      .limit(booksPerPage)
      .then((blogs) => {
        return res.status(200).send(blogs);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err.message);
      });
  }
}

// the owner of the blog should be able to update the state of the blog
async function updateBlogState(req, res) {
  const blog_Id = req.params.id;
  const detailsToUpdate = req.body;
  const user = decryptToken(req, res);

  await BlogModel.findOneAndUpdate(
    { author_id: user._id, _id: blog_Id },
    detailsToUpdate,
    { new: true }
  )
    .then((blog) => {
      if (blog == null) {
        res.status(400).json({
          message: "Unauthorized! You cannot update another user's blog",
        });
      } else {
        res.status(200).json({
          message: "Success!, Blog updated ",
          data: blog,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
}

//  logged in user can delete blog
async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const user = decryptToken(req, res);

    const blog = await BlogModel.deleteOne({ _id: id });

    return res.status(200).json({
      message: "Success!, Blog deleted",
      status: true,
      blog,
    });
  } catch (error) {
    error.type = "Internal Server Error";
    next(error);
  }
}

module.exports = {
  getAllBlogs,
  homeRoute,
  getAPublishedBlog,
  createBlog,
  updateBlogState,
  deleteBlog,
};
