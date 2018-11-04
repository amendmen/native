import { http } from './http'
import { ui } from './ui'

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

//listener for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

//listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

//listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}

// Submit post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    // if name the same as property title: title
    title,
    body
  }

  if (title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger')
  } else {
    console.log(id)
    // check for id
    if (id === '') {
      //create post
      //Create post
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console(err))
    } else {
      // update post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console(err))
    }

  }

}

//enable edit state
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent

    const data = {
      id,
      title,
      body
    }
    // fill form with current post
    ui.fillForm(data);
  }
  e.preventDefault()
}

// delete
function deletePost(e) {
  const id = e.target.parentElement.dataset.id;
  const data = {
    id
  }
  if (e.target.parentElement.classList.contains('delete')) {
   
    http.delete(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post deleted', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console(err))
  }
  e.preventDefault()
}
function cancelEdit(e) {

  if (e.target.classList.contains('post-cancel')) {
    console.log('12312')
    ui.changeFormState('add');
  }
  e.preventDefault();
}