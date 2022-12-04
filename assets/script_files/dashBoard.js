import getTemplate from './template.js'
var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
const userName = document.querySelector('.userName')
const friendList = document.querySelector('.friends')
const tagList = document.querySelector('#tags')
const postList = document.querySelector('.post-container')
const appId = '6379b53d84d948d558465a98'
const baseUrl = 'https://dummyapi.io/data/v1/'
const friendApi = 'user?limit=10'
const tagApi = 'tag?limit=10'
let page = 0
let allComment = []

userName.innerText = currentUser.firstName + ' ' + currentUser.lastName
// function to fetch Data from Api
async function fetchData(baseUrl, endPoint) {
  let response = await fetch(baseUrl + endPoint, {
    headers: { 'app-id': appId }
  }).then((response) => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(`Api is not working properly due to ${error.message}`);
    })
  return response
};

// function to get friend list and show it on DOM
async function friendListdata() {
  let response = await fetchData(baseUrl, friendApi);
  response.data.forEach((el) => {
    let html = getTemplate('friendList', el)
    friendList.insertAdjacentHTML('afterbegin', html)
  })
}
friendListdata()

// function to get tags and create DOM Element dynamically
async function tagData() {
  let response = await fetchData(baseUrl, tagApi)
  response.data.slice(7, 20).forEach((tag) => {
    const html = getTemplate('tag', tag)
    tagList.insertAdjacentHTML('afterbegin', html)
  })
};
tagData()

// function to get post data and create DOM Element dynamically
async function postData() {
  let postApi = 'post?page='+page+'&limit=10'
  let response = await fetchData(baseUrl, postApi)
  response.data.forEach((post, i) => {
    const html = getTemplate('post', post, i)
    postList.insertAdjacentHTML('beforeend', html)
  })
  page++
};
postData()

// function to fetch post by tag 
window.getPostByTag = getPostByTag
async function getPostByTag(e) {
  e.preventDefault()
  page = 0
  let tagName = e.target.innerText
  if (tagName[0] == '#') tagName = tagName.slice(1, tagName.length)
  let response = await fetchData(baseUrl, `tag/${tagName}/post?limit=10`)
  postList.innerHTML = ''
  response.data.forEach((post, i) => {
    const html = getTemplate('post', post, i)
    postList.insertAdjacentHTML('beforeend', html)
  })
}

// Post like
window.likedPost = likedPost
function likedPost(e) {
  e.target.classList.toggle("fa-solid")
}

// function to get comment Data from Api
export async function getCommentData(id, postID) {
  let commentApi = `post/${postID}/comment?limit=10`
  let response = await fetchData(baseUrl, commentApi)
   displayComment(response.data, id)
}
function displayComment(response, id){
  allComment = []
  let commentsHtml = ''
  let html = ''
  response.forEach((comment) => {
    html = getTemplate('comment', comment)
    commentsHtml = commentsHtml + html
    allComment.push(comment)
    
  })
  commentsHtml = commentsHtml + getTemplate('newComment')
  id.innerHTML = commentsHtml

}
  

// function to add 10 post at srolling end
window.addMorePost = addMorePost
function addMorePost(e){
  if(e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight ){ 
      postData()
  }
}

// function to delete comment
window.deleteComment = deleteComment
window.updateComment = updateComment
function deleteComment( e, commentId){
  let index = allComment.findIndex(com => {
    return com.id == commentId
  })
  allComment.splice(index,1)
  let element = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
  displayComment(allComment, element)
}

function updateComment(e){
let element = e.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling
element.classList.toggle('editComment')
}