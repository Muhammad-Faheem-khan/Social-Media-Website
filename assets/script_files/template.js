import { getCommentData } from "./dashBoard.js"

function postTag(post) {
  let tagPostElement = ''
  post.tags.forEach((tag) => {
    let html = `<div class="tags mb-2 me-2">
          <p class="tag-block mb-0">${tag}</p>
          </div>`
    tagPostElement = tagPostElement + html
  })
  return tagPostElement
}

window.newComment = newComment
function newComment(postID, id) {
  getCommentData(id, postID)
  id.classList.toggle("hidden")
}

export default function getTemplate(requestedElement, res, i) {
  if (requestedElement == 'tag') {
    return `<button class="tags mb-2 me-2 " onclick= "getPostByTag(event)">
                                <a href=""><p class="tag-block mb-0">${res}</p></a>
                            </button>`
  } else if (requestedElement == 'friendList') {
    return `<li class="chats mt-0"> 
        <div class="d-flex p-2" >
            <img
            src=${res.picture}
            alt="pic of friend"
            class="img-icon me-3"
            />
            <p class="align-middle friend-name pt-2 mb-0">${res.title[0].toUpperCase()}${res.title.slice(1)} ${res.firstName} ${res.lastName}</p>
        </div>
    </li >`
  } else if (requestedElement == 'post') {
    return `<div class="post mb-3 p-3" >
        <div class="d-flex justify-content-between">
        <div class="d-flex ">
          <img
            src="${res.owner.picture}"
            class="img-icon"
            alt="img of post publisher "
          />
          <div class="ms-3">
            <h3 class="subheading mb-0">
              ${res.owner.firstName} ${res.owner.lastName}
            </h3>
            <p class="lighter-text">
              ${res.publishDate.slice(0, 10)} ${res.publishDate.slice(11, 16)}
            </p>
          </div>
        </div>
        <div class="post-setting-icon">
          <i class="fa-solid fa-ellipsis px-2"></i>
        </div>
      </div>
        <img
            src= ${res.image}
            class="img-fluid post-img"
            alt="Post img"
        />
        <div class="d-flex justify-content-between">
            <div class="pt-2 ps-2">
                <p class="post-description">${res.text}</p>
            </div>
            <div class="d-flex mt-2">
                <i class="fa-regular fa-thumbs-up pt-2 ms-3 me-1 likeBtn"  onClick="likedPost(event)"></i>
                <span>${res.likes}</span> <i class="fa-regular fa-comment pt-2 ms-3 me-1 commentBtn" onClick="newComment('${res.id}', post${i})"></i>
                <span>5</span>
                <i class="fa-regular fa-share-from-square pt-2 ms-3 me-1 shareBtn"></i>
                <span class="me-3">3</span>
            </div>
        </div>

        <div class="d-flex">
            <h4 class="me-2 pt-2 tags-heading">Tags:</h4>
            <div class="d-flex flex-wrap justify-content-center">
                ${postTag(res)}
            </div>
        </div>
        <ul class=" mb-0 comment-box ps-0 m-auto hidden" id="post${i}" >
        </ul>
    </div>`
  } else if (requestedElement == 'comment') {
    return `<li class="chats comment p-2 mt-0" >
                                    <div class="d-flex ">
                                        <img src= ${res.owner.picture} class="img-icon " alt="someone comment">
                                        <div class="ms-3 comment-data">
                                            <div class="d-flex justify-content-between">
                                            <p class="mb-1"><b>${res.owner.firstName} ${res.owner.lastName}</b></p>
                                            <div class="d-flex">
                                            <p class="lighter-text mb-1">${res.publishDate.slice(0, 10)} ${res.publishDate.slice(11, 16)} </p>
                                            <div class="post-setting-icon dropdown-toggle ms-2" data-bs-toggle="dropdown">
                                            <i class="fa-solid fa-ellipsis ms-2 mb-2"></i>
                                          </div>
        <ul class="dropdown-menu">
          <li onclick="updateComment(event, '${res.id}')"><a class="dropdown-item">Edit</a></li>
          <li onclick="deleteComment(event, '${res.id}')"><a class="dropdown-item">Delete</a></li>
        </ul>
                                            </div>
                                            </div>
                                            <p  class="comment-text mb-0">${res.message}</p>
                                        </div>
                                    </div>
                                </li>`
  } else if (requestedElement == 'newComment') {
    return `<li class="chats enter-new-comment p-0 mt-0">
                                        <div class="new-comment-box d-flex justify-content-center">
                                            <input type="text" placeholder="New Comment" class="new-comment">
                                            <button class="comment-btn btn btn-primary ms-3"> <i class="fa-solid fa-arrow-right"></i> </button>
                                        </div>
                                    </li>`
  }
}
