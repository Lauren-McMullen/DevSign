async function createUser(e) {
    e.preventDefault();

    const username = document.getElementById('username-input').value;
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const confirmPassword = document.getElementById('confirm-password-input').value;
    const role = (document.getElementById('developer').checked) ? 'developer' : 'designer';
    
    if(password != confirmPassword) {
        alert('entered passwords must match. Please try again');
        return;
    };

    const response = await fetch('/user/new', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            name: name,
            email: email,
            password: password,
            role: role
        })
    });

    if(response.success) {
        window.location.href = './login.html'
    } else {
        alert('Error creating user. Please try again.');
    }

}

window.onload = function () {
    document.getElementById('signup-button').addEventListener('click', (e) => createUser(e));
}