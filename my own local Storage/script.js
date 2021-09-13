const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

document.addEventListener('DOMContentLoaded', fetchBookmarks);

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if (nameInput.value === '' || emailInput.value === '') {
        msg.textContent = 'Please enter all fields';
        
        setTimeout(() => msg.remove(), 3000);
    } else {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));

        userList.appendChild(li);

        var bookmark = {
            name: nameInput.value,
            url: emailInput.value
        }

        //clear all fields 
        nameInput.value = '';
        emailInput.value = '';


        //test if bookmark is null or empty
        if (localStorage.getItem('allBooks') === null) {
            //init array
            var bookmarks = [];
            //add to array
            bookmarks.push(bookmark);
            //set to localstorage
            localStorage.setItem('allBooks', JSON.stringify(bookmarks));
        } else {
            //fetch bookmarks from localstorage
            var bookmarks = JSON.parse(localStorage.getItem('allBooks'));
            //add bookmark to array
            bookmarks.push(bookmark);
            //reset it back to localStorage
            localStorage.setItem('allBooks', JSON.stringify(bookmarks));
        }
    }

    fetchBookmarks();
}


//fetch bookmarks
function fetchBookmarks() {
    //get bookmarks from localStorage
    var boo = JSON.parse(localStorage.getItem('allBooks'));

    
    //get output id
    var listofUsers = document.getElementById('users');
    //build output
    listofUsers.innerHTML = '';

    boo.forEach(bookmark => {
        var userName = bookmark.name;
        var userEmail = bookmark.url;

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${userName} : ${userEmail}`));

        listofUsers.appendChild(li);
    });


    // for (var i = 0; i < boo.length; i++) {
    //     var name = boo[i].name;
    //     var email = boo[i].url;

    //     const li = document.createElement('li');
    //     li.appendChild(document.createTextNode(`${name} : ${email}`));

    //     listofUsers.appendChild(li);

    //     bookmarksResults.innerHTML += '<div class="jumbotron well col-md-6">' +
    //         '<h3>' + name +
    //         ' <a class="btn btn-success" target="_blank" href="' + url + '">Visit</a> ' +
    //         ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>' +
    //         '</h3>' +
    //         '</div>';
    // }
}