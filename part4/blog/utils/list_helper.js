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
  for (i=1;i<blogs.length;i++){
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


  const counts = authorsArray.reduce((acc, currentValue) => {
    if (acc[currentValue]) {
      acc[currentValue]++
    } else {
      acc[currentValue] = 1
    }
    return acc
  }, {})

  // Counts: { 'Michael Chan': 1, 'Edsger W. Dijkstra': 2, 'Robert C. Martin': 3 }

  // Recherche de la valeur la plus fréquente et de son nombre d'occurrences
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

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}

