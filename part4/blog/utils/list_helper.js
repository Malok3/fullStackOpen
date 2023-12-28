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
    return blogs.reduce((total, blog) => total + blog.likes, 0)
  }
}

const favoriteBlog = (blogs) => {
  let biggest = blogs[0].likes
  let favBlog = blogs[0]
  for (let i=1;i<blogs.length;i++){
    if(blogs[i].likes>biggest){
      biggest = blogs[i].likes
      favBlog = blogs[i]
    }
  }
  return favBlog
}




const mostBlogs = (blogs) => {
  const authorsArray = blogs.map((blog) => {
    return blog.author
  })

  // Reduce will loop through AutorsArray, Acc is initially an empty object, author is an item of the array
  // If the property (author) already exists in the object -> increments its value
  // Else -> creates a new property then increments its value of one

  const counts = authorsArray.reduce((acc, author) => {
    if (acc[author]) {
      acc[author]++
    } else {
      acc[author] = 1
    }
    return acc

  }, {})

  // Counts: { 'Michael Chan': 1, 'Edsger W. Dijkstra': 2, 'Robert C. Martin': 3 }

  let mostFrequentAuthor
  let highestCount = 0

  for (const key in counts) {
    if (counts[key] > highestCount) {
      highestCount = counts[key]
      mostFrequentAuthor = key
    }
  }

  return {
    'author':mostFrequentAuthor,
    'blogs':highestCount
  }
}

const mostLikes = (blogs) => {
  const authorsAndLikes = blogs.reduce((acc, blog) => {
    //creates 2 variables, then adds values extracted from blog object
    const { author,likes } = blog
    // If author exists in acc, add likes to its total else initialize its number of likes
    if (acc[author]) {
      acc[author].totalLikes += likes
    } else {
      acc[author] = {
        totalLikes: likes
      }
    }
    return acc
  }, {})

  // authorsAndLikes {
  //   'Michael Chan': { totalLikes: 7 },
  //   'Edsger W. Dijkstra': { totalLikes: 17 },
  //   'Robert C. Martin': { totalLikes: 12 }
  // }

  let mostLikedAuthor = ''
  let mostLikes = 0

  for (const author in authorsAndLikes) {
    if (authorsAndLikes[author].totalLikes > mostLikes) {
      mostLikes = authorsAndLikes[author].totalLikes
      mostLikedAuthor = author
    }
  }

  return {
    'author':mostLikedAuthor,
    'likes':mostLikes
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}

