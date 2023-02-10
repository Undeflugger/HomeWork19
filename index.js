// Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
// Ід має бути введений в інпут (валідація: ід від 1 до 100) Якщо знайдено пост, то вивести на сторінку блок з постом і зробит
//  кнопку для отримання комкоментарів до посту.
// Зробити завдання використовуючи проміси, перехопити помилки.

const Id = document.forms[0];
const item = document.getElementById('item');
const coments = document.getElementById('coments');
const button = document.getElementsByName('button')[0];
const input = document.getElementsByName('input')[0];
input.addEventListener('input', event => {
    event.stopPropagation();
    const valueInput = event.target.value;
    if(valueInput > 1 & valueInput < 101){
        button.disabled = false;
    }else{
        button.disabled = true;
    }
})

Id.addEventListener('submit', (event) => {
    event.preventDefault();
    coments.innerText = '';
    item.innerText = '';
    const arrId = document.getElementsByTagName('input')[0].value;
    letId(arrId);
    Id.reset();
});

const letId = async(id) =>{
    const result = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(function(res){
            if(res.status !== 200){
                throw new Error('Invalid')
            }
            return res.json();
        })
        .then(res => {
            show(res);
            return res;
        })

        .catch(error => {
            console.log('Error', error);
        })
}

const show = (el) =>{
    const infoTitle = document.createElement('p');
    const infoBody = document.createElement('p');
    const comentButton = document.createElement('button');
    infoBody.innerText = el.body;
    infoTitle.innerText = el.title;
    comentButton.type = 'button';
    comentButton.name = 'coments';
    comentButton.innerText = 'Show Coments';
    item.append(infoTitle, infoBody, comentButton);
    comentButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        fetch(`https://jsonplaceholder.typicode.com/posts/${el.id}/comments`)
            .then(res => res.json())
            .then(res => {
                const createUl = document.createElement('ul');
                res.forEach(el => {
                    const createLi = document.createElement('li');
                    const creatH1 = document.createElement('h1');
                    const creatP = document.createElement('p');
                    const creatSpan = document.createElement('span');
                    creatH1.innerText = el.name;
                    creatSpan.innerText = el.email;
                    creatP.innerText = el.body;
                    createLi.append(creatH1, creatSpan, creatP);
                    createUl.append(createLi);
                });
                coments.append(createUl);
            })
    });
}