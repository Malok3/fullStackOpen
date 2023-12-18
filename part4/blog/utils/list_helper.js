const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  if(blogs.length===0){
    return 0
  }
  if(blogs.length===1){
    return blogs[0].likes
  }
  if (blogs.length>1){
    return blogs.reduce((total, blog) => total + blog.likes, 0);
  }
}

const favoriteBlog = (blogs) => {
  let biggest = blogs[0].likes
  let favBlog = blogs[0]
  for (i=1;i<blogs.length;i++){
    if(blogs[i].likes>biggest){
      biggest = blogs[i].likes
      favBlog = blogs[i]
    }
  }
  return favBlog
}

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => {
    return blog.author;
  });


  let mostBlogsAuthor = authors[0]
  let blogAmount = 0

  for (i=1; i<authors.length;i++){
    if (authors[i]===authors[0]){
      mostBlogsAuthor = authors[i]
      blogAmount ++
    }
  }
  
  return {
    author: mostBlogsAuthor,
    blogs: blogAmount
  }
  

}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}

