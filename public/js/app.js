const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const para = document.querySelector('#message-1')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    if (!search.value) {
        console.log("enter value")
    }
    else {
    para.textContent="loading"
    fetch("http://localhost:3000/weather?address="+ search.value).then((response)=>{
    response.json().then((data)=>{
        if (data.error) {
            console.log(data.error)
            para.textContent= data.error
        }
        else {
        para.textContent=data.forecast
        console.log(data)
        }
    })
})
    console.log(search.value)
    }
})